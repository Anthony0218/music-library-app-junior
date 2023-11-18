import Albumcard from "@/app/components/albumcard";
import Songcard from "@/app/components/songcard";
import db from "@/db/connection";
import { albumSchema, songSchema } from "@/db/schema";
import Link from "next/link";
import { redirect } from "next/navigation";

type Context = {
  params: { albumId: string };
};

export default async function Song({ params: { albumId } }: Context) {
  const songs = await db.select().from(songSchema);
  const rightSongs = songs.filter((song) => song.albumId === Number(albumId));
  const albums = await db.select().from(albumSchema);
  const rightAlbum = albums.find((album) => album.id === Number(albumId));
  if (rightAlbum === undefined) {
    redirect("/music");
  }
  return (
    <>
      <div className=" border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
        <div className="flex justify-center">
          <Albumcard {...rightAlbum} />
        </div>
        <Songcard id={rightAlbum.id} songs={rightSongs} />
      </div>
      <div className="flex justify-center">
        <Link href="/music">
          <button className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
            back
          </button>
        </Link>
      </div>
    </>
  );
}
