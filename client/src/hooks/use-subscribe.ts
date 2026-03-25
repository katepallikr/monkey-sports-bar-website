import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function useSubscribe() {
  const { toast } = useToast();

  return useMutation({
    // Static hosting: there is no backend. We open an email draft so staff can add
    // the address to your mailing list (or replace with Mailchimp/Google Form later).
    mutationFn: async (data: { email: string }) => {
      const response = await fetch("https://formsubmit.co/ajax/operations@5monkeysusa.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "New 5M Club Subscriber",
          Email: data.email,
        })
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe. Please try again later.");
      }
      
      return { message: "Signup request created" };
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the 5M Club!",
        description: "You're officially on the list! Keep an eye on your inbox.",
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
