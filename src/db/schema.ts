import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const albumSchema = pgTable("album", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  artist: varchar("artist", { length: 256 }).notNull(),
  genre: varchar("genre", { length: 256 }).notNull(),
});

export const songSchema = pgTable("song", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id")
    .notNull()
    .references(() => albumSchema.id),
  name: varchar("name", { length: 256 }).notNull(),
  duration: integer("duration").notNull(),
});
