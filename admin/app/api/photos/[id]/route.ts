import { NextResponse } from 'next/server';
import { publicClient } from '../../../../lib/supabase';
export const dynamic='force-dynamic';
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  if(!/^[a-zA-Z0-9:_-]{1,160}$/.test(id))return new Response('Not found',{status:404});
  const client=publicClient();
  if(!client)return new Response('Unavailable',{status:503});
  // The anonymous publishable client can see only a rights-approved, assigned, published photo.
  const {data,error}=await client.from('travel_photo_delivery').select('storage_path').eq('id',id).maybeSingle();
  if(error||!data?.storage_path)return new Response('Not found',{status:404,headers:{'Cache-Control':'no-store'}});
  const signed=await client.storage.from('travel-editorial').createSignedUrl(data.storage_path,300);
  if(signed.error||!signed.data)return new Response('Not found',{status:404});
  const response=NextResponse.redirect(signed.data.signedUrl);
  response.headers.set('Cache-Control','no-store');
  response.headers.set('X-Content-Type-Options','nosniff');
  return response;
}
