import { 
  type Room, type Booking, type Contact, type CartItem,
  type InsertRoom, type InsertBooking, type InsertContact, type InsertCartItem 
} from "@shared/schema";

export interface IStorage {
  // Rooms
  getRooms(): Promise<Room[]>;
  getRoom(id: number): Promise<Room | undefined>;
  updateRoomBookingStatus(id: number, isBooked: boolean): Promise<void>;

  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByRoom(roomId: number): Promise<Booking[]>;
  checkRoomAvailability(roomId: number, checkIn: Date, checkOut: Date): Promise<boolean>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;

  // Cart
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  getCartItems(sessionId: string): Promise<CartItem[]>;
  removeFromCart(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private rooms: Map<number, Room>;
  private bookings: Map<number, Booking>;
  private contacts: Map<number, Contact>;
  private cartItems: Map<number, CartItem>;
  private currentIds: { rooms: number; bookings: number; contacts: number; cartItems: number };

  constructor() {
    this.rooms = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.cartItems = new Map();
    this.currentIds = { rooms: 1, bookings: 1, contacts: 1, cartItems: 1 };

    // Add sample rooms
    const sampleRooms: InsertRoom[] = [
        {
          name: "Presidential Mountain Suite",
          description: "Our finest suite featuring panoramic views of Mount Kenya, featuring a private balcony and luxury amenities",
          price: 45000,
          capacity: 4,
          imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
          virtualTourUrl: "https://example.com/virtual-tour/presidential",
          amenities: ["King Bed", "Private Balcony", "Mountain View", "Jacuzzi", "Butler Service", "Lounge Area"],
        },
        {
          name: "Executive Suite",
          description: "Spacious suite with stunning views of Mount Kenya's peaks and luxury furnishings",
          price: 35000,
          capacity: 3,
          imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
          virtualTourUrl: "https://example.com/virtual-tour/executive",
          amenities: ["King Bed", "Seating Area", "Mountain View", "Mini Bar", "Work Desk"],
        },
        {
          name: "Deluxe Mountain View",
          description: "Elegant room offering beautiful views of Mount Kenya and surrounding landscapes",
          price: 28000,
          capacity: 2,
          imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
          virtualTourUrl: "https://example.com/virtual-tour/deluxe",
          amenities: ["Queen Bed", "Mountain View", "Seating Area", "Mini Bar"],
        },
        {
          name: "Junior Suite",
          description: "Comfortable suite with partial mountain views and modern amenities",
          price: 22000,
          capacity: 2,
          imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
          virtualTourUrl: "https://example.com/virtual-tour/junior",
          amenities: ["Queen Bed", "Work Desk", "Lounge Chair", "Mini Bar"],
        },
        {
          name: "Premium Corner Suite",
          description: "Spacious corner suite offering dual-aspect views of Mount Kenya and the surrounding landscape",
          price: 38000,
          capacity: 3,
          imageUrl: "https://images.unsplash.com/photo-1591088398332-8a7791972843",
          virtualTourUrl: "https://example.com/virtual-tour/corner",
          amenities: ["King Bed", "Panoramic Views", "Seating Area", "Mini Bar", "Work Station"],
        },
        {
          name: "Grand Mountain Suite",
          description: "Luxurious suite with the best views of Mount Kenya, featuring a separate living area",
          price: 50000,
          capacity: 4,
          imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
          virtualTourUrl: "https://example.com/virtual-tour/grand",
          amenities: ["King Bed", "Separate Living Room", "Premium Mountain View", "Jacuzzi", "Butler Service"],
        }
      ];

      sampleRooms.forEach(room => {
        const id = this.currentIds.rooms++;
        this.rooms.set(id, { ...room, id, isBooked: false });
      });
  }

  async getRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoom(id: number): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async updateRoomBookingStatus(id: number, isBooked: boolean): Promise<void> {
    const room = this.rooms.get(id);
    if (room) {
      this.rooms.set(id, { ...room, isBooked });
    }
  }

  async checkRoomAvailability(roomId: number, checkIn: Date, checkOut: Date): Promise<boolean> {
    const bookings = await this.getBookingsByRoom(roomId);
    return !bookings.some(booking => {
      const bookingStart = new Date(booking.checkIn);
      const bookingEnd = new Date(booking.checkOut);
      return (
        (checkIn >= bookingStart && checkIn < bookingEnd) ||
        (checkOut > bookingStart && checkOut <= bookingEnd) ||
        (checkIn <= bookingStart && checkOut >= bookingEnd)
      );
    });
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.currentIds.bookings++;
    const newBooking = { ...booking, id };
    this.bookings.set(id, newBooking);
    await this.updateRoomBookingStatus(booking.roomId, true);
    return newBooking;
  }

  async getBookingsByRoom(roomId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.roomId === roomId
    );
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentIds.contacts++;
    const newContact = { ...contact, id };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async addToCart(cartItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentIds.cartItems++;
    const newCartItem = { ...cartItem, id };
    this.cartItems.set(id, newCartItem);
    return newCartItem;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }
}

export const storage = new MemStorage();