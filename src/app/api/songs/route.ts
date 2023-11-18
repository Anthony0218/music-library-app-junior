import db from "@/db/connection";
import { songSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { albumId: albumId, name, duration } = await request.json();

  try {
    await db
      .insert(songSchema)
      .values({ albumId: albumId, name: name, duration: duration });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 402 });
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  try {
    await db.delete(songSchema).where(eq(songSchema.id, id));
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 402 });
  }
}
