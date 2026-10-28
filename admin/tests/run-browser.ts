// Runs the fixture server and browser in one local execution environment.
import {spawn} from 'node:child_process';
import {createWriteStream} from 'node:fs';
const log=createWriteStream('.validation/browser-server.log');
const server=spawn(process.execPath,['admin/node_modules/next/dist/bin/next','dev','admin','--hostname','127.0.0.1','--port','3100','--webpack'],{
 env:{...process.env,NEXT_PUBLIC_SUPABASE_URL:'https://example.supabase.co',NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:'sb_publishable_TEST_ONLY_BROWSER_FIXTURE'},stdio:['ignore','pipe','pipe'],
});
server.stdout.pipe(log);server.stderr.pipe(log);
try{
 let ready=false;
 for(let i=0;i<150;i++){
  if(server.exitCode!==null)throw Error('Fixture server exited. See browser-server.log.');
  try{const response=await fetch('http://127.0.0.1:3100');if(response.ok){ready=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,200));
 }
 if(!ready)throw Error('Fixture server did not become ready.');
 await import('./browser-check.ts');
}finally{server.kill('SIGTERM');log.end()}
