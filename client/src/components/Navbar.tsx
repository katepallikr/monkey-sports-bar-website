import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logoImg from "@assets/official_logo.png";
import LiveSportsTicker from "@/components/LiveSportsTicker";

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

  const scrollToReservations = () => {
    const element = document.getElementById("reservations");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu", external: false },
    { name: "Specials", href: "/specials" },
    { name: "5M Club", href: "/club" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <nav className="fixed w-full z-[100] flex flex-col items-center">
      {/* Top Ticker Bar - Fixed height/spacing issues */}
      <div className="w-full bg-primary text-white text-xs font-bold uppercase tracking-widest py-2 z-[110] text-center shadow-md relative">
        <div className="container mx-auto px-4 flex justify-between items-center h-8">
          <span className="hidden md:inline whitespace-nowrap">📍 7280 UTSA Boulevard Ste 101, San Antonio, TX 78249</span>
          {/* Removed h-5 restriction, allowed flex-1 to take space */}
          <div className="flex-1 mx-4 overflow-hidden relative">
            <LiveSportsTicker />
          </div>
          <a href="tel:2107937596" className="hidden md:inline hover:underline whitespace-nowrap">📞 (210) 793-7596</a>
        </div>
      </div>

      <div
        className={`w-full transition-all duration-500 ${isScrolled
          ? "bg-[#1a2e22]/95 backdrop-blur-md shadow-2xl py-2 border-b border-white/5"
          : "bg-transparent py-6 bg-gradient-to-b from-black/80 to-transparent"
          }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="cursor-pointer group relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={logoImg}
                  alt="5 Monkeys Logo"
                  className={`transition-all duration-300 drop-shadow-2xl ${isScrolled ? "w-[120px]" : "w-[160px] md:w-[180px]"} max-w-full h-auto object-contain group-hover:scale-105`}
                />
              </div>
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 justify-center flex-1 mx-8">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} href={link.href}>
                  <span
                    className={`text-sm font-bold uppercase tracking-widest cursor-pointer transition-colors ${location === link.href ? "text-primary" : "text-white hover:text-primary"
                      }`}
                  >
                    {link.name}
                  </span>
                </Link>
              )
            ))}
          </div>

          {/* Right: Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 justify-end">
            <Button
              variant="ghost"
              onClick={scrollToReservations}
              className="text-white hover:text-primary font-bold uppercase tracking-widest text-xs hover:bg-transparent"
            >
              Reservations
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size={isScrolled ? "sm" : "lg"}
                  className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs px-8 shadow-[0_0_15px_rgba(241,90,36,0.3)] hover:shadow-[0_0_25px_rgba(241,90,36,0.5)] transition-all"
                >
                  Order Online
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#1a2e22] border-white/10 text-white z-[120]">
                <DropdownMenuItem
                  className="font-bold uppercase tracking-wide cursor-pointer hover:bg-white/10 focus:bg-white/10"
                  onClick={() => window.open('https://order.toasttab.com/online/five-monkeys-7280-utsa-blvd-suite-101?diningOption=takeout', '_blank')}
                >
                  Takeout / Pickup
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="font-bold uppercase tracking-wide cursor-pointer hover:bg-white/10 focus:bg-white/10"
                  onClick={() => window.open('https://order.toasttab.com/online/five-monkeys-7280-utsa-blvd-suite-101?diningOption=delivery', '_blank')}
                >
                  Delivery
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Nav Trigger */}
          <div className="lg:hidden flex justify-end">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0f0d] border-l-white/10 text-white w-full sm:w-[350px] p-0 z-[120]">
                <div className="p-8 flex flex-col h-full bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2787&auto=format&fit=crop')] bg-cover bg-center relative">
                  <div className="absolute inset-0 bg-black/90" />
                  <div className="relative z-10 flex flex-col gap-6 mt-10">
                    <div className="flex justify-center mb-8">
                      <img src={logoImg} alt="Logo" className="h-32 w-auto drop-shadow-glow" />
                    </div>

                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-3xl font-display font-bold uppercase cursor-pointer hover:text-primary transition-colors text-white text-center block"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link href={link.href}>
                            <span
                              className={`text-3xl font-display font-bold uppercase cursor-pointer hover:text-primary transition-colors text-center block ${location === link.href ? "text-primary" : "text-white"
                                }`}
                            >
                              {link.name}
                            </span>
                          </Link>
                        )}
                      </SheetClose>
                    ))}

                    <div className="mt-8 space-y-4">
                      <SheetClose asChild>
                        <Button
                          className="bg-primary hover:bg-primary/90 text-white w-full uppercase font-bold py-6 text-xl shadow-lg shadow-primary/20"
                          onClick={() => window.open('https://order.toasttab.com/online/five-monkeys-7280-utsa-blvd-suite-101?diningOption=takeout', '_blank')}
                        >
                          Order Takeout
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-white w-full uppercase font-bold py-6 text-xl"
                          onClick={() => window.open('https://order.toasttab.com/online/five-monkeys-7280-utsa-blvd-suite-101?diningOption=delivery', '_blank')}
                        >
                          Order Delivery
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white hover:text-black w-full uppercase font-bold py-6 text-xl bg-transparent"
                          onClick={scrollToReservations}
                        >
                          Reservations
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
