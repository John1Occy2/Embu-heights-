import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { bookingFormSchema, insertContactSchema, insertCartItemSchema } from "@shared/schema";

interface SessionRequest extends Request {
  sessionID: string;
}

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

      // Check room availability
      const isAvailable = await storage.checkRoomAvailability(
        booking.roomId,
        new Date(booking.checkIn),
        new Date(booking.checkOut)
      );

      if (!isAvailable) {
        return res.status(400).json({ 
          message: "Room is not available for the selected dates" 
        });
      }

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

  // Cart endpoints
  app.post("/api/cart", async (req: SessionRequest, res) => {
    try {
      const cartItem = insertCartItemSchema.parse({
        ...req.body,
        sessionId: req.sessionID,
      });
      const newCartItem = await storage.addToCart(cartItem);
      res.status(201).json(newCartItem);
    } catch (error) {
      res.status(400).json({ message: "Invalid cart data" });
    }
  });

  app.get("/api/cart", async (req: SessionRequest, res) => {
    try {
      const cartItems = await storage.getCartItems(req.sessionID);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart items" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeFromCart(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error removing item from cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}