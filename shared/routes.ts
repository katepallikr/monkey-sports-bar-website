import { z } from 'zod';
import { categorySchema, menuItemSchema, locationSchema, specialSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  menu: {
    list: {
      method: 'GET' as const,
      // Static JSON (S3-friendly)
      path: '/data/menu.json',
      responses: {
        200: z.array(categorySchema),
      },
    },
    featured: {
      method: 'GET' as const,
      path: '/data/featured.json',
      responses: {
        200: z.array(menuItemSchema),
      },
    }
  },
  locations: {
    list: {
      method: 'GET' as const,
      path: '/data/locations.json',
      responses: {
        200: z.array(locationSchema),
      },
    },
    // For static hosting, fetch all locations and filter client-side.
  },
  specials: {
    list: {
      method: 'GET' as const,
      path: '/data/specials.json',
      responses: {
        200: z.array(specialSchema),
      },
    },
  },
  // subscribe endpoint removed for static hosting
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
