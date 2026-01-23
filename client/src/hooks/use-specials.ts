import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useSpecials() {
  return useQuery({
    queryKey: [api.specials.list.path],
    queryFn: async () => {
      const res = await fetch(api.specials.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch specials");
      return api.specials.list.responses[200].parse(await res.json());
    },
  });
}
