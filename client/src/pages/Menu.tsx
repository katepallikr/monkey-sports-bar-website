import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import logoImg from "@assets/official_logo.png";

interface MenuItem {
    id: number;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
}

interface MenuCategory {
    id: number;
    name: string;
    items: MenuItem[];
}

export default function Menu() {
    const [categories, setCategories] = useState<MenuCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/data/menu.json?v=${Date.now()}`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to load menu", err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <Layout>
                <div className="h-screen flex items-center justify-center bg-background">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-primary text-white pt-48 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 mix-blend-multiply">
                    <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Menu Background" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center mt-10">
                    <h1 className="text-6xl md:text-7xl font-display font-black uppercase mb-4 tracking-tighter">Our Menu</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">Bold flavors. Fresh ingredients. Unforgettable game days.</p>
                    
                    <Button 
                        size="lg" 
                        onClick={() => window.open('https://order.toasttab.com/online/five-monkeys-7280-utsa-blvd-suite-101?diningOption=takeout', '_blank')}
                        className="bg-white text-primary hover:bg-neutral-100 font-bold uppercase tracking-widest px-8 shadow-xl border-none cursor-pointer"
                    >
                        Order Online Now <ExternalLink className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20 min-h-[50vh]">
                {categories.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-neutral-500 font-bold">Menu is currently updating. Please check back soon!</p>
                    </div>
                )}
                
                {categories.map((category) => (
                    <div key={category.name} className="mb-20 last:mb-0">
                        {/* Category Header */}
                        <div className="flex items-center gap-6 mb-12">
                            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white shrink-0">
                                {category.name}
                            </h2>
                            <div className="h-1 w-full bg-primary/20 rounded-full mt-2"></div>
                        </div>

                        {/* Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {category.items.map(item => (
                                <div key={item.id} className="group bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col sm:flex-row overflow-hidden">
                                    
                                    {/* Image Logic */}
                                    <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-neutral-100 flex items-center justify-center shrink-0">
                                        {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-[#1a2e22] flex items-center justify-center p-8">
                                                 <img src={logoImg} className="w-full h-auto opacity-30 drop-shadow-2xl object-contain" alt="Placeholder" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Logic */}
                                    <div className="sm:w-3/5 p-6 flex flex-col justify-start">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-2xl font-display font-bold uppercase text-neutral-900 leading-none mr-2">{item.name}</h3>
                                            <span className="text-xl font-display font-black text-primary shrink-0">${(item.price / 100).toFixed(2)}</span>
                                        </div>
                                        {item.description && (
                                            <p className="text-neutral-500 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
