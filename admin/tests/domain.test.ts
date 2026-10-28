import {test} from 'node:test';
import assert from 'node:assert/strict';
import {safeHttps,providerUrl,validatePayload,photoIssues,validateUpload} from '../lib/domain.ts';
test('rejects unsafe and redirect provider URLs and accepts exact ordinary provider pages',()=>{
 for(const url of ['javascript:alert(1)','http://www.booking.com/city/test','https://www.booking.com.evil.test/city/test','https://user:pass@www.booking.com/city/test','https://www.booking.com/search?next=bad','https://www.booking.com/city/test?aid=unapproved','https://www.booking.com/city/test#fragment'])assert.equal(providerUrl('booking',url),false,url);
 assert.equal(providerUrl('booking','https://www.booking.com/city/hu/budapest.html'),true);
 assert.equal(safeHttps('javascript:bad'),false);
});
test('both languages and complete coordinates are required',()=>{
 const t={name:'Fixture',country:'Fixture',region:'Fixture',tagline:'Fixture',description:'Fixture',coordinate_label:'Fixture'};
 const p={id:'fixture',latitude:47,longitude:19,translations:{en:t,hu:t}};
 assert.doesNotThrow(()=>validatePayload('destinations',p));
 assert.throws(()=>validatePayload('destinations',{...p,translations:{en:t}}));
 assert.throws(()=>validatePayload('destinations',{...p,latitude:91}));
 assert.throws(()=>validatePayload('destinations',{...p,id:'renamed INVALID'}));
});
test('placeholders, synthetic photos and missing commercial rights cannot pass photo review',()=>{
 assert.ok(photoIssues({kind:'placeholder'},null,[]).length);
 const p={kind:'photo',authenticity:'photograph',reviewStatus:'reviewed',commercialUseAllowed:true,license:'CC-BY-4.0',author:'Test',attribution:'Test',subject:'Test',reviewedBy:'Test reviewer',modificationNotes:'None',provenanceNotes:'Test evidence',url:'https://example.com/photo',originalUrl:'https://example.com/original',sourceUrl:'https://example.com/source',licenseUrl:'https://example.com/licence',verifiedAt:'2026-10-26',subjectVerifiedAt:'2026-10-26',evidenceUrls:['https://example.com/evidence']};
 assert.deepEqual(photoIssues(p,'Public evidence',['https://example.com/evidence']),[]);
 assert.ok(photoIssues({...p,authenticity:'unknown'},'Public evidence',['https://example.com/evidence']).length);
 assert.ok(photoIssues({...p,commercialUseAllowed:false},'Public evidence',['https://example.com/evidence']).length);
 assert.ok(photoIssues({...p,verifiedAt:'2026-02-30'},'Public evidence',['https://example.com/evidence']).length);
});
test('raster uploads enforce file size, bytes and MIME agreement',async()=>{
 await assert.rejects(validateUpload(new File(['<svg/>'],'attack.svg',{type:'image/svg+xml'})));
 await assert.rejects(validateUpload(new File(['not an image'],'fake.jpg',{type:'image/jpeg'})));
 assert.deepEqual(await validateUpload(new File([new Uint8Array([255,216,255,0])],'fixture.jpg',{type:'image/jpeg'})),{ext:'jpg',mime:'image/jpeg'});
 await assert.rejects(validateUpload(new File([new Uint8Array([255,216,255])],'wrong.png',{type:'image/png'})));
});

test('configured server rendering does not initialize the browser session client',async()=>{
 const {readFileSync}=await import('node:fs');
 const {runInNewContext}=await import('node:vm');
 const {createRequire}=await import('node:module');
 const {default:ts}=await import('typescript');
 const {createElement}=await import('react');
 const {renderToString}=await import('react-dom/server');
 const require=createRequire(import.meta.url);
 const source=readFileSync(new URL('../components/AdminApp.tsx',import.meta.url),'utf8');
 const output=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
 let initialized=0;
 const exports:Record<string,any>={};
 runInNewContext(output,{exports,require:(name:string)=>{
  if(name==='../lib/supabase')return {settings:()=>({url:'https://example.supabase.co',key:'test-public-fixture'}),browserClient:()=>{initialized++;throw Error('Browser client initialized during rendering')}};
  if(name==='../lib/data')return {inventory:()=>{throw Error('No data during rendering')}};
  if(name==='./Editor')return {__esModule:true,default:()=>null};
  return require(name);
 }});
 const first=renderToString(createElement(exports.default));
 const second=renderToString(createElement(exports.default));
 assert.equal(initialized,0);
 assert.equal(first,second);
 assert.ok(first.includes('Verifying your session'));
 assert.ok(!first.includes('Connect your project'));
});
