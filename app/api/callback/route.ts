// import cookie from 'cookie';
// import fetch from 'node-fetch';
import { NextRequest, NextResponse } from 'next/server';

export async function GET( req: NextRequest){
    let {searchParams} = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const storedState = req.cookies.get('state')?.value

if(!state || state !== storedState) {
    return NextResponse.redirect('/?' + new URLSearchParams({error: 'state-mismatch'}).toString());
}


  const client_id = process.env.SPOTIFY_CLIENT_ID!;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI!;

   const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code!,
    redirect_uri: redirect_uri
  });

    const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
    },
    body: params.toString()
  });

  const data = await response.json();

  if (response.ok) {
    const newResponse = NextResponse.redirect('/');
    newResponse.cookies.delete('state');
    newResponse.cookies.set('access_token', data.access_token, { path: '/' });
    return newResponse;
  } else {
    return NextResponse.json(data, { status: 400 });
  }
}