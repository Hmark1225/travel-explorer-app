import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { buildSeed } from "../scripts/supabase/seed.ts";

const sqlFile = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const alice = "00000000-0000-0000-0000-000000000001";
const bob = "00000000-0000-0000-0000-000000000002";
const admin = "00000000-0000-0000-0000-000000000003";

test("PostgreSQL migrations, repeatable seed, public projections, RLS and ownership", async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(sqlFile("supabase/tests/bootstrap.sql"));
  const migrations = readdirSync(new URL("../supabase/migrations/", import.meta.url)).filter((f) => f.endsWith(".sql")).sort();
  for (const file of migrations) await db.exec(sqlFile("supabase/migrations/" + file));
  const seed = buildSeed();
  assert.equal(buildSeed().sql, seed.sql);
  await db.exec(seed.sql);
  await db.exec(seed.sql);
  const verification = (await db.query<{ verification: { table: string; expected: number; imported: number; missing: number; conflicts: number }[] }>(seed.verificationSql)).rows[0].verification;
  assert.ok(verification.every((r) => r.expected === r.imported && r.missing === 0 && r.conflicts === 0));
  const counts: Record<string, number> = {};
  for (const [table, rows] of Object.entries(seed.tables)) {
    const result = await db.query<{ count: number }>(`select count(*)::int as count from public.${table}`);
    counts[table] = result.rows[0].count;
    assert.equal(counts[table], rows.length, table);
  }
  for (const table of ["profiles", "user_saved_items", "user_trips", "user_trip_items"]) {
    assert.equal((await db.query<{ count: number }>(`select count(*)::int as count from public.${table}`)).rows[0].count, 0);
  }
  const checks = await db.query<{ relname: string; relrowsecurity: boolean }>("select relname, relrowsecurity from pg_class join pg_namespace n on n.oid=relnamespace where n.nspname='public' and relkind='r'");
  assert.ok(checks.rows.length >= 12 && checks.rows.every((r) => r.relrowsecurity));
  for (const table of ["destinations", "attractions"]) {
    const result = await db.query(`select id from public.${table} where publication_status <> 'draft' or approval_status <> 'pending' or review_status <> 'needs-review'`);
    assert.equal(result.rows.length, 0);
  }
  for (const d of seed.tables.destinations) {
    assert.deepEqual((await db.query<{ record: unknown }>("select record from public.destinations where id=$1", [d.id])).rows[0].record, d.record);
  }
  for (const a of seed.tables.attractions) {
    assert.deepEqual((await db.query<{ record: unknown }>("select record from public.attractions where id=$1", [a.id])).rows[0].record, a.record);
  }
  for (const photo of seed.tables.photos) assert.deepEqual((await db.query<{ record: unknown }>("select record from public.photos where id=$1", [photo.id])).rows[0].record, photo.record);
  const runAs = async (role: "anon" | "authenticated", user: string | null, sql: string, params: unknown[] = []) => db.transaction(async (tx) => {
    await tx.exec(`set local role ${role}`);
    await tx.query("select set_config('request.jwt.claim.sub', $1, true)", [user ?? ""]);
    return tx.query<Record<string, any>>(sql, params);
  });
  await db.query("insert into auth.users(id) values ($1),($2),($3)", [alice, bob, admin]);
  await db.query("insert into travel_private.admin_roles(user_id,granted_by) values ($1,'local test fixture')", [admin]);

  await t.test("anonymous and ordinary authenticated users cannot read drafts, editorial records or modify content", async () => {
    assert.equal((await runAs("anon", null, "select * from travel_destinations")).rows.length, 0);
    await assert.rejects(runAs("anon", null, "select record, editorial_notes from destinations"), /permission denied/);
    assert.equal((await runAs("authenticated", alice, "select * from destinations")).rows.length, 0);
    await assert.rejects(runAs("authenticated", alice, "insert into destination_translations(destination_id,language,name,country,region,tagline,description,coordinate_label) values ('rhodes','en','bad','bad','bad','bad','bad','bad')"), /row-level security/);
    assert.equal((await runAs("authenticated", alice, "update destinations set editorial_notes='bad' returning id")).rows.length, 0);
    await assert.rejects(runAs("anon", null, "select * from profiles"), /permission denied/);
  });
  await t.test("admin can read/edit content but cannot be assigned through a profile or user metadata", async () => {
    assert.equal((await runAs("authenticated", admin, "select id from destinations")).rows.length, 18);
    await runAs("authenticated", admin, "update destinations set editorial_notes='PRIVATE MARKER' where id='rhodes'");
    await assert.rejects(runAs("authenticated", alice, "insert into travel_private.admin_roles(user_id,granted_by) values ($1,'self')", [alice]), /permission denied/);
    await assert.rejects(runAs("authenticated", alice, "insert into profiles(id,role) values ($1,'admin')", [alice]), /column.*role/);
    assert.equal((await runAs("authenticated", alice, "select travel_private.is_admin() as admin")).rows[0].admin, false);
    await assert.rejects(runAs("authenticated", alice, "create table public.privilege_escalation(id int)"), /permission denied/);
  });
  await t.test("foreign keys, publication checks, and insert-only import protect existing records", async () => {
    await assert.rejects(db.exec("insert into destination_sources(destination_id,source_id) values ('missing','rhodesTourism')"), /foreign key/);
    await assert.rejects(db.exec("update destinations set latitude=91 where id='rhodes'"), /check constraint/);
    await assert.rejects(db.exec("update destinations set publication_status='published' where id='rhodes'"), /check constraint/);
    await db.exec(seed.sql);
    const conflictReport = (await db.query<{ verification: { conflicts: number }[] }>(seed.verificationSql)).rows[0].verification;
    // An editorial note not present in the source is retained and is not a seed conflict.
    assert.ok(conflictReport.every((r) => r.conflicts === 0));
    await db.exec("update destination_translations set tagline='Human revision' where destination_id='rome' and language='en'");
    await db.exec(seed.sql);
    const revised = (await db.query<{ verification: { table: string; conflicts: number }[] }>(seed.verificationSql)).rows[0].verification;
    assert.equal(revised.find((r) => r.table === "destination_translations")!.conflicts, 1);
    assert.equal((await db.query<{ editorial_notes: string }>("select editorial_notes from destinations where id='rhodes'")).rows[0].editorial_notes, "PRIVATE MARKER");
  });
  await t.test("only approved published bilingual content is projected, including child filtering", async () => {
    await runAs("authenticated", admin, "update destinations set publication_status='published',approval_status='approved',review_status='reviewed',last_verified_at='2026-10-26' where id='rhodes'");
    assert.equal((await runAs("anon", null, "select * from travel_destinations")).rows.length, 1);
    let payload: any = (await runAs("anon", null, "select payload from travel_destinations")).rows[0].payload;
    assert.equal(payload.id, "rhodes");
    assert.ok(payload.localized.en && payload.localized.hu);
    assert.deepEqual(payload.attractions, []);
    assert.ok(!JSON.stringify(payload).includes("PRIVATE MARKER"));
    assert.ok(!("record" in payload) && !("editorial_notes" in payload));
    await runAs("authenticated", admin, "update attractions set publication_status='published',approval_status='approved',review_status='reviewed',last_verified_at='2026-10-26' where id=$1", [seed.tables.attractions[0].id]);
    payload = (await runAs("anon", null, "select payload from travel_destinations")).rows[0].payload;
    assert.equal(payload.attractions.length, 1);
    await db.exec("update destinations set publication_status='draft' where id='rhodes'");
    assert.equal((await runAs("anon", null, "select * from travel_attractions")).rows.length, 0);
    await db.exec("update destinations set publication_status='published' where id='rhodes'");
    await db.exec("delete from destination_translations where destination_id='rhodes' and language='hu'");
    assert.equal((await runAs("anon", null, "select * from travel_destinations")).rows.length, 0);
    await db.exec(seed.sql);
  });
  await t.test("photo rights, assignment and dates gate visibility; internal reviewers remain private", async () => {
    assert.equal((await runAs("anon", null, "select * from travel_photos")).rows.length, 0);
    const id = seed.tables.photos[0].id;
    const record = { kind: "photo", authenticity: "photograph", reviewStatus: "reviewed", commercialUseAllowed: true,
      url: "https://example.com/test-photo.jpg", originalUrl: "https://example.com/test-original.jpg", sourceUrl: "https://example.com/test-source",
      licenseUrl: "https://example.com/test-license", license: "CC-BY-4.0", author: "Fixture", attribution: "Fixture credit",
      reviewedBy: "PRIVATE REVIEWER", provenanceNotes: "PRIVATE EVIDENCE", modificationNotes: "None", subject: "Fixture",
      verifiedAt: "2026-10-26", subjectVerifiedAt: "2026-10-26", evidenceUrls: ["https://example.com/test-evidence"] };
    await db.query("update photos set record=$2,publication_status='published',approval_status='approved',public_provenance='Public provenance',public_evidence_urls=array['https://example.com/public-evidence'] where id=$1", [id, JSON.stringify(record)]);
    assert.equal((await runAs("anon", null, "select * from travel_photos")).rows.length, 0);
    await db.query("update photo_assignments set publication_status='published',approval_status='approved' where photo_id=$1", [id]);
    const publicPhoto = (await runAs("anon", null, "select payload from travel_photos")).rows[0].payload;
    assert.ok(!JSON.stringify(publicPhoto).includes("PRIVATE"));
    for (const patch of [{ evidenceUrls: [] }, { commercialUseAllowed: false }, { verifiedAt: "2026-02-30" }, { authenticity: "unknown" }, { reviewStatus: "needs-review" }, { license: "Unknown" }]) {
      await db.query("update photos set record=$2 where id=$1", [id, JSON.stringify({ ...record, ...patch })]);
      assert.equal((await runAs("anon", null, "select * from travel_photos")).rows.length, 0);
    }
  });
  await t.test("users own private data; admins cannot read others; ownership and trip cross-links cannot be forged", async () => {
    await runAs("authenticated", alice, "insert into profiles(id,display_name) values ($1,'Alice')", [alice]);
    await runAs("authenticated", alice, "insert into user_saved_items(user_id,destination_id) values ($1,'rhodes')", [alice]);
    await runAs("authenticated", alice, "insert into user_trips(id,user_id,name) values ('10000000-0000-0000-0000-000000000001',$1,'Local test')", [alice]);
    await runAs("authenticated", alice, "insert into user_trip_items(user_id,trip_id,destination_id) values ($1,'10000000-0000-0000-0000-000000000001','rhodes')", [alice]);
    for (const table of ["profiles","user_saved_items","user_trips","user_trip_items"]) {
      assert.equal((await runAs("authenticated", alice, `select * from ${table}`)).rows.length, 1);
      assert.equal((await runAs("authenticated", bob, `select * from ${table}`)).rows.length, 0);
      assert.equal((await runAs("authenticated", admin, `select * from ${table}`)).rows.length, 0);
      await assert.rejects(runAs("anon", null, `select * from ${table}`), /permission denied/);
    }
    await assert.rejects(runAs("authenticated", bob, "insert into profiles(id) values ($1)", [alice]), /row-level security/);
    await assert.rejects(runAs("authenticated", bob, "insert into user_saved_items(user_id,destination_id) values ($1,'rhodes')", [alice]), /row-level security/);
    await assert.rejects(runAs("authenticated", alice, "update user_saved_items set user_id=$1", [bob]), /row-level security/);
    await assert.rejects(runAs("authenticated", bob, "insert into user_trip_items(user_id,trip_id,attraction_id,position) values ($1,'10000000-0000-0000-0000-000000000001',$2,1)", [bob, seed.tables.attractions[0].id]), /foreign key/);
    await assert.rejects(runAs("authenticated", alice, "insert into user_saved_items(user_id,destination_id) values ($1,'rome')", [alice]), /row-level security/);
    assert.equal((await runAs("authenticated", bob, "delete from user_saved_items returning id")).rows.length, 0);
    await runAs("authenticated", alice, "delete from user_saved_items");
  });
  await t.test("partner configuration is private and cannot be activated without verification", async () => {
    await assert.rejects(runAs("anon", null, "select * from partner_links"), /permission denied/);
    assert.equal((await runAs("authenticated", alice, "select * from partner_links")).rows.length, 0);
    await assert.rejects(db.exec("insert into partner_links(id,destination_id,provider_id,action,language,url,enabled) values ('test','rhodes','booking','accommodation','en','https://www.booking.com/test',true)"), /check constraint/);
  });
  await t.test("migration and import reproduce on a second clean PostgreSQL database", async () => {
    const second = new PGlite();
    try {
      await second.exec(sqlFile("supabase/tests/bootstrap.sql"));
      for (const file of migrations) await second.exec(sqlFile("supabase/migrations/" + file));
      await second.exec(seed.sql);
      const result = (await second.query<{ verification: unknown }>(seed.verificationSql)).rows[0].verification;
      assert.deepEqual(result, verification);
      // Fixture-only publication: validates the exact SQL public DTO against the mobile adapter.
      await second.exec("update destinations set publication_status='published',approval_status='approved',review_status='reviewed',last_verified_at='2026-10-26'; update attractions set publication_status='published',approval_status='approved',review_status='reviewed',last_verified_at='2026-10-26';");
      const rows = await second.query<{ payload: unknown }>("select payload from travel_destinations order by sort_order,id");
      const { parseCatalog, preservesBundledIds } = await import("../src/services/supabase/catalog.ts");
      const { destinations } = await import("../src/data/destinations.ts");
      const catalog = parseCatalog(rows.rows.map((r) => r.payload));
      assert.ok(preservesBundledIds(catalog, destinations));
      assert.deepEqual(catalog.map((d) => d.id), destinations.map((d) => d.id));
      catalog.forEach((d, i) => {
        assert.deepEqual(d.localized, destinations[i].localized);
        assert.deepEqual(d.attractions.map((a) => a.id), destinations[i].attractions.map((a) => a.id));
        d.attractions.forEach((a, j) => assert.deepEqual(a.localized, destinations[i].attractions[j].localized));
      });
    } finally { await second.close(); }
  });
  await t.test("emergency revoke denies public access without deleting content or private data", async () => {
    const before = await db.query("select (select count(*) from destinations)::int as content, (select count(*) from profiles)::int as profiles, (select count(*) from user_trip_items)::int as items");
    await db.exec(sqlFile("supabase/rollback/disable_public_catalog.sql"));
    await assert.rejects(runAs("anon", null, "select * from travel_destinations"), /permission denied/);
    const after = await db.query("select (select count(*) from destinations)::int as content, (select count(*) from profiles)::int as profiles, (select count(*) from user_trip_items)::int as items");
    assert.deepEqual(after.rows, before.rows);
    assert.equal((await runAs("authenticated", alice, "select * from user_trip_items")).rows.length, 1);
  });
  if (process.env.TRAVEL_WRITE_DB_REPORT === "1") writeFileSync(new URL("../docs/supabase/local-import-verification.json", import.meta.url), JSON.stringify({
    engine: "PGlite PostgreSQL (local, Supabase auth test double)", remoteDeployment: "not-attempted", migrations: migrations.length,
    expected: seed.report.expected, imported: counts, seedAppliedTwice: true, conflicts: 0,
    verificationStage: "immediately after import, before publication/ownership test fixture changes",
    publicationAfterImport: "all draft/pending; no promotions", verification: "passed",
  }, null, 2) + "\n");
});
