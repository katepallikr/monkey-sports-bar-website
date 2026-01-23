import {
  categories,
  menuItems,
  locations,
  specials,
  subscribers,
  type Category,
  type MenuItem,
  type Location,
  type Special,
  type Subscriber,
  type InsertSubscriber
} from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  // Menu
  getCategories(): Promise<(Category & { items: MenuItem[] })[]>;
  getFeaturedItems(): Promise<MenuItem[]>;
  
  // Locations
  getLocations(): Promise<Location[]>;
  getLocation(id: number): Promise<Location | undefined>;
  
  // Specials
  getSpecials(): Promise<Special[]>;
  
  // Subscribers
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<(Category & { items: MenuItem[] })[]> {
    const cats = await db.query.categories.findMany({
      orderBy: [asc(categories.sortOrder)],
      with: {
        items: true,
      },
    });
    return cats;
  }

  async getFeaturedItems(): Promise<MenuItem[]> {
    return await db.query.menuItems.findMany({
      where: eq(menuItems.isFeatured, true),
    });
  }

  async getLocations(): Promise<Location[]> {
    return await db.select().from(locations);
  }

  async getLocation(id: number): Promise<Location | undefined> {
    const [loc] = await db.select().from(locations).where(eq(locations.id, id));
    return loc;
  }

  async getSpecials(): Promise<Special[]> {
    return await db.select().from(specials).where(eq(specials.isActive, true));
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const [sub] = await db.insert(subscribers).values(insertSubscriber).returning();
    return sub;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [sub] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return sub;
  }
}

export const storage = new DatabaseStorage();
