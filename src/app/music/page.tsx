import db from "@/db/connection";
import { albumSchema } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import Albumcard from "../components/albumcard";

export default async function Music() {
  const albums = await db.select().from(albumSchema).orderBy(albumSchema.title);
  return (
    <>
      <h1 className="flex justify-center font-bold">all albums</h1>
      <Link href="/music/submit-album">
        <div className="flex justify-center">
          <button className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
            submit album
          </button>
        </div>
      </Link>
      <ul>
        {albums.map((album) => (
          <>
            <div className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
              <li className=" flex justify-center items-center" key={album.id}>
                <Albumcard {...album} />
                <Link href={`/music/${album.id}`}>
                  <button className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
                    show more
                  </button>
                </Link>
              </li>
            </div>
          </>
        ))}
      </ul>
    </>
  );
}
