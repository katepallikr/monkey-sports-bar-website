import { useState, useEffect } from "react";
import { STATIC_SPECIALS } from "@/pages/Specials";
import { motion, AnimatePresence } from "framer-motion";
import { Beer, PartyPopper, Utensils, Mic } from "lucide-react";

export default function HomeSpecialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % STATIC_SPECIALS.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const special = STATIC_SPECIALS[currentIndex];

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('karaoke') || t.includes('mic') || t.includes('dj')) return <Mic className="w-8 h-8 md:w-10 md:h-10" />;
    if (t.includes('drink') || t.includes('tequila') || t.includes('whiskey') || t.includes('happy')) return <Beer className="w-8 h-8 md:w-10 md:h-10" />;
    if (t.includes('college')) return <PartyPopper className="w-8 h-8 md:w-10 md:h-10" />;
    return <Utensils className="w-8 h-8 md:w-10 md:h-10" />;
  };

  return (
    <div className="w-full relative overflow-visible">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-wider drop-shadow-md">Current Promotions</h2>
          </div>
          
          <div className="relative min-h-[350px] md:min-h-[160px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                <div className="bg-black/80 backdrop-blur-xl rounded-xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-primary/30 border-l-[8px] border-l-primary flex flex-col md:flex-row items-center gap-8 md:gap-12 group hover:border-primary/60 transition-colors">
                   <div className="bg-primary/20 p-6 rounded-full text-primary shrink-0 transition-transform group-hover:scale-110 shadow-[0_0_20px_rgba(255,100,0,0.2)]">
                      {getIcon(special.title)}
                   </div>
                   
                   <div className="flex-1 text-center md:text-left">
                      <span className="bg-primary text-black font-black text-xs uppercase px-4 py-1.5 rounded-full tracking-widest mb-4 inline-block shadow-[0_0_10px_rgba(255,100,0,0.3)]">
                          {special.dayOfWeek}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-black uppercase text-white mb-3 tracking-wide drop-shadow-lg">{special.title}</h3>
                      <p className="text-neutral-300 text-lg leading-relaxed font-light">{special.description}</p>
                   </div>
                   
                   {special.priceDisplay && (
                      <div className="shrink-0 text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10 mt-2 md:mt-0 w-full md:w-auto">
                          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2 font-display">Special Price</span>
                          <span className="text-3xl md:text-4xl font-display font-black text-white block drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">{special.priceDisplay}</span>
                      </div>
                   )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8 md:mt-12">
            {STATIC_SPECIALS.map((_: any, idx: number) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to promotion ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
