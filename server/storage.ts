import { 
  type Room, type Booking, type Contact,
  type InsertRoom, type InsertBooking, type InsertContact 
} from "@shared/schema";

export interface IStorage {
  // Rooms
  getRooms(): Promise<Room[]>;
  getRoom(id: number): Promise<Room | undefined>;
  
  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByRoom(roomId: number): Promise<Booking[]>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private rooms: Map<number, Room>;
  private bookings: Map<number, Booking>;
  private contacts: Map<number, Contact>;
  private currentIds: { rooms: number; bookings: number; contacts: number };

  constructor() {
    this.rooms = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.currentIds = { rooms: 1, bookings: 1, contacts: 1 };
    
    // Add sample rooms
    const sampleRooms: InsertRoom[] = [
      {
        name: "Deluxe Suite",
        description: "Spacious suite with mountain views",
        price: 25000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
        amenities: ["King Bed", "Balcony", "Mini Bar"],
      },
      // Add more sample rooms...
    ];

    sampleRooms.forEach(room => {
      const id = this.currentIds.rooms++;
      this.rooms.set(id, { ...room, id });
    });
  }

  async getRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoom(id: number): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.currentIds.bookings++;
    const newBooking = { ...booking, id };
    this.bookings.set(id, newBooking);
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
}

export const storage = new MemStorage();
