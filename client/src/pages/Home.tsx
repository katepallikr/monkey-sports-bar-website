import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useFeaturedItems } from "@/hooks/use-menu";
import { useSpecials } from "@/hooks/use-specials";
import { ArrowRight, Beer, Tv, Users, Star } from "lucide-react";
import { useLocation } from "wouter";
import patioHookahImg from "@assets/patio_hookah.png";
import sportsPatronsImg from "@assets/sports_patrons.png";
import { motion } from "framer-motion";
import ReservationForm from "@/components/ReservationForm";
import ReviewsSection from "@/components/ReviewsSection";
import HomeSpecialsCarousel from "@/components/HomeSpecialsCarousel";

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: featured } = useFeaturedItems();
  const { data: specials } = useSpecials();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <Layout>
      {/* Hero Section - Ticker is now in Navbar */}
      <section className="relative h-screen min-h-[900px] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2874&auto=format&fit=crop"
            alt="Bar Atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
        </div>

        <div className="container relative z-10 px-4 mt-24 md:mt-32 w-full">
          <motion.div {...fadeIn} className="space-y-6 flex flex-col items-center">
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] drop-shadow-2xl text-center">
              Welcome to <br />
              <span className="text-primary">The Jungle</span>
            </h1>

            <div className="w-full max-w-5xl mx-auto pt-4 md:pt-8 block">
              <HomeSpecialsCarousel />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 pb-12 w-full">
              <Button
                size="lg"
                className="h-16 px-12 bg-white text-black hover:bg-neutral-200 font-display text-lg uppercase tracking-widest rounded-none min-w-[200px]"
                onClick={() => document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book a Table
              </Button>
              <Button
                size="lg"
                className="h-16 px-12 bg-primary hover:bg-primary/90 text-white font-display text-lg uppercase tracking-widest rounded-none min-w-[200px]"
                onClick={() => window.open('https://order.toasttab.com/online/five-monkeys-7280-utsa-blvd-suite-101?diningOption=takeout', '_blank')}
              >
                Takeout
              </Button>
              <Button
                size="lg"
                id="delivery-btn"
                className="h-16 px-12 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-display text-lg uppercase tracking-widest rounded-none min-w-[200px]"
                onClick={() => window.open('https://order.toasttab.com/online/five-monkeys-7280-utsa-blvd-suite-101?diningOption=delivery', '_blank')}
              >
                Delivery
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alternating Sections */}

      {/* 1. Eat */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
        <div className="relative h-[500px] lg:h-auto order-1 lg:order-1 overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2938&auto=format&fit=crop"
            alt="Delicious Ribs"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
        <div className="bg-background flex flex-col justify-center p-12 lg:p-24 order-2 lg:order-2">
          <motion.div {...fadeIn}>
            <span className="text-primary font-display font-bold uppercase tracking-widest mb-4 block">Eat Like a King</span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase leading-none mb-8">
              Bold Flavors. <br /> Big Portions.
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-lg">
              Our kitchen doesn't play defense. Experience scratch-made bar classics elevated with chef-driven techniques. From our legendary wings to our massive burgers, we bring the heat.
            </p>
            <Button
              variant="link"
              className="text-white hover:text-primary text-xl font-display uppercase tracking-widest p-0 h-auto self-start"
              onClick={() => setLocation('/menu')}
            >
              View Menu <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Drink */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
        <div className="bg-white text-black flex flex-col justify-center p-12 lg:p-24 order-2 lg:order-1">
          <motion.div {...fadeIn}>
            <span className="text-orange-600 font-display font-bold uppercase tracking-widest mb-4 block">Thirst Traps</span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-black uppercase leading-none mb-8">
              Crafted <br /> To Perfection
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-10 max-w-lg">
              With over 30 beers on tap and a cocktail program that rivals downtown speakeasies, we take our drinks seriously. Try our signature Jungle Juice or keep it classic with a local brew.
            </p>
            <Button 
              variant="outline" 
              className="text-black border-black hover:bg-black hover:text-white text-lg font-display uppercase tracking-widest h-14 px-8 rounded-none"
              onClick={() => setLocation('/specials')}
            >
              See Happy Hour
            </Button>
          </motion.div>
        </div>
        <div className="relative h-[500px] lg:h-auto order-1 lg:order-2 overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=2938&auto=format&fit=crop"
            alt="Craft Cocktails"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      </section>

      {/* 3. Watch (Sports) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
        <div className="relative h-[500px] lg:h-auto order-1 lg:order-1 overflow-hidden group">
          <img
            src={sportsPatronsImg}
            alt="Sports Fan"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
        <div className="bg-neutral-900 flex flex-col justify-center p-12 lg:p-24 order-2 lg:order-2">
          <motion.div {...fadeIn}>
            <div className="flex items-center gap-4 mb-6">
              <Tv className="w-12 h-12 text-primary" />
              <span className="text-primary font-display font-bold uppercase tracking-widest">The Best Seat</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase leading-none mb-8">
              Every Game. <br /> No Compromises.
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-lg">
              Wall-to-wall 4K screens ensure you never miss a play. Whether it's Sunday football, NBA playoffs, or UFC fight night, we bring the electrical atmosphere of the stadium to your neighborhood.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-white font-display font-bold text-2xl uppercase">30+</h4>
                <span className="text-neutral-500 text-sm uppercase tracking-wider">HD Screens</span>
              </div>
              <div>
                <h4 className="text-white font-display font-bold text-2xl uppercase">All</h4>
                <span className="text-neutral-500 text-sm uppercase tracking-wider">Premium Packages</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Smoke (Hookah) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
        <div className="bg-white text-black flex flex-col justify-center p-12 lg:p-24 order-2 lg:order-1">
          <motion.div {...fadeIn}>
            <span className="text-primary font-display font-bold uppercase tracking-widest mb-4 block">Premium Shisha</span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-black uppercase leading-none mb-8">
              Breathe Easy. <br /> Smoke Smooth.
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-10 max-w-lg">
              Relax on our open-air patio with expertly crafted premium hookah. From classic mint to exotic fruit mixes, our smooth-pull smoke sessions are the perfect social centerpiece for your night out under the stars.
            </p>
            <Button
              className="bg-primary hover:bg-neutral-900 text-white text-lg font-display uppercase tracking-widest h-14 px-8 rounded-none"
              onClick={() => document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Reserve a Table
            </Button>
          </motion.div>
        </div>
        <div className="relative h-[500px] lg:h-auto order-1 lg:order-2 overflow-hidden group">
          <img
            src={patioHookahImg}
            alt="Premium Hookah Lounge"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      </section>

      {/* Featured Items (Fan Favorites) */}
      <section className="py-32 bg-[#1a2e22] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-6">
              Fan Favorites
            </h2>
            <div className="w-24 h-1 bg-primary mb-6" />
            <p className="text-white/70 max-w-2xl text-lg">
              The dishes that put us on the map.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured?.slice(0, 3).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[500px] overflow-hidden rounded-lg cursor-pointer"
              >
                <img
                  src={item.imageUrl || "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2940&auto=format&fit=crop"}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-left">
                  <span className="text-primary font-display font-bold uppercase tracking-widest text-sm mb-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    ${(item.price / 100).toFixed(2)}
                  </span>
                  <h3 className="text-3xl font-display font-black text-white uppercase mb-4 leading-none group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-white/80 line-clamp-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white hover:text-black font-display uppercase tracking-widest h-14 px-10 rounded-full"
              onClick={() => setLocation('/menu')}
            >
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section - Added above Reservations */}
      <ReviewsSection />

      {/* Reservation Section */}
      <ReservationForm />

    </Layout>
  );
}
