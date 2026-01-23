import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function Careers() {
  return (
    <Layout>
       <div className="bg-neutral-900 text-white py-20">
         <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-display font-black uppercase mb-6">Join the Team</h1>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">Work hard, play hard. We're always looking for energetic people to join the Jungle crew.</p>
         </div>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
                <h2 className="text-3xl font-display font-bold uppercase mb-6 text-primary">Why Work Here?</h2>
                <ul className="space-y-4">
                    {["Flexible Schedules", "Competitive Pay + Tips", "Meal Discounts", "Fun, High-Energy Atmosphere", "Career Growth Opportunities"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-lg font-bold text-neutral-700">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-neutral-100 p-8 rounded-xl border border-neutral-200">
                 <h3 className="text-2xl font-display font-bold uppercase mb-6">Current Openings</h3>
                 <div className="space-y-4">
                    {["Line Cook", "Bartender", "Server", "Host/Hostess"].map((role) => (
                        <div key={role} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                            <span className="font-bold text-lg">{role}</span>
                            <Button size="sm" variant="outline" className="uppercase font-bold text-xs">Apply</Button>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
        
        <div className="text-center">
            <p className="text-neutral-500 mb-6">Don't see your role? Send us your resume anyway.</p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-display uppercase tracking-widest px-12 h-16 text-lg">
                Apply Now
            </Button>
        </div>
      </div>
    </Layout>
  );
}
