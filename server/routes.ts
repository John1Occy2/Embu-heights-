import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { bookingFormSchema, insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/rooms", async (_req, res) => {
    const rooms = await storage.getRooms();
    res.json(rooms);
  });

  app.get("/api/rooms/:id", async (req, res) => {
    const room = await storage.getRoom(parseInt(req.params.id));
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const booking = bookingFormSchema.parse(req.body);
      const newBooking = await storage.createBooking(booking);
      res.status(201).json(newBooking);
    } catch (error) {
      res.status(400).json({ message: "Invalid booking data" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const contact = insertContactSchema.parse(req.body);
      const newContact = await storage.createContact(contact);
      res.status(201).json(newContact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
