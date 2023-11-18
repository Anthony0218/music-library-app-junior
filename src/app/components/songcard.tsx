"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Songcard = {
  id: number;
  songs: {
    id: number;
    albumId: number;
    name: string;
    duration: number;
  }[];
};

export default function Songcard({ id, songs }: Songcard) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const router = useRouter();

  const addSong = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("/api/songs", {
      method: "POST",
      body: JSON.stringify({
        albumId: id,
        name: name,
        duration: Number(duration),
      }),
    });
    if (!response.ok) {
      throw new Error(`status code is ${response.status}`);
    }
    setName("");
    setDuration("");
    router.refresh();
  };
  const deleteSong = async (id: number) => {
    const response = await fetch("/api/songs", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!response.ok) {
      throw new Error(`status code is ${response.status}`);
    }

    router.refresh();
  };

  return (
    <>
      <h1 className="flex justify-center">all songs of album #{id}</h1>
      <ul>
        {songs.map((song) => (
          <li className="flex justify-center" key={song.id}>
            {song.name} {`(${song.duration})min`}
            <button
              className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
              onClick={() => deleteSong(song.id)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
      <form className="flex justify-center" onSubmit={(e) => addSong(e)}>
        <input
          className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
          type="text"
          placeholder="add name of song "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
          type="text"
          placeholder="add duration of song "
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
          add
        </button>
      </form>
    </>
  );
}
