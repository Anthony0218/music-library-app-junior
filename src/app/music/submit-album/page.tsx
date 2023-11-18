"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Submitalbum() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const router = useRouter();

  const addAlbum = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("/api/album", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        artist: artist,
        genre: genre,
      }),
    });
    if (!response.ok) {
      throw new Error(`status code is ${response.status}`);
    }
    setTitle("");
    setArtist("");
    setGenre("");
    router.push("/music");
    router.refresh();
  };

  return (
    <>
      <h1 className="flex justify-center font-bold">submit album</h1>
      <form className="flex justify-center" onSubmit={(e) => addAlbum(e)}>
        <input
          className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
          type="text"
          placeholder="add a title "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
          type="text"
          placeholder="add an artist "
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <input
          className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
          type="text"
          placeholder="add a genre "
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
          add
        </button>
      </form>
    </>
  );
}
