import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useMenu() {
  return useQuery({
    queryKey: [api.menu.list.path],
    queryFn: async () => {
      const res = await fetch(api.menu.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch menu");
      return api.menu.list.responses[200].parse(await res.json());
    },
  });
}

export function useFeaturedItems() {
  return useQuery({
    queryKey: [api.menu.featured.path],
    queryFn: async () => {
      const res = await fetch(api.menu.featured.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch featured items");
      return api.menu.featured.responses[200].parse(await res.json());
    },
  });
}
