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
        name: "Presidential Suite",
        description: "Luxurious suite with panoramic mountain views",
        price: 45000,
        capacity: 4,
        imageUrl: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
        virtualTourUrl: "https://example.com/virtual-tour/presidential",
        amenities: ["King Bed", "Private Balcony", "Jacuzzi", "Mini Bar", "Butler Service"],
      },
      {
        name: "Safari Lodge",
        description: "Authentic African safari experience with modern comforts",
        price: 35000,
        capacity: 3,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        virtualTourUrl: "https://example.com/virtual-tour/safari",
        amenities: ["Queen Bed", "Private Terrace", "Game Viewing Deck", "Mini Bar"],
      },
      {
        name: "Ocean View Bungalow",
        description: "Relaxing bungalow with stunning ocean views",
        price: 28000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1574168513608-0739c7446b76",
        virtualTourUrl: "https://example.com/virtual-tour/bungalow",
        amenities: ["King Bed", "Private Patio", "Ocean View", "Mini Bar"],
      },
      {
        name: "Mountain Cabin",
        description: "Cozy cabin nestled in the mountains",
        price: 22000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1516156000-b1a0c512a66a",
        virtualTourUrl: "https://example.com/virtual-tour/cabin",
        amenities: ["Queen Bed", "Fireplace", "Mountain View", "Hot Tub"],
      },
      {
        name: "City Penthouse",
        description: "Modern penthouse with city views",
        price: 38000,
        capacity: 3,
        imageUrl: "https://images.unsplash.com/photo-1551882547-fe40087e6547",
        virtualTourUrl: "https://example.com/virtual-tour/penthouse",
        amenities: ["King Bed", "Large Windows", "City View", "Rooftop Access"],
      },
      {
        name: "Beachfront Villa",
        description: "Luxury villa with private beach access",
        price: 50000,
        capacity: 4,
        imageUrl: "https://images.unsplash.com/photo-1566828396-8e589207387f",
        virtualTourUrl: "https://example.com/virtual-tour/villa",
        amenities: ["King Bed", "Private Pool", "Beach Access", "Mini Bar"],
      },
      {
        name: "Desert Oasis",
        description: "Relaxing retreat in the desert",
        price: 25000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1534305897983-749229772706",
        virtualTourUrl: "https://example.com/virtual-tour/oasis",
        amenities: ["Queen Bed", "Private Patio", "Desert View", "Hot Tub"],
      },
      {
        name: "Forest Retreat",
        description: "Secluded retreat in the forest",
        price: 20000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1521400921-70b5a198137e",
        virtualTourUrl: "https://example.com/virtual-tour/retreat",
        amenities: ["Queen Bed", "Fireplace", "Forest View", "Hot Tub"],
      },
      {
        name: "Lakefront Cabin",
        description: "Cozy cabin with lake views",
        price: 23000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1525113264459-0977c2780767",
        virtualTourUrl: "https://example.com/virtual-tour/lakefront",
        amenities: ["Queen Bed", "Fireplace", "Lake View", "Private Dock"],
      },
      {
        name: "Historic Inn",
        description: "Charming historic inn with period details",
        price: 30000,
        capacity: 3,
        imageUrl: "https://images.unsplash.com/photo-1547303987-80650264391f",
        virtualTourUrl: "https://example.com/virtual-tour/inn",
        amenities: ["Queen Bed", "Antique Furniture", "Historic Charm"],
      },
      {
        name: "Luxury Yacht",
        description: "Relaxing stay on a luxury yacht",
        price: 60000,
        capacity: 4,
        imageUrl: "https://images.unsplash.com/photo-1527753570451-5e13240297a4",
        virtualTourUrl: "https://example.com/virtual-tour/yacht",
        amenities: ["King Bed", "Private Deck", "Ocean View", "Mini Bar"],
      },
      {
        name: "Farmhouse Stay",
        description: "Relaxing stay at a farmhouse",
        price: 18000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        virtualTourUrl: "https://example.com/virtual-tour/farmhouse",
        amenities: ["Queen Bed", "Fireplace", "Farm View"],
      },
      {
        name: "Castle Suite",
        description: "Unique stay at a castle suite",
        price: 40000,
        capacity: 3,
        imageUrl: "https://images.unsplash.com/photo-1502672282876-a9c73c61a5e1",
        virtualTourUrl: "https://example.com/virtual-tour/castle",
        amenities: ["Queen Bed", "Antique Furniture", "Castle View"],
      },
      {
        name: "Treehouse Lodge",
        description: "Unique stay at a treehouse lodge",
        price: 25000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1508030958-5d33b1a2a835",
        virtualTourUrl: "https://example.com/virtual-tour/treehouse",
        amenities: ["Queen Bed", "Forest View", "Private Deck"],
      },
      {
        name: "Igloo Village",
        description: "Unique stay at an igloo village",
        price: 30000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1517171315171-1c2054813c69",
        virtualTourUrl: "https://example.com/virtual-tour/igloo",
        amenities: ["Queen Bed", "Northern Lights View"],
      },
      {
        name: "Cave Hotel",
        description: "Unique stay at a cave hotel",
        price: 28000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1530973355773-26949c168c56",
        virtualTourUrl: "https://example.com/virtual-tour/cave",
        amenities: ["Queen Bed", "Unique Cave Experience"],
      },
      {
        name: "Yurt Camp",
        description: "Unique stay at a yurt camp",
        price: 22000,
        capacity: 2,
        imageUrl: "https://images.unsplash.com/photo-1511362830387-7568684b26e5",
        virtualTourUrl: "https://example.com/virtual-tour/yurt",
        amenities: ["Queen Bed", "Nature View"],
      },
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