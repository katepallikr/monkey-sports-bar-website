import Layout from "@/components/Layout";
import { useLocations } from "@/hooks/use-locations";
import { Loader2, MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Locations() {
  const { data: locations, isLoading } = useLocations();

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
         {/* Unsplash: Map background or city lights */}
         <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2613&auto=format&fit=crop" className="w-full h-full object-cover" alt="City Background" />
         </div>
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-6xl md:text-7xl font-display font-black uppercase mb-4 tracking-tighter">Locations</h1>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">Find us in your neighborhood. Always open late.</p>
         </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations?.map((location) => {
            const hours = location.hours as Record<string, string>;

            return (
              <div key={location.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-border group hover:border-primary/50 transition-colors">
                <div className="h-48 bg-neutral-200 relative overflow-hidden">
                    {/* Placeholder map graphic or location image */}
                    {location.imageUrl ? (
                        <img src={location.imageUrl} alt={location.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                            <MapPin className="w-12 h-12 text-neutral-600" />
                        </div>
                    )}
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-display font-bold uppercase mb-4 text-neutral-900">{location.name}</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 text-neutral-600">
                        <MapPin className="w-5 h-5 mt-1 shrink-0 text-primary" />
                        <div>
                            <p className="font-bold text-neutral-900">{location.address}</p>
                            <p>{location.city}, {location.state} {location.zip}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600">
                        <Phone className="w-5 h-5 shrink-0 text-primary" />
                        <p>{location.phone}</p>
                    </div>
                    <div className="flex items-start gap-3 text-neutral-600">
                        <Clock className="w-5 h-5 mt-1 shrink-0 text-primary" />
                        <div className="text-sm">
                            <div className="flex justify-between gap-4">
                                <span className="font-bold">Mon-Thu</span>
                                <span>{hours.mon}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="font-bold">Fri-Sat</span>
                                <span>{hours.fri}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                <span className="font-bold">Sun</span>
                                <span>{hours.sun}</span>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full font-bold uppercase tracking-wider">
                        Call Now
                    </Button>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider">
                        Directions
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
