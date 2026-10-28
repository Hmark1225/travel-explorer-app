// Explicit browser HTTP/Auth fixtures only; no real project/account/production writes.
import {chromium as playwright} from '@playwright/test';
import chromium from '@sparticuz/chromium';
import assert from 'node:assert/strict';
import {buildSeed} from '../../scripts/supabase/seed.ts';
const browser=await playwright.launch({executablePath:await chromium.executablePath(),args:chromium.args,headless:true});
const db:Record<string,any[]>={...structuredClone(buildSeed().tables),editorial_audit_log:[]};
for(const e of ['destinations','attractions','photos','partner_links','photo_assignments'])db[e]=db[e].map(r=>({...r,version:1,publication_status:'draft',approval_status:'pending',review_note:'',enabled:false}));
let allowed=true,conflict=false;const errors:string[]=[];
const page=await browser.newPage({viewport:{width:1440,height:1050}});
page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(20000);
const user={id:'00000000-0000-0000-0000-000000000003',email:'editor@test.invalid',aud:'authenticated',role:'authenticated',app_metadata:{},user_metadata:{},created_at:'2026-10-26T00:00:00Z'};
const token=[Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url'),Buffer.from(JSON.stringify({sub:user.id,exp:Math.floor(Date.now()/1000)+3600,role:'authenticated',aud:'authenticated'})).toString('base64url'),'test-fixture'].join('.');
await page.route('https://example.supabase.co/**',async route=>{
 const req=route.request(),url=new URL(req.url());const json=(body:unknown,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
 if(url.pathname.endsWith('/auth/v1/token'))return json({access_token:token,refresh_token:'test-fixture',expires_in:3600,token_type:'bearer',user});
 if(url.pathname.endsWith('/auth/v1/user'))return json(user);
 if(url.pathname.endsWith('/auth/v1/logout'))return json({});
 if(url.pathname.endsWith('/rpc/admin_access'))return json(allowed);
 if(url.pathname.endsWith('/rpc/admin_save')){
  if(conflict)return json({code:'40001',message:'Conflict: reload before saving'},409);
  const body=req.postDataJSON(),p=body.payload,current=db[body.entity].find(r=>r.id===p.id);
  assert.equal(body.expected_version,current.version);const row={...current,...p,version:current.version+3};db[body.entity]=db[body.entity].map(r=>r.id===row.id?row:r);
  const table=body.entity==='destinations'?'destination_translations':'attraction_translations',key=body.entity==='destinations'?'destination_id':'attraction_id';
  db[table]=db[table].map(t=>t[key]===p.id?{...t,...p.translations[t.language]}:t);return json(row);
 }
 const table=url.pathname.split('/').pop()!;return table in db?json(db[table]):json({message:'Unhandled fixture'},400);
});
try{
 await page.goto('http://127.0.0.1:3100',{waitUntil:'networkidle'});
 const login=async()=>{await page.getByLabel('Email address').fill('editor@test.invalid');await page.getByLabel('Password',{exact:true}).fill('test-password');await page.getByRole('button',{name:/Sign in to workspace/}).click()};
 await login();await page.getByRole('heading',{name:'Your editorial workspace.'}).waitFor();await page.getByText('348 of 348 EN / HU records').waitFor();
 await page.screenshot({path:'.validation/admin-overview.png',fullPage:true});
 await page.getByRole('navigation').getByRole('button',{name:/Destinations/}).click();
 await page.getByRole('textbox',{name:'Search Destinations'}).fill('rhodes');await page.getByRole('button',{name:'Edit ↗'}).click();
 const editor=page.locator('.editor');await editor.getByRole('tab',{name:/Magyar/}).click();
 assert.equal(await editor.getByLabel('Name *',{exact:true}).inputValue(),'Rodosz');await editor.getByLabel('Tagline *',{exact:true}).fill('Hungarian test-only revision');
 await editor.getByRole('button',{name:'Save draft',exact:true}).click();await editor.getByText('Draft saved. Approval and publication were reset.').waitFor();
 assert.equal(db.destination_translations.find(t=>t.destination_id==='rhodes'&&t.language==='hu').tagline,'Hungarian test-only revision');
 await editor.getByRole('tab',{name:/English/}).click();assert.equal(await editor.getByLabel('Name *',{exact:true}).inputValue(),'Rhodes');
 conflict=true;await editor.getByLabel('Tagline *',{exact:true}).fill('Unsaved conflict test');await editor.getByRole('button',{name:'Save draft',exact:true}).click();
 await editor.getByRole('alert').filter({hasText:'Someone changed this record'}).waitFor();assert.equal(await editor.getByLabel('Tagline *',{exact:true}).inputValue(),'Unsaved conflict test');
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'.validation/admin-mobile.png',fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),'No mobile overflow');
 page.on('dialog',d=>d.accept());await page.getByRole('navigation').getByRole('button',{name:/Photo library/}).click();await page.getByRole('button',{name:/Add photo/}).click();await page.getByText('Private photo intake',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Sign out',exact:true}).click();allowed=false;await login();await page.getByRole('heading',{name:'Administrator access required'}).waitFor();
 assert.equal(await page.getByRole('heading',{name:'Your editorial workspace.'}).count(),0);assert.deepEqual(errors,[]);
 console.log('Passed browser checks: login, dashboard, EN/HU edit, CAS conflict, responsive layout, photo intake, non-admin denial. HTTP/Auth fixtures only.');
}finally{await browser.close()}
