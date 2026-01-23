import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// === Menu Categories ===
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  sortOrder: integer("sort_order").default(0),
  image: text("image"), // Category hero image
});

// === Menu Items ===
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => categories.id),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(), // Stored in cents
  imageUrl: text("image_url"),
  calories: integer("calories"),
  isFeatured: boolean("is_featured").default(false),
  isNew: boolean("is_new").default(false),
  allergens: text("allergens").array(),
});

// === Locations ===
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., "Downtown", "Westside"
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  phone: text("phone").notNull(),
  hours: jsonb("hours").notNull(), // { "mon": "11am-12am", ... }
  latitude: text("latitude"),
  longitude: text("longitude"),
  imageUrl: text("image_url"),
  features: text("features").array(), // ["Patio", "Arcade", "Private Room"]
});

// === Specials / Promos ===
export const specials = pgTable("specials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  dayOfWeek: text("day_of_week"), // "Monday", "Tuesday", or null for every day
  price: integer("price"), // Optional special price
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
});

// === Newsletter ===
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===
export const categoryRelations = relations(categories, ({ many }) => ({
  items: many(menuItems),
}));

export const menuItemRelations = relations(menuItems, ({ one }) => ({
  category: one(categories, {
    fields: [menuItems.categoryId],
    references: [categories.id],
  }),
}));

// === ZOD SCHEMAS ===
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertLocationSchema = createInsertSchema(locations).omit({ id: true });
export const insertSpecialSchema = createInsertSchema(specials).omit({ id: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true, createdAt: true });

// === TYPES ===
export type Category = typeof categories.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type Location = typeof locations.$inferSelect;
export type Special = typeof specials.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
