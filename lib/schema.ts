import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "@vercel/postgres";
import { pgTable, text, serial, integer, date } from "drizzle-orm/pg-core";

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  capacity: integer("capacity").notNull(),
  imageUrl: text("image_url").notNull(),
  amenities: text("amenities").array().notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  checkIn: date("check_in").notNull(),
  checkOut: date("check_out").notNull(),
  guests: integer("guests").notNull(),
  status: text("status").notNull().default("pending"),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
});

export const insertRoomSchema = createInsertSchema(rooms).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true });

export type Room = typeof rooms.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;

export const bookingFormSchema = insertBookingSchema.extend({
  checkIn: z.coerce.date().min(new Date(), "Check-in date must be in the future"),
  checkOut: z.coerce.date(),
}).refine(data => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});
