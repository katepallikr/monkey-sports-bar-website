import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { categories, menuItems, locations, specials } from "@shared/schema";
import { registerObjectStorageRoutes } from "./replit_integrations/object_storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Register object storage routes
  registerObjectStorageRoutes(app);

  // === Menu ===
  app.get(api.menu.list.path, async (req, res) => {
    const menu = await storage.getCategories();
    res.json(menu);
  });

  app.get(api.menu.featured.path, async (req, res) => {
    const featured = await storage.getFeaturedItems();
    res.json(featured);
  });

  // === Locations ===
  app.get(api.locations.list.path, async (req, res) => {
    const locs = await storage.getLocations();
    res.json(locs);
  });

  app.get(api.locations.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const loc = await storage.getLocation(id);
    if (!loc) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(loc);
  });

  // === Specials ===
  app.get(api.specials.list.path, async (req, res) => {
    const specs = await storage.getSpecials();
    res.json(specs);
  });

  // === Subscribe ===
  app.post(api.subscribe.create.path, async (req, res) => {
    try {
      const input = api.subscribe.create.input.parse(req.body);
      const existing = await storage.getSubscriberByEmail(input.email);
      if (existing) {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      await storage.createSubscriber(input);
      res.status(201).json({ message: "Subscribed successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // === Seeding ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingCategories = await storage.getCategories();
  if (existingCategories.length > 0) return;

  console.log("Seeding database...");

  // 1. Categories
  const categoryData = [
    { name: "Monkey Fingers", slug: "monkey-fingers", sortOrder: 1, description: "Our world-famous hand-breaded chicken tenders." },
    { name: "Burgers", slug: "burgers", sortOrder: 2, description: "Fresh, never frozen, 100% beef." },
    { name: "Wings", slug: "wings", sortOrder: 3, description: "Tossed in your choice of 15 signature sauces." },
    { name: "Starters", slug: "starters", sortOrder: 0, description: "Perfect for sharing." },
    { name: "Big Red Drinks", slug: "drinks", sortOrder: 4, description: "Signature cocktails and ice cold beers." },
  ];

  const insertedCats = await db.insert(categories).values(categoryData).returning();
  
  // Map categories for easier item insertion
  const catMap = Object.fromEntries(insertedCats.map(c => [c.slug, c.id]));

  // 2. Menu Items
  const itemData = [
    // Starters
    { categoryId: catMap["starters"], name: "Mountain Melt", price: 1299, description: "A mountain of fries topped with melted cheddar, jack, and bacon.", calories: 1200, isFeatured: true, imageUrl: "https://images.unsplash.com/photo-1573080496987-aeb4d9171d55?auto=format&fit=crop&q=80" },
    { categoryId: catMap["starters"], name: "Fried Pickles", price: 899, description: "Hand-breaded dill chips served with ranch.", calories: 600, imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80" },

    // Monkey Fingers (Zingers)
    { categoryId: catMap["monkey-fingers"], name: "Original Monkey Fingers", price: 1499, description: "Hand-breaded tenders tossed in your choice of sauce.", calories: 950, isFeatured: true, imageUrl: "https://images.unsplash.com/photo-1562967960-f937f13d2892?auto=format&fit=crop&q=80" },
    { categoryId: catMap["monkey-fingers"], name: "Grilled Fingers", price: 1499, description: "Char-grilled tenders for a lighter option.", calories: 450, imageUrl: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80" },

    // Burgers
    { categoryId: catMap["burgers"], name: "The Big Monkey", price: 1599, description: "Two patties, double cheese, secret sauce.", calories: 1100, isFeatured: true, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80" },
    { categoryId: catMap["burgers"], name: "Classic Cheeseburger", price: 1299, description: "American cheese, lettuce, tomato, onion.", calories: 800, imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80" },

    // Wings
    { categoryId: catMap["wings"], name: "10 Wings", price: 1399, description: "Bone-in wings tossed in sauce.", calories: 800, imageUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80" },
    { categoryId: catMap["wings"], name: "Boneless Wings", price: 1199, description: "Crispy breaded breast chunks.", calories: 700, imageUrl: "https://images.unsplash.com/photo-1527477396000-64bc61b382d3?auto=format&fit=crop&q=80" },
    
    // Drinks
    { categoryId: catMap["drinks"], name: "Monkey Punch", price: 999, description: "Our signature rum punch.", calories: 300, isFeatured: true, imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80" },
  ];

  await db.insert(menuItems).values(itemData);

  // 3. Locations
  await db.insert(locations).values([
    {
      name: "Downtown Orlando",
      address: "123 Orange Ave",
      city: "Orlando",
      state: "FL",
      zip: "32801",
      phone: "(407) 555-0199",
      hours: { mon: "11am-2am", sun: "11am-12am" },
      features: ["Patio", "Big Screen Walls"],
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80"
    },
    {
      name: "Miami Beach",
      address: "456 Ocean Dr",
      city: "Miami",
      state: "FL",
      zip: "33139",
      phone: "(305) 555-0123",
      hours: { mon: "11am-4am", sun: "11am-2am" },
      features: ["Ocean View", "Live Music"],
      imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80"
    }
  ]);

  // 4. Specials
  await db.insert(specials).values([
    {
      title: "Kids Eat Free",
      description: "One free kids meal with every adult entree purchase.",
      dayOfWeek: "Tuesday",
      imageUrl: "https://images.unsplash.com/photo-1566024287286-457247b70310?auto=format&fit=crop&q=80"
    },
    {
      title: "Prime Rib Night",
      description: "12oz Prime Rib served with two sides for just $18.99.",
      dayOfWeek: "Thursday",
      price: 1899,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76690b67f61?auto=format&fit=crop&q=80"
    }
  ]);

  console.log("Database seeded successfully!");
}
