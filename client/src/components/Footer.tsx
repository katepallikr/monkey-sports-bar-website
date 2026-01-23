import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscribe } from "@/hooks/use-subscribe";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@shared/schema";
import type { z } from "zod";

type SubscribeForm = z.infer<typeof insertSubscriberSchema>;

export default function Footer() {
  const subscribe = useSubscribe();
  const form = useForm<SubscribeForm>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: SubscribeForm) => {
    subscribe.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-10 border-t border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold text-white uppercase tracking-widest">
              5<span className="text-primary">Monkeys</span>
            </h3>
            <p className="text-neutral-400 font-body leading-relaxed">
              The ultimate destination for sports fans, foodies, and fun seekers. Legendary wings, cold beer, and every game, every time.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-neutral-800 p-2 rounded-full hover:bg-primary transition-colors duration-300 group"
                >
                  <Icon className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-bold text-white uppercase">Explore</h4>
            <ul className="space-y-4">
              {[
                { label: "Our Menu", href: "/menu" },
                { label: "Locations", href: "/locations" },
                { label: "Daily Specials", href: "/specials" },
                { label: "Careers", href: "/careers" },
                { label: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-neutral-400 hover:text-primary transition-colors cursor-pointer block">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-bold text-white uppercase">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-neutral-400">
                <MapPin className="w-5 h-5 mt-1 shrink-0 text-primary" />
                <p>123 Monkey Business Blvd,<br />Sports City, SC 29401</p>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <Mail className="w-5 h-5 shrink-0 text-primary" />
                <a href="mailto:info@5monkeys.com" className="hover:text-white">info@5monkeys.com</a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-bold text-white uppercase">Join the 5M Club</h4>
            <p className="text-neutral-400 text-sm">
              Get exclusive offers, birthday treats, and updates straight to your inbox.
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <Input
                placeholder="Enter your email"
                {...form.register("email")}
                className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Button
                type="submit"
                disabled={subscribe.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide"
              >
                {subscribe.isPending ? "Joining..." : "Subscribe Now"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} 5 Monkeys Sports Bar & Restaurant. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
