import { z } from "zod";

// ---- Core Schemas (Static JSON; no database) ----

export const menuItemSchema = z.object({
  id: z.number(),
  categoryId: z.number().nullable().optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  price: z.number(), // cents
  imageUrl: z.string().nullable().optional(),
  calories: z.number().nullable().optional(),
  isFeatured: z.boolean().nullable().optional(),
  isNew: z.boolean().nullable().optional(),
  allergens: z.array(z.string()).nullable().optional(),
});

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  sortOrder: z.number().nullable().optional(),
  image: z.string().nullable().optional(),
  items: z.array(menuItemSchema).nullable().optional(),
});

export const locationSchema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  phone: z.string(),
  hours: z.record(z.string()),
  latitude: z.string().nullable().optional(),
  longitude: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  features: z.array(z.string()).nullable().optional(),
});

export const specialSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  dayOfWeek: z.string().nullable().optional(),
  price: z.number().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean().nullable().optional(),
});

// ---- Forms ----

export const insertSubscriberSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

// ---- Types ----

export type Category = z.infer<typeof categorySchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type Location = z.infer<typeof locationSchema>;
export type Special = z.infer<typeof specialSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
