import Layout from "@/components/Layout";
import { useSpecials } from "@/hooks/use-specials";
import { Loader2, Beer, PartyPopper, Utensils } from "lucide-react";

export default function Specials() {
  const { data: specials, isLoading } = useSpecials();

  if (isLoading) {
    return (
      <Layout>
        <div className="h-[50vh] flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Group specials manually if needed, or just display grid
  // For this UI, we will just use a nice masonry-ish grid
  
  return (
    <Layout>
       <div className="bg-primary text-white py-20 relative overflow-hidden">
         {/* Unsplash: Toasting beer glasses */}
         <div className="absolute inset-0 opacity-20 mix-blend-multiply">
             <img src="https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Specials Background" />
         </div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-6xl md:text-7xl font-display font-black uppercase mb-4 tracking-tighter">Daily Specials</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">Why pay full price? Check out what's happening this week.</p>
         </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specials?.map(special => (
                <div key={special.id} className="group bg-white rounded-2xl p-8 shadow-xl border border-neutral-100 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-6">
                        <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            {special.title.toLowerCase().includes('drink') || special.title.toLowerCase().includes('beer') ? (
                                <Beer className="w-6 h-6" />
                            ) : special.title.toLowerCase().includes('party') ? (
                                <PartyPopper className="w-6 h-6" />
                            ) : (
                                <Utensils className="w-6 h-6" />
                            )}
                        </div>
                        {special.dayOfWeek ? (
                            <span className="bg-black text-white text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                                {special.dayOfWeek}
                            </span>
                        ) : (
                            <span className="bg-accent text-black text-xs font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                                Everyday
                            </span>
                        )}
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold uppercase mb-3 text-neutral-900">{special.title}</h3>
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                        {special.description}
                    </p>
                    
                    {special.price && (
                        <div className="pt-6 border-t border-dashed border-neutral-200 flex items-center justify-between">
                            <span className="text-sm font-bold text-neutral-400 uppercase tracking-wide">Special Price</span>
                            <span className="text-3xl font-display font-bold text-primary">
                                ${(special.price / 100).toFixed(2)}
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
