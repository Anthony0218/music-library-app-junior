import db from "@/db/connection";
import { albumSchema, songSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Averia_Libre } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, artist, genre } = await request.json();

  try {
    await db
      .insert(albumSchema)
      .values({ title: title, artist: artist, genre: genre });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 402 });
  }
}

export async function PUT(request: NextRequest) {
  const { id, title, artist, genre } = await request.json();

  try {
    await db
      .update(albumSchema)
      .set({ title: title, artist: artist, genre: genre })
      .where(eq(albumSchema.id, id));
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 402 });
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  try {
    await db.delete(songSchema).where(eq(songSchema.albumId, id));
    await db.delete(albumSchema).where(eq(albumSchema.id, id));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 402 });
  }
}
