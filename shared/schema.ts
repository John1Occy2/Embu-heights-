import { pgTable, text, serial, integer, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  capacity: integer("capacity").notNull(),
  imageUrl: text("image_url").notNull(),
  virtualTourUrl: text("virtual_tour_url"),
  amenities: text("amenities").array().notNull(),
  isBooked: boolean("is_booked").notNull().default(false),
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

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id").notNull(),
  sessionId: text("session_id").notNull(),
  addedAt: date("added_at").notNull().default("CURRENT_DATE"),
});

export const insertRoomSchema = createInsertSchema(rooms).omit({ id: true, isBooked: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true });
export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true, addedAt: true });

export type Room = typeof rooms.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export const bookingFormSchema = insertBookingSchema.extend({
  checkIn: z.coerce.date().min(new Date(), "Check-in date must be in the future"),
  checkOut: z.coerce.date(),
}).refine(data => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});