"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Albumcard = {
  id: number;
  title: string;
  artist: string;
  genre: string;
};

export default function Albumcard({ id, title, artist, genre }: Albumcard) {
  const [edit, setEditing] = useState(false);
  const [newTitle, setNewtitle] = useState(title);
  const [newArtist, setNewartist] = useState(artist);
  const [newGenre, setNewgenre] = useState(genre);
  const router = useRouter();
  const editAlbum = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch("/api/album", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: newTitle,
        artist: newArtist,
        genre: newGenre,
      }),
    });
    if (!response.ok) {
      throw new Error(`status code is ${response.status}`);
    }
    setEditing(false);
    router.refresh();
  };
  const deleteAlbum = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch("/api/album", {
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
      {edit ? (
        <form onSubmit={(e) => editAlbum(e)}>
          <input
            className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
            type="text"
            placeholder="add a new title "
            value={newTitle}
            onChange={(e) => setNewtitle(e.target.value)}
          />

          <input
            className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
            type="text"
            placeholder="add a new artist "
            value={newArtist}
            onChange={(e) => setNewartist(e.target.value)}
          />

          <input
            className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
            type="text"
            placeholder="add a new genre "
            value={newGenre}
            onChange={(e) => setNewgenre(e.target.value)}
          />
          <button className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
            save
          </button>
        </form>
      ) : (
        <>
          <h1 className="flex justify-center font-bold">
            album #{id}:{title}
          </h1>

          <div>
            artist: {artist}, genre: {genre}{" "}
          </div>
          <button
            onClick={() => setEditing(true)}
            className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
          >
            edit
          </button>
          <button
            onClick={deleteAlbum}
            className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400"
          >
            delete
          </button>
        </>
      )}
    </>
  );
}
