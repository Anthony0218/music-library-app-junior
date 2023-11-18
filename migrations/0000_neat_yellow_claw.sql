CREATE TABLE IF NOT EXISTS "album" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"artist" varchar(256) NOT NULL,
	"genre" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "song" (
	"id" serial PRIMARY KEY NOT NULL,
	"album_id" integer NOT NULL,
	"name" varchar(256) NOT NULL,
	"duration" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "song" ADD CONSTRAINT "song_album_id_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
