import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{
        const {songName, artistName, className, } = await req.json()
        console.log(songName, artistName, className)
        return NextResponse.json({
            ok: "Data has been successfully submitted.",
            status: 201
        })
    }catch(error){
        console.error("There was an issue sending the data to the DB.", error)
        return NextResponse.json({error: "Something went wrong with your request.", status: 500})
    }
}