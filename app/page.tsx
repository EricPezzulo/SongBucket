"use client";
import { useRef } from "react";

export default function Home() {
  const songName = useRef<HTMLInputElement>(null);
  const artistName = useRef<HTMLInputElement>(null);
  const className = useRef<HTMLSelectElement>(null);

  const submitSongData = async () => {
    console.log(
      songName.current?.value,
      artistName.current?.value,
      className.current?.value
    );
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        songName: songName.current?.value,
        artistName: artistName.current?.value,
        className: className.current?.value,
      }),
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div>
          <h1 className="font-medium text-3xl">Playlist Center</h1>
        </div>
        <p>
          Enter a song and artist name that you would like to be played in
          class.
        </p>
        <div className="p-3">
          <p className="pb-2">Song</p>
          <input
            ref={songName}
            type="text"
            className="rounded border-1 h-10 w-[400px] border-slate-200"
          />
        </div>
        <div className="p-3">
          <p className="pb-2">Artist</p>
          <input
            ref={artistName}
            type="text"
            className="rounded border-1 h-10 w-[400px] border-slate-200"
          />
        </div>
        <div>
          <p>Class</p>
          <select ref={className}>
            <option value="strength">METHOD STRENGTH</option>
            <option value="hybrid">METHOD HYBRID</option>
            <option value="hiit">METHOD HIIT</option>
            <option value="afterburn">METHOD AFTERBURN</option>
            <option value="ignite">METHOD IGNITE</option>
          </select>
        </div>
        <div>
          <button
            onClick={submitSongData}
            className="rounded bg-white p-3 hover:bg-slate-100 duration-100"
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </main>
  );
}
