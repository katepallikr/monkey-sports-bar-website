import { z } from 'zod';
import { insertSubscriberSchema, categories, menuItems, locations, specials } from './schema';

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
      path: '/api/menu',
      responses: {
        200: z.array(z.custom<typeof categories.$inferSelect & { items: typeof menuItems.$inferSelect[] }>()),
      },
    },
    featured: {
      method: 'GET' as const,
      path: '/api/menu/featured',
      responses: {
        200: z.array(z.custom<typeof menuItems.$inferSelect>()),
      },
    }
  },
  locations: {
    list: {
      method: 'GET' as const,
      path: '/api/locations',
      responses: {
        200: z.array(z.custom<typeof locations.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/locations/:id',
      responses: {
        200: z.custom<typeof locations.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  specials: {
    list: {
      method: 'GET' as const,
      path: '/api/specials',
      responses: {
        200: z.array(z.custom<typeof specials.$inferSelect>()),
      },
    },
  },
  subscribe: {
    create: {
      method: 'POST' as const,
      path: '/api/subscribe',
      input: insertSubscriberSchema,
      responses: {
        201: z.object({ message: z.string() }),
        400: errorSchemas.validation,
        409: z.object({ message: z.string() }), // Conflict/Duplicate
      },
    },
  },
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
