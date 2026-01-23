import Layout from "@/components/Layout";
import { useMenu } from "@/hooks/use-menu";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Menu() {
  const { data: categories, isLoading } = useMenu();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const scrollToCategory = (slug: string) => {
    setActiveCategory(slug);
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="h-[50vh] flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-neutral-900 text-white py-20 relative overflow-hidden">
         {/* Unsplash: Burger and beer dark photography */}
         <div className="absolute inset-0 opacity-30">
             <img src="https://images.unsplash.com/photo-1541544744-378eb34d7962?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover" alt="Menu Header" />
         </div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-6xl md:text-7xl font-display font-black uppercase mb-4 tracking-tighter">Our Menu</h1>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">Bold flavors, big portions, and the best bar food in town.</p>
         </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar Navigation - Sticky */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-2">
            <h3 className="text-xl font-display font-bold uppercase mb-6 text-primary">Categories</h3>
            {categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.slug)}
                className={`w-full text-left px-4 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors text-sm ${
                  activeCategory === category.slug
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-primary"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="flex-grow space-y-16">
          {categories?.map((category) => (
            <div key={category.id} id={category.slug} className="scroll-mt-32">
              <div className="flex items-end gap-4 mb-8 border-b-2 border-primary/20 pb-4">
                <h2 className="text-4xl font-display font-bold uppercase text-foreground">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-muted-foreground pb-1">{category.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.items?.map((item) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    key={item.id}
                    className="bg-white p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow flex gap-4"
                  >
                     {item.imageUrl && (
                         <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                             <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                         </div>
                     )}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-display font-bold uppercase text-neutral-900 flex items-center gap-2">
                          {item.name}
                          {item.isNew && (
                            <span className="text-[10px] bg-accent text-black px-2 py-0.5 rounded font-bold">NEW</span>
                          )}
                        </h3>
                        <span className="text-lg font-bold text-primary whitespace-nowrap">
                          ${(item.price / 100).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-neutral-600 text-sm mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      {item.calories && (
                        <span className="text-xs text-neutral-400 font-semibold uppercase">
                          {item.calories} Cal
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
