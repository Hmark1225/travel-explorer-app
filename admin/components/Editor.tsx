'use client';
import { useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { attractionCategories, destinationCategories, photoIssues, providerNames, validatePayload, validateUpload, safeHttps, type Entity, type Row, type Translation } from '../lib/domain';
import { emptyRecord, type Inventory } from '../lib/data';

function Field({label,value,onChange,multiline=false,type='text',required=false,disabled=false}:{label:string;value:unknown;onChange:(value:string)=>void;multiline?:boolean;type?:string;required?:boolean;disabled?:boolean}) {
  return <label className="field"><span>{label}{required?' *':''}</span>{multiline?<textarea required={required} value={String(value??'')} onChange={e=>onChange(e.target.value)} rows={4}/>:<input required={required} disabled={disabled} type={type} value={String(value??'')} onChange={e=>onChange(e.target.value)}/>}</label>;
}
function Select({label,value,options,onChange,disabled=false}:{label:string;value:unknown;options:{id:string;name:string}[];onChange:(value:string)=>void;disabled?:boolean}) {
 return <label className="field"><span>{label}</span><select disabled={disabled} value={String(value??'')} onChange={e=>onChange(e.target.value)}><option value="">Choose…</option>{options.map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</select></label>;
}
export default function Editor({entity,row,data,client,onSaved,onClose}:{entity:Entity;row:Row|null;data:Inventory;client:SupabaseClient;onSaved:()=>Promise<void>;onClose:()=>void}) {
 const [current,setCurrent]=useState<Row|null>(row);
 const [draft,setDraft]=useState<Record<string,unknown>>(()=>row?structuredClone(row):{id:'',version:0,category:entity==='destinations'?'Culture':'History & culture',country_code:'',kind:'place',admission_type:'unknown',destination_id:'',latitude:null,longitude:null,provider_id:'booking',action:'accommodation',language:'en',record:emptyRecord(entity,''),public_evidence_urls:[],review_note:'',review_evidence_url:''});
 const [translations,setTranslations]=useState<Record<string,Translation>>(()=>Object.fromEntries(['en','hu'].map(language=>{
   const source=(entity==='destinations'?data.destination_translations:data.attraction_translations).find(t=>t.language===language&&t[entity==='destinations'?'destination_id':'attraction_id']===row?.id);
   return [language,source?structuredClone(source) as Translation:{}];
 })));
 const [language,setLanguage]=useState('en');
 const [dirty,setDirty]=useState(false);
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState(''),[preview,setPreview]=useState('');
 const [targetKind,setTargetKind]=useState('destination'),[target,setTarget]=useState('');
 const set=(key:string,value:unknown)=>{setDirty(true);setDraft(d=>({...d,[key]:value}))};
 const record=(draft.record??{}) as Record<string,unknown>;
 const setRecord=(key:string,value:unknown)=>set('record',{...record,[key]:value});
 const setText=(key:string,value:string|string[])=>{setDirty(true);setTranslations(t=>({...t,[language]:{...t[language],[key]:value}}))};
 const run=async(action:()=>Promise<void>)=>{setBusy(true);setError('');setNotice('');try{await action()}catch(e){setError(e instanceof Error?e.message:'Operation failed.')}finally{setBusy(false)}};
 const save=()=>run(async()=>{
   const payload={...draft,translations,record:{...record,...(entity==='destinations'||entity==='attractions'?{id:draft.id}:{})}};
   validatePayload(entity,payload);
   const {data:result,error}=await client.rpc('admin_save',{entity,payload,expected_version:current?.version??0});
   if(error)throw new Error(error.code==='40001'?'Someone changed this record. Reload it before saving; your edits are still visible here.':error.message);
   setCurrent(result);setDraft(result);setDirty(false);setNotice('Draft saved. Approval and publication were reset.');await onSaved();
 });
 const transition=(operation:string,item:Row,table:string=entity)=>run(async()=>{
   if(table===entity&&dirty)throw new Error('Save draft changes before a workflow transition.');
   if(!window.confirm(`${operation==='publish'?'Publish / activate':operation==='approve'?'Approve':operation==='review'?'Request review for':'Archive / deactivate'} ${item.id}? This is recorded in the audit log.`))return;
   const {data:result,error}=await client.rpc('admin_transition',{entity:table,item_id:item.id,expected_version:item.version,operation});
   if(error)throw new Error(error.message);
   if(table===entity){setCurrent(result);setDraft(result)}
   setNotice(`${operation} completed.`);await onSaved();
 });
 const upload=async(file:File)=>run(async()=>{
   setDirty(true);
   const {ext,mime}=await validateUpload(file);
   const path=`${crypto.randomUUID()}.${ext}`;
   const uploaded=await client.storage.from('travel-editorial').upload(path,file,{contentType:mime,upsert:false});
   if(uploaded.error)throw new Error(uploaded.error.message);
   const preservePlaceholder=current?.record?.kind==='placeholder';
   const id=preservePlaceholder?`photo-${crypto.randomUUID()}`:current?.id||`photo-${crypto.randomUUID()}`;
   if(preservePlaceholder)setCurrent(null);
   const origin=process.env.NEXT_PUBLIC_ADMIN_ORIGIN;
   setDraft(d=>({...d,id,version:preservePlaceholder?0:d.version,storage_path:path,record:{...d.record as object,kind:'photo',authenticity:'unknown',reviewStatus:'needs-review',url:origin?`${origin}/api/photos/${encodeURIComponent(id)}`:null}}));
   const signed=await client.storage.from('travel-editorial').createSignedUrl(path,300);
   if(signed.error)throw new Error(signed.error.message);
   setPreview(signed.data.signedUrl);setNotice('Uploaded privately. Verify the location and rights, then save the draft. No publication occurred.');
 });
 const assignments=data.photo_assignments.filter(a=>a.photo_id===current?.id);
 const issues=entity==='photos'?photoIssues(record,draft.public_provenance,draft.public_evidence_urls):[];
 return <section className="editor panel"><header className="editor-head"><div><p className="eyebrow">{entity.replace('_',' ')} / editorial record</p><h2>{current?'Edit record':'Create draft'}</h2><p className="muted">Permanent IDs stay unchanged. Saving resets approval; publication is always a separate action.</p></div><button className="quiet" onClick={onClose}>Close editor ×</button></header>
   {error&&<div role="alert" className="alert error">{error}</div>}{notice&&<div role="status" className="alert success">{notice}</div>}
   <fieldset disabled={busy} className="editor-fields"><div className="grid two">
   <Field label="Permanent ID" value={draft.id} onChange={v=>set('id',v)} required disabled={!!current}/>
   {(entity==='attractions'||entity==='partner_links')&&<Select label="Destination" value={draft.destination_id} disabled={!!current} options={data.destinations.map(d=>({id:d.id,name:String(d.record?.name??d.id)}))} onChange={v=>set('destination_id',v)}/>}
   {entity==='destinations'&&<Field label="Country code (ISO, e.g. HU)" value={draft.country_code} onChange={v=>set('country_code',v.toUpperCase())} required/>}
   {(entity==='destinations'||entity==='attractions')&&<Select label="Category" value={draft.category} options={(entity==='destinations'?destinationCategories:attractionCategories).map(id=>({id,name:id}))} onChange={v=>set('category',v)}/>}
   {entity==='attractions'&&<><Select label="Kind" value={draft.kind} options={[{id:'place',name:'Place'},{id:'experience',name:'Area experience'}]} onChange={v=>set('kind',v)}/><Select label="Admission (editorial, not live pricing)" value={draft.admission_type} options={['unknown','free','paid','varies'].map(id=>({id,name:id}))} onChange={v=>set('admission_type',v)}/></>}
   </div>
   {(entity==='destinations'||entity==='attractions')&&<>
    <div className="language-tabs" role="tablist" aria-label="Content language">{['en','hu'].map(l=><button type="button" key={l} role="tab" aria-selected={language===l} className={language===l?'active':''} onClick={()=>setLanguage(l)}>{l==='en'?'English':'Magyar'} <span>{Object.keys(translations[l]??{}).length?'•':'○'}</span></button>)}</div>
    <div className="grid two">
    <Field label="Name" value={translations[language]?.name} onChange={v=>setText('name',v)} required/>
    {entity==='destinations'?<><Field label="Country" value={translations[language]?.country} onChange={v=>setText('country',v)} required/><Field label="Region" value={translations[language]?.region} onChange={v=>setText('region',v)} required/><Field label="Tagline" value={translations[language]?.tagline} onChange={v=>setText('tagline',v)} required/><Field label="Coordinate description" value={translations[language]?.coordinate_label} onChange={v=>setText('coordinate_label',v)} required/><Field label="Description" multiline value={translations[language]?.description} onChange={v=>setText('description',v)} required/></>:<><Field label="Estimated duration" value={translations[language]?.estimated_duration} onChange={v=>setText('estimated_duration',v)} required/><Field label="Short description" multiline value={translations[language]?.short_description} onChange={v=>setText('short_description',v)} required/><Field label="Detailed description" multiline value={translations[language]?.detailed_description} onChange={v=>setText('detailed_description',v)} required/><Field label="Practical tips (one per line)" multiline value={(translations[language]?.useful_tips as string[]??[]).join('\n')} onChange={v=>setText('useful_tips',v.split('\n').filter(Boolean))} required/></>}
    </div>
    <h3>Geography & sources</h3><div className="grid two">
    <Field label="Latitude" type="number" value={draft.latitude} onChange={v=>set('latitude',v===''?null:Number(v))}/><Field label="Longitude" type="number" value={draft.longitude} onChange={v=>set('longitude',v===''?null:Number(v))}/>
    <Field label="Coordinate source URL" value={record.coordinateSourceUrl} onChange={v=>setRecord('coordinateSourceUrl',v||null)}/><Field label="Coordinates verified on" type="date" value={record.coordinatesVerifiedAt} onChange={v=>setRecord('coordinatesVerifiedAt',v||null)}/>
    <Field label="Coordinate attribution" value={record.coordinateAttribution} onChange={v=>setRecord('coordinateAttribution',v||null)}/><Field label="Coordinate licence URL" value={record.coordinateLicenseUrl} onChange={v=>setRecord('coordinateLicenseUrl',v||null)}/>
    <Field label="Official source URLs (one per line)" multiline value={(record.sourceUrls as string[]??[]).join('\n')} onChange={v=>setRecord('sourceUrls',v.split('\n').filter(Boolean))}/>
    <label className="field"><span>Source organizations</span><select multiple value={record.sourceIds as string[]??[]} onChange={e=>setRecord('sourceIds',Array.from(e.target.selectedOptions,o=>o.value))}>{data.content_sources.map(s=><option key={String(s.id)} value={String(s.id)}>{String(s.name)}</option>)}</select></label>
    {entity==='attractions'&&<><Field label="Official website URL" value={record.officialWebsite} onChange={v=>setRecord('officialWebsite',v||null)}/><Field label="Official website verified on" type="date" value={record.officialWebsiteVerifiedAt} onChange={v=>setRecord('officialWebsiteVerifiedAt',v||null)}/><Select label="Coordinate precision" value={record.coordinatePrecision} options={['town-overview','entrance'].map(id=>({id,name:id}))} onChange={v=>setRecord('coordinatePrecision',v||null)}/></>}
    <Field label="Last source review" type="date" value={draft.last_verified_at} onChange={v=>set('last_verified_at',v||null)}/></div>
   </>}
   {entity==='photos'&&<><div className="photo-intake"><div><h3>Private photo intake</h3><p>Genuine location photographs only. JPEG, PNG or WebP, up to 10 MB. Uploading never grants rights or publishes an image.</p><input aria-label="Upload genuine location photograph" type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file)}}/></div>{preview?<img src={preview} alt="Private review preview; not published"/>:<div className="photo-placeholder">▧<span>Neutral placeholder</span></div>}</div>
   {draft.storage_path&&!preview&&<button type="button" className="quiet" onClick={()=>void run(async()=>{const result=await client.storage.from('travel-editorial').createSignedUrl(String(draft.storage_path),300);if(result.error)throw result.error;setPreview(result.data.signedUrl)})}>Preview private upload for 5 minutes</button>}
   <div className="grid two">{['url','originalUrl','sourceUrl','author','attribution','license','licenseUrl','subject','verifiedAt','subjectVerifiedAt','reviewedBy','modificationNotes','provenanceNotes'].map(key=><Field key={key} label={key} type={key.endsWith('At')?'date':'text'} value={record[key]} onChange={v=>setRecord(key,v||null)}/>)}
   <Field label="Original evidence URLs (one per line)" multiline value={(record.evidenceUrls as string[]??[]).join('\n')} onChange={v=>setRecord('evidenceUrls',v.split('\n').filter(Boolean))}/>
   <Field label="Public provenance (no private notes)" multiline value={draft.public_provenance} onChange={v=>set('public_provenance',v)}/><Field label="Public evidence URLs (one per line)" multiline value={(draft.public_evidence_urls as string[]??[]).join('\n')} onChange={v=>set('public_evidence_urls',v.split('\n').filter(Boolean))}/>
   <Select label="Image classification" value={record.authenticity} options={[{id:'unknown',name:'Unverified / synthetic / unknown'},{id:'photograph',name:'Human-verified genuine photograph'}]} onChange={v=>setRecord('authenticity',v)}/>
   <Select label="Rights and subject review" value={record.reviewStatus} options={[{id:'needs-review',name:'Needs review'},{id:'reviewed',name:'Human review complete'}]} onChange={v=>setRecord('reviewStatus',v)}/>
   <label className="check"><input type="checkbox" checked={record.commercialUseAllowed===true} onChange={e=>setRecord('commercialUseAllowed',e.target.checked)}/>Commercial-use rights verified from the recorded evidence</label>
   </div><div className="alert">{issues.length?<><strong>Before approval</strong><ul>{issues.map(i=><li key={i}>{i}</li>)}</ul></>:<span>Metadata checks complete. Human review is still required.</span>}</div>
   </>}
   {entity==='partner_links'&&<><div className="alert">Ordinary verified links only. Affiliate tracking and API credentials are disabled. These database records do not activate mobile provider links in v1.</div><div className="grid two"><Select label="Provider" value={draft.provider_id} disabled={!!current} options={Object.entries(providerNames).map(([id,name])=>({id,name}))} onChange={v=>setDraft(d=>({...d,provider_id:v,action:v==='booking'?'accommodation':v==='tripadvisor'?'reviews':'tours'}))}/><Select label="Optional attraction" value={draft.attraction_id} disabled={!!current} options={data.attractions.filter(a=>a.destination_id===draft.destination_id).map(a=>({id:a.id,name:String(a.record?.name??a.id)}))} onChange={v=>set('attraction_id',v||null)}/><Select label="Link language" value={draft.language} disabled={!!current} options={[{id:'en',name:'English'},{id:'hu',name:'Hungarian'}]} onChange={v=>set('language',v)}/>{['url','documentation_url','evidence_url','reviewed_by','verified_at'].map(key=><Field key={key} label={key} type={key==='verified_at'?'date':'text'} value={draft[key]} onChange={v=>set(key,v||null)}/>)}</div></>}
   <h3>Editorial verification</h3><div className="grid two"><Field label="Exact verification evidence URL" value={draft.review_evidence_url} onChange={v=>set('review_evidence_url',v)}/><Field label="Review note (20+ characters)" multiline value={draft.review_note} onChange={v=>set('review_note',v)}/></div>
   <div className="editor-actions"><button onClick={()=>void save()}>{busy?'Working…':'Save draft'}</button><span className="muted">Both languages are saved atomically.</span></div>
   </fieldset>
   {current&&<div className="workflow"><div><strong>{String(current.publication_status??(current.enabled?'active':'inactive'))}</strong><span className="muted"> · {String(current.approval_status)} · revision {current.version}</span></div><div className="button-row">{['review','approve','publish','archive'].map(op=><button disabled={busy} className={op==='publish'?'':'quiet'} key={op} onClick={()=>void transition(op,current)}>{op==='review'?'Request review':op==='approve'?'Approve':op==='publish'?'Publish / activate':'Archive / deactivate'}</button>)}</div><p className="muted small">Save your changes before reviewing. Every transition is checked and logged in PostgreSQL.</p></div>}
   {entity==='photos'&&current&&<section className="assignment"><h3>Hero assignment · separate approval</h3><div className="grid two"><Select label="Target kind" value={targetKind} options={[{id:'destination',name:'Destination'},{id:'attraction',name:'Attraction'}]} onChange={v=>{setTargetKind(v);setTarget('')}}/><Select label="Target" value={target} options={(targetKind==='destination'?data.destinations:data.attractions).map(d=>({id:d.id,name:String(d.record?.name??d.id)}))} onChange={setTarget}/></div><button className="quiet" disabled={busy||!target} onClick={()=>void run(async()=>{const existing=data.photo_assignments.find(a=>a.slot==='hero'&&a[`${targetKind}_id`]===target);const {error}=await client.rpc('admin_assign_photo',{photo:current.id,target,target_kind:targetKind,expected_version:existing?.version??0});if(error)throw new Error(error.message);setNotice('Assignment saved as draft. Review and publish it separately.');await onSaved()})}>Assign as draft hero</button>{assignments.map(a=><div className="assignment-row" key={a.id}><strong>{String(a.destination_id??a.attraction_id)}</strong><span>{String(a.publication_status)} / {String(a.approval_status)}</span><div className="button-row">{['review','approve','publish','archive'].map(op=><button className="quiet" disabled={busy} key={op} onClick={()=>void transition(op,a,'photo_assignments')}>{op}</button>)}</div></div>)}</section>}
   {(entity==='photos'?['sourceUrl','licenseUrl','originalUrl']:['coordinateSourceUrl']).filter(k=>safeHttps(record[k])).map(k=><a className="source-link" key={k} href={String(record[k])} target="_blank" rel="noopener noreferrer">{k} ↗</a>)}
 </section>;
}
