import { NextResponse } from "next/server";
import crypto from "node:crypto";
// import querystring from "querystring";


const generateRandomString = (length: number) => {
  return crypto.randomUUID().toString().slice(0, length);
};
export async function GET(req: Request) {
  try {
    let client_id = process.env.SPOTIFY_CLIENT_ID;
    let state = generateRandomString(16);
    let redirect_uri = "http://localhost:3000/callback";
    let scope = "user-read-private user-read-email";
    if (!client_id) {
      throw new Error("Spotify Client ID is not defined");
    }
    const params = new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    });
    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    


    return NextResponse.json({ok:"GET REQUEST sucessful", status:200, redirect_url: authUrl})
    // return NextResponse.redirect(authUrl)

  } catch (error) {
    console.error("Something went wrong with your GET request", error);
    return NextResponse.json({
      message: "Something went wrong in your GET request.",
      error,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { songName, artistName, className } = await req.json();
    console.log(songName, artistName, className);
    return NextResponse.json({
      ok: "Data has been successfully submitted.",
      status: 201,
    });
  } catch (error) {
    console.error("There was an issue sending the data to the DB.", error);
    return NextResponse.json({
      error: "Something went wrong with your request.",
      status: 500,
    });
  }
}
