import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useFeaturedItems } from "@/hooks/use-menu";
import { useSpecials } from "@/hooks/use-specials";
import { ArrowRight, Star, Calendar, MapPin } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const { data: featured } = useFeaturedItems();
  const { data: specials } = useSpecials();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Unsplash: Dark bar interior with neon lights */}
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2874&auto=format&fit=crop"
            alt="Bar Atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-display font-bold tracking-[0.2em] uppercase mb-4 text-lg md:text-xl">
              Est. 2010 • Sports & Spirits
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-black text-white uppercase tracking-tighter mb-8 leading-none">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400">
                The Jungle
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-body mb-10 leading-relaxed">
              Your neighborhood headquarters for every game, legendary wings, and ice-cold brews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <Button size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-display text-lg uppercase tracking-wider rounded-none skew-x-[-10deg]">
                  <span className="skew-x-[10deg]">View Menu</span>
                </Button>
              </Link>
              <Link href="/locations">
                <Button size="lg" variant="outline" className="h-14 px-8 border-2 border-white text-white hover:bg-white hover:text-black font-display text-lg uppercase tracking-wider bg-transparent rounded-none skew-x-[-10deg]">
                  <span className="skew-x-[10deg]">Find a Location</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-24 bg-wood-pattern relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground uppercase mb-4">
              Fan Favorites
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured?.slice(0, 3).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-xl shadow-xl overflow-hidden hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-64 overflow-hidden relative">
                  {/* Fallback image if item.imageUrl is null */}
                  <img
                    src={item.imageUrl || "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2940&auto=format&fit=crop"}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-black font-bold px-3 py-1 rounded shadow-lg uppercase text-xs tracking-wider">
                    Featured
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-display font-bold text-foreground uppercase">{item.name}</h3>
                    <span className="text-xl font-bold text-primary">${(item.price / 100).toFixed(2)}</span>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-2">{item.description}</p>
                  <Button variant="link" className="p-0 text-primary font-bold uppercase tracking-wider group-hover:underline">
                    Order Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu">
              <Button size="lg" className="bg-black hover:bg-neutral-800 text-white font-display uppercase tracking-widest px-10">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Specials Teaser */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-5xl md:text-6xl font-display font-black uppercase leading-tight">
                Something Special <br /> Every Day
              </h2>
              <p className="text-xl text-white/90 font-body leading-relaxed">
                From Wing Wednesdays to Thirsty Thursdays, we've always got a reason to celebrate. Check out our daily lineup and save big on your favorites.
              </p>
              <Link href="/specials">
                <Button size="lg" className="bg-white text-primary hover:bg-neutral-100 font-display uppercase tracking-widest px-8">
                  View All Specials
                </Button>
              </Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {specials?.slice(0, 4).map((special) => (
                <div key={special.id} className="bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-white/10 hover:bg-black/30 transition-colors">
                  <Calendar className="w-8 h-8 mb-4 text-accent" />
                  <h3 className="text-xl font-display font-bold uppercase mb-2">{special.title}</h3>
                  <p className="text-white/80 text-sm">{special.description}</p>
                  {special.dayOfWeek && (
                    <span className="inline-block mt-4 text-xs font-bold uppercase bg-white/20 px-2 py-1 rounded">
                      {special.dayOfWeek}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locations CTA */}
      <section className="py-24 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             {/* Unsplash: Sports stadium background map concept */}
             <img src="https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=2876&auto=format&fit=crop" className="w-full h-full object-cover" alt="Background" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-8">
            Find Your Local <br /> Watering Hole
          </h2>
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
            With multiple locations across the city, you're never far from the action. Find the 5 Monkeys nearest you.
          </p>
          <Link href="/locations">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-display uppercase tracking-widest px-10 h-14">
              Find a Location
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
