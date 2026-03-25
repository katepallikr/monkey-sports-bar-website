import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const GOOGLE_REVIEWS = [
    { name: "John D.", text: "Best sports bar in SA! The wings are huge and the atmosphere is electric during Cowboys games.", date: "1 month ago" },
    { name: "Maria S.", text: "Love the new menu updates. The Jungle Juice is a must-try! Great service every time.", date: "2 weeks ago" },
    { name: "Alex R.", text: "Incredible setup for watching UFC. Screens everywhere and the sound is perfect. 5 stars!", date: "3 weeks ago" },
    { name: "Chris P.", text: "My go-to spot for happy hour. The bartenders are friendly and the beer selection is top notch.", date: "1 month ago" },
    { name: "Jessica L.", text: "Found this place on a whim and so glad I did. The burgers are massive and delicious.", date: "2 days ago" },
    { name: "David M.", text: "Great vibes, cold beer, and awesome food. What more could you ask for?", date: "4 days ago" },
    { name: "Sarah K.", text: "The patio is lovely and the inside is hype. Definitely recommend the Monkey Platter.", date: "1 week ago" },
    { name: "Robert T.", text: "Top tier service. Even when it's packed, they take great care of you.", date: "3 weeks ago" },
    { name: "Emily W.", text: "Clean, fun, and affordable. A great place to hang out with friends.", date: "1 month ago" },
    { name: "Michael B.", text: "Best viewing experience for the Spurs game. The energy here is contagious!", date: "2 months ago" },
];

export default function ReviewsSection() {
    const [reviews, setReviews] = useState<typeof GOOGLE_REVIEWS>([]);

    useEffect(() => {
        // Randomly select 3 reviews on client mount to avoid hydration mismatch
        const shuffled = [...GOOGLE_REVIEWS].sort(() => 0.5 - Math.random());
        setReviews(shuffled.slice(0, 3));
    }, []);

    // Initial render placeholder (or empty) to match SSR
    if (reviews.length === 0) return null;

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                            ))}
                        </div>
                        <span className="text-neutral-300 text-sm font-semibold">4.9/5 Average Rating</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight">
                        Word on the <span className="text-primary">Street</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-card/50 backdrop-blur-md p-8 rounded-2xl border border-white/5 relative group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                        >
                            <Quote className="absolute top-8 right-8 w-10 h-10 text-white/5 group-hover:text-primary/20 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-5 h-5 text-orange-400 fill-orange-400" />
                                ))}
                            </div>

                            <p className="text-neutral-300 text-lg leading-relaxed mb-6 relative z-10 h-24 overflow-hidden">
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-700 flex items-center justify-center text-white font-bold font-display text-lg">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white uppercase tracking-wide text-sm">{review.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png" alt="Google" className="w-4 h-4 opacity-70" />
                                        <span className="text-xs text-neutral-500 font-medium">Google Review</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
