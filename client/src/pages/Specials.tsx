import Layout from "@/components/Layout";
import { Beer, PartyPopper, Utensils, Mic } from "lucide-react";

// Refactored to shorten 'dayOfWeek' badges for layout consistency
export const STATIC_SPECIALS = [
    {
        id: "everyday-happy-hour",
        title: "Every Day Happy Hours",
        description: "Mon-Thu 11am-7pm | Fri-Sun 11am-4pm. Enjoy our extensive happy hour discounts every single day.",
        dayOfWeek: "EVERYDAY",
        priceDisplay: null
    },
    {
        id: "moody-mondays",
        title: "Monkey's Moody Mondays",
        description: "Start the week strong! Get doubles for less all night long.",
        dayOfWeek: "MONDAY",
        priceDisplay: null
    },
    {
        id: "tequila-tuesdays",
        title: "Tequila Tuesdays",
        description: "Keep the spirits high with Tequila shots and drinks on special.",
        dayOfWeek: "TUESDAY",
        priceDisplay: "As low as $4"
    },
    {
        id: "whiskey-wings-wednesday",
        title: "Whiskey & Wings Wednesday",
        description: "Get double pours and enjoy our delicious wings. Have fun with Karaoke all night!",
        dayOfWeek: "WEDNESDAY",
        priceDisplay: "Dbls from $6"
    },
    {
        id: "open-mic-thursday",
        title: "Open Mic Thursdays",
        description: "Take the stage or enjoy the local talent over cold drinks.",
        dayOfWeek: "THURSDAY",
        priceDisplay: null
    },
    {
        id: "weekend-nights",
        title: "Live DJ & Band Nights",
        description: "The weekends heat up with incredible live bands and top-tier DJs.",
        dayOfWeek: "FRI & SAT",
        priceDisplay: null
    },
    {
        id: "lunch-specials",
        title: "Lunch Specials",
        description: "Delicious lunch offerings to get you through the workday.",
        dayOfWeek: "DAILY",
        priceDisplay: "From $10.99"
    },
    {
        id: "college-nights",
        title: "College Nights",
        description: "Show your student ID for massive discounts and special student prices.",
        dayOfWeek: "VARIES",
        priceDisplay: null
    },
    {
        id: "free-pool",
        title: "Free Pool",
        description: "Rack 'em up! Enjoy our billiard tables for absolutely zero cost.",
        dayOfWeek: "ALL DAY",
        priceDisplay: "Free"
    },
    {
        id: "ufc-fight-nights",
        title: "UFC Fight Nights",
        description: "Catch all the action with sound and big screens.",
        dayOfWeek: "FIGHT NIGHTS",
        priceDisplay: null
    },
    {
        id: "march-madness",
        title: "March Madness",
        description: "Enjoy a free appetizer with Pitchers & Buckets all day every day.",
        dayOfWeek: "MARCH",
        priceDisplay: "Free App"
    }
];

export default function Specials() {
    const specials = STATIC_SPECIALS;

    return (
        <Layout>
            <div className="bg-primary text-white py-20 relative overflow-hidden">
                {/* Unsplash: Toasting beer glasses */}
                <div className="absolute inset-0 opacity-20 mix-blend-multiply">
                    <img src="https://images.unsplash.com/photo-1575444758702-4a6b9222336e?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Specials Background" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center mt-10">
                    <h1 className="text-6xl md:text-7xl font-display font-black uppercase mb-4 tracking-tighter">Daily Specials</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">Why pay full price? Check out what's happening this week.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specials.map(special => (
                        <div key={special.id} className="group bg-neutral-900 rounded-2xl flex flex-col h-full border border-neutral-800 hover:border-primary/50 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(235,94,40,0.15)]">
                            
                            {/* Ambient Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500 pointer-events-none"></div>

                            <div className="p-8 flex flex-col flex-grow relative z-10">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        {special.title.toLowerCase().includes('karaoke') || special.title.toLowerCase().includes('mic') || special.title.toLowerCase().includes('dj') ? (
                                            <Mic className="w-6 h-6" />
                                        ) : special.title.toLowerCase().includes('drink') || special.title.toLowerCase().includes('tequila') || special.title.toLowerCase().includes('whiskey') || special.title.toLowerCase().includes('happy') ? (
                                            <Beer className="w-6 h-6" />
                                        ) : special.title.toLowerCase().includes('college') ? (
                                            <PartyPopper className="w-6 h-6" />
                                        ) : (
                                            <Utensils className="w-6 h-6" />
                                        )}
                                    </div>
                                    <span className="bg-neutral-800 text-neutral-300 text-xs font-bold uppercase px-3 py-1.5 rounded-md tracking-widest border border-neutral-700">
                                        {special.dayOfWeek}
                                    </span>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-2xl font-display font-black uppercase mb-3 text-white leading-tight">{special.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                                        {special.description}
                                    </p>
                                </div>

                                {/* Absolute Bottom Dock for Price Alignment */}
                                <div className="mt-8 pt-6 border-t border-neutral-800">
                                    {special.priceDisplay ? (
                                        <div className="flex items-end justify-between">
                                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Special Price</span>
                                            <span className="text-3xl font-display font-black text-primary leading-none">
                                                {special.priceDisplay}
                                            </span>
                                        </div>
                                    ) : (
                                        /* Invisible spacer to maintain perfectly equal height rows */
                                        <div className="flex items-end justify-between opacity-0 pointer-events-none">
                                            <span className="text-xs font-bold uppercase tracking-widest">Spacer</span>
                                            <span className="text-3xl font-display font-black leading-none">Spacer</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
