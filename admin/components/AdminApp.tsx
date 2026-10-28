'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { browserClient, settings } from '../lib/supabase';
import { inventory, type Inventory } from '../lib/data';
import type { Entity, Row } from '../lib/domain';
import Editor from './Editor';
const sections=[{id:'overview',name:'Overview',icon:'◫'},{id:'destinations',name:'Destinations',icon:'⌖'},{id:'attractions',name:'Attractions',icon:'◇'},{id:'photos',name:'Photo library',icon:'▧'},{id:'partner_links',name:'Partner links',icon:'↗'}] as const;
function Status({value}:{value:unknown}){return <span className={`status ${String(value)}`}>{String(value).replace('-',' ')}</span>}
export default function AdminApp(){
 const [client,setClient]=useState<ReturnType<typeof browserClient>>(null);
 const [state,setState]=useState<'checking'|'login'|'denied'|'admin'>(settings()?'checking':'login');
 useEffect(()=>{setClient(browserClient())},[]);
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 const [section,setSection]=useState('overview'),[search,setSearch]=useState(''),[filter,setFilter]=useState('all');
 const [data,setData]=useState<Inventory|null>(null),[editing,setEditing]=useState<{entity:Entity;row:Row|null}|null>(null);
 const generation=useRef(0);
 const reload=useCallback(async()=>{if(client){const result=await inventory(client);setData(result)}},[client]);
 const verify=useCallback(async()=>{
   if(!client)return;
   const request=++generation.current;
   const {data:user,error}=await client.auth.getUser();
   if(request!==generation.current)return;
   if(error||!user.user){setState('login');setData(null);setEditing(null);return}
   const result=await client.rpc('admin_access');
   if(request!==generation.current)return;
   if(result.error||result.data!==true){setState('denied');setData(null);setEditing(null);if(result.error)setError('Administrator access could not be verified. Check the new migration and your connection.');return}
   setState('admin');
   try{await reload()}catch(e){setError(e instanceof Error?e.message:'Could not load content.')}
 },[client,reload]);
 useEffect(()=>{
   if(!client)return;
   void verify();
   const {data:{subscription}}=client.auth.onAuthStateChange(()=>{setTimeout(()=>void verify(),0)});
   const refresh=()=>void verify();window.addEventListener('focus',refresh);
   const timer=setInterval(refresh,60000);
   return()=>{generation.current++;subscription.unsubscribe();window.removeEventListener('focus',refresh);clearInterval(timer)};
 },[client,verify]);
 const signOut=async()=>{await client?.auth.signOut();generation.current++;setData(null);setEditing(null);setPassword('');setState('login')};
 const login=async(e:React.FormEvent)=>{
   e.preventDefault();if(!client)return;setBusy(true);setError('');
   try{const result=await client.auth.signInWithPassword({email,password});setPassword('');if(result.error)throw new Error('Sign-in failed. Check your credentials and account verification.');await verify()}
   catch(e){setError(e instanceof Error?e.message:'Sign-in failed.')}finally{setBusy(false)}
 };
 const navigate=(id:string)=>{if(editing&&!window.confirm('Leave this editor? Unsaved changes will be lost.'))return;setSection(id);setEditing(null);setSearch('');setFilter('all');setError('')};
 const title=sections.find(s=>s.id===section)?.name??'Overview';
 const name=(entity:Entity,row:Row)=>{
   if(entity==='photos')return String(row.record?.subject??row.record?.altText??row.id);
   if(entity==='partner_links')return `${row.provider_id} · ${row.destination_id}`;
   const texts=entity==='destinations'?data?.destination_translations:data?.attraction_translations;
   return String(texts?.find(t=>t.language==='en'&&t[entity==='destinations'?'destination_id':'attraction_id']===row.id)?.name??row.record?.name??row.id);
 };
 const total=(data?.destinations.length??0)+(data?.attractions.length??0);
 const translations=(data?.destination_translations.length??0)+(data?.attraction_translations.length??0);
 const allContent=[...(data?.destinations??[]),...(data?.attractions??[])];
 const tab=section as Entity;
 const rows=section==='overview'?[]:(data?.[tab]??[]).filter(r=>{
   const text=`${name(tab,r)} ${r.id} ${r.destination_id??''}`.toLowerCase();
   const status=String(r.publication_status??(r.enabled?'active':'inactive'));
   return text.includes(search.toLowerCase())&&(filter==='all'||filter===status||(filter==='pending'&&r.approval_status==='pending'));
 });
 return <div className="studio"><aside className="sidebar"><a className="brand" href="/" aria-label="Travel Explorer editorial studio"><span className="brand-icon">✳</span><span>Travel Explorer<small>EDITORIAL STUDIO</small></span></a><div className="workspace-label">WORKSPACE</div><nav aria-label="Administration">{sections.map(s=><button key={s.id} onClick={()=>navigate(s.id)} className={section===s.id?'selected':''}><span>{s.icon}</span>{s.name}{data&&s.id==='photos'&&<em>{data.photos.filter(p=>p.approval_status==='pending').length}</em>}</button>)}</nav><div className="sidebar-note"><span className="dot"/><strong>Review before publishing</strong><p>Great journeys start with information people can trust.</p></div><div className="sidebar-bottom"><span className="avatar">TE</span><div>Travel Explorer<small>{state==='admin'?'Administrator workspace':'Restricted workspace'}</small></div></div></aside>
 <div className="workspace"><header className="topbar"><div className="breadcrumb">Workspace <span>/</span> {title}</div><div className="topbar-actions"><span className="environment"><i/>Editorial</span>{state==='admin'||state==='denied'?<button className="quiet" onClick={()=>void signOut()}>Sign out</button>:<span className="lock">◉ Protected access</span>}</div></header>
 <main>
 {state!=='admin'?<section className="login-layout"><div className="login-copy"><p className="eyebrow">THE WORLD, THOUGHTFULLY CURATED</p><h1>A better guide.<br/>One detail at a time.</h1><p>Care for the places, stories and photographs that help people discover their next journey.</p><div className="trust-notes"><span>✓ Bilingual content</span><span>✓ Verified sources</span><span>✓ Rights-aware photography</span></div></div><section className="panel login-card"><div className="mini-mark">✳</div><h2>{state==='denied'?'Administrator access required':'Welcome to the studio'}</h2><p className="muted">{state==='denied'?'Your Auth account is signed in, but administrator membership is absent or could not be verified. Contact the project owner.':'Sign in with your verified Supabase administrator account.'}</p>{error&&<div role="alert" className="alert error">{error}</div>}{!client&&state!=='checking'&&<div className="alert" role="status"><strong>Connect your project</strong><p>Configure the public Supabase URL and publishable key in admin/.env.local. Apply the admin migration and manually authorize a verified Auth user. No sample account or automatic admin access is provided.</p><code>admin/.env.example</code></div>}
 {state==='checking'?<p role="status">Verifying your session…</p>:state==='denied'?<button onClick={()=>void signOut()}>Sign out</button>:<form onSubmit={e=>void login(e)}><label className="field"><span>Email address</span><input type="email" required autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@your-organization.com"/></label><label className="field"><span>Password</span><input type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="wide" disabled={!client||busy}>{busy?'Signing in…':'Sign in to workspace →'}</button><p className="small muted">Access is granted by the project owner. Signing up never grants editorial permissions.</p></form>}</section></section>:
 <><div className="page-heading"><div><p className="eyebrow">TRAVEL EXPLORER / CONTENT OPERATIONS</p><h1>{section==='overview'?'Your editorial workspace.':title}</h1><p className="muted">{section==='overview'?'Keep every destination accurate, every story complete and every photograph properly credited.':'Create thoughtfully. Verify carefully. Publish when the details are ready.'}</p></div><div className="button-row"><button className="quiet" onClick={()=>void verify()}>↻ Refresh</button>{section!=='overview'&&<button onClick={()=>setEditing({entity:tab,row:null})}>+ Add {section==='partner_links'?'partner link':section==='photos'?'photo':section==='attractions'?'attraction':'destination'}</button>}</div></div>
 {error&&<div role="alert" className="alert error">{error}</div>}
 {!data?<section className="panel empty" role="status">Loading authorized editorial data…</section>:<>
 {section==='overview'?<><div className="stats-grid"><Metric label="Destinations" value={data.destinations.length} detail="Permanent places to discover" icon="⌖"/><Metric label="Attractions" value={data.attractions.length} detail="Places & local experiences" icon="◇"/><Metric label="Translation coverage" value={`${total?Math.round(translations/(total*2)*100):0}%`} detail={`${translations} of ${total*2} EN / HU records`} icon="Aa"/><Metric label="Awaiting photo review" value={data.photos.filter(p=>p.approval_status!=='approved').length} detail="Private until rights are verified" icon="▧"/></div><div className="overview-grid"><section className="panel"><div className="panel-heading"><h2>Publication readiness</h2><span className="tag">LIVE DATABASE</span></div><p className="muted">Nothing is published automatically.</p><div className="readiness">{['draft','published','archived'].map(status=><div key={status}><div className="row"><Status value={status}/><strong>{allContent.filter(r=>r.publication_status===status).length}</strong></div><div className="track"><span style={{width:`${total?allContent.filter(r=>r.publication_status===status).length/total*100:0}%`}}/></div></div>)}</div><div className="callout"><strong>A deliberate publishing process</strong><p>Draft → request review → approve → publish. Any content edit invalidates its earlier approval.</p></div></section><section className="panel checklist"><div className="panel-heading"><h2>Before the next publish</h2><span>↗</span></div>{[['01','Complete both languages','English and Hungarian text, tips and descriptions.'],['02','Verify the source','Evidence URLs, geography and review dates.'],['03','Review photo rights','Authentic subject, commercial licence and visible credit.']].map(([n,t,b])=><div className="checklist-item" key={n}><span>{n}</span><div><strong>{t}</strong><p>{b}</p></div></div>)}</section></div><section className="panel"><div className="panel-heading"><h2>Recent editorial changes</h2><span className="muted small">Append-only audit history</span></div>{data.editorial_audit_log.length?<div className="table-scroll"><table><thead><tr><th>Record</th><th>Action</th><th>Editor</th><th>Time</th></tr></thead><tbody>{data.editorial_audit_log.slice(0,12).map(a=><tr key={String(a.id)}><td><strong>{String(a.entity_id)}</strong><small>{String(a.entity_table)}</small></td><td><Status value={a.operation}/></td><td>{a.actor_id?String(a.actor_id).slice(0,8):'Database operator'}</td><td>{new Date(String(a.occurred_at)).toLocaleString()}</td></tr>)}</tbody></table></div>:<div className="empty"><span>↻</span><h3>No editorial changes recorded yet</h3><p>Changes made after the admin migration appear here.</p></div>}</section></>:
 <><section className="panel catalog"><div className="catalog-toolbar"><div className="search-field"><span>⌕</span><input aria-label={`Search ${title}`} placeholder={`Search ${title.toLowerCase()} by name or permanent ID…`} value={search} onChange={e=>setSearch(e.target.value)}/></div><select aria-label="Filter publication status" value={filter} onChange={e=>setFilter(e.target.value)}>{['all','draft','pending','published','archived','active','inactive'].map(s=><option key={s} value={s}>{s==='all'?'All statuses':s}</option>)}</select><span className="muted small">{rows.length} records</span></div>{rows.length?<div className="table-scroll"><table><thead><tr><th>{title}</th><th>Status</th><th>Approval</th><th>{section==='partner_links'?'Provider':section==='photos'?'Rights':'Languages'}</th><th/></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td><strong>{name(tab,r)}</strong><small>{r.id}</small></td><td><Status value={r.publication_status??(r.enabled?'active':'inactive')}/></td><td><Status value={r.approval_status}/></td><td>{section==='partner_links'?String(r.provider_id):section==='photos'?r.record?.kind==='placeholder'?'Neutral placeholder':r.record?.commercialUseAllowed===true?'Permission recorded':'Unverified':<div className="language-badges">{['en','hu'].map(l=><span key={l} className={(section==='destinations'?data.destination_translations:data.attraction_translations).some(t=>t.language===l&&t[section==='destinations'?'destination_id':'attraction_id']===r.id)?'complete':''}>{l.toUpperCase()}</span>)}</div>}</td><td><button className="quiet edit-button" onClick={()=>setEditing({entity:tab,row:r})}>Edit ↗</button></td></tr>)}</tbody></table></div>:<div className="empty"><span>◇</span><h3>{search?'No matching records':'A clean starting point'}</h3><p>{section==='partner_links'?'Add a documented provider URL. Affiliate tracking stays disabled.':'Add a draft or adjust your search and filters.'}</p></div>}</section>{editing&&<Editor key={`${editing.entity}:${editing.row?.id??'new'}`} entity={editing.entity} row={editing.row} data={data} client={client!} onSaved={reload} onClose={()=>setEditing(null)}/>}</>}
 </>}
 </>}
 <footer>Travel Explorer <span>·</span> Editorial studio v1 <span>·</span> Private by design</footer>
 </main></div></div>
}
function Metric({label,value,detail,icon}:{label:string;value:string|number;detail:string;icon:string}){return <section className="metric panel"><div className="row"><span>{label}</span><i>{icon}</i></div><strong>{value}</strong><p>{detail}</p></section>}
