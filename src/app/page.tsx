import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="flex justify-center font-bold">home page</h1>
      <Link href="/music">
        <div className="flex justify-center">
          <button className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
            music-app
          </button>
        </div>
      </Link>
    </>
  );
}
