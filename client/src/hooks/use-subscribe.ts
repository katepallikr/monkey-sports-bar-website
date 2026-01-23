import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertSubscriber } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useSubscribe() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      const res = await fetch(api.subscribe.create.path, {
        method: api.subscribe.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to subscribe");
      }
      return api.subscribe.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the 5M Club!",
        description: "You've successfully subscribed to our newsletter.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
