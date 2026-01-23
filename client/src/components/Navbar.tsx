import { Link, useLocation } from "wouter";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Specials", href: "/specials" },
    { name: "Locations", href: "/locations" },
    { name: "5M Club", href: "/club" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-sm shadow-md py-2 border-b border-primary/20"
          : "bg-transparent py-4 bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-primary p-2 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-white tracking-widest uppercase">
              5<span className="text-primary">Monkeys</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <span
                className={`text-sm font-bold uppercase tracking-wider cursor-pointer hover:text-primary transition-colors ${
                  location === link.href ? "text-primary border-b-2 border-primary" : "text-white"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all"
            onClick={() => window.open('https://order.toasttab.com', '_blank')}
          >
            Order Online
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-neutral-900 border-l-neutral-800 text-white w-full sm:w-[300px]">
              <div className="flex flex-col gap-8 mt-10">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <span
                      className={`text-2xl font-display font-bold uppercase cursor-pointer hover:text-primary transition-colors ${
                        location === link.href ? "text-primary" : "text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
                <Button className="bg-primary hover:bg-primary/90 text-white w-full uppercase font-bold py-6 text-lg">
                  Order Online
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
