import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Careers() {
  return (
    <Layout>
       <div className="bg-neutral-900 text-white pt-56 md:pt-64 pb-20 relative overflow-hidden">
         <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase mb-6 tracking-tighter drop-shadow-lg">Join the Team</h1>
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
                    {["Bartender", "Server"].map((role) => (
                        <div key={role} className="flex justify-between items-center bg-white p-5 rounded-lg shadow-md border border-neutral-200">
                            <span className="font-bold text-xl text-black">{role}</span>
                            <Link href={`/apply?position=${encodeURIComponent(role)}`}>
                                <Button size="sm" className="bg-primary hover:bg-primary/80 text-white uppercase font-bold text-xs tracking-wider cursor-pointer border-none shadow-sm">Apply</Button>
                            </Link>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
        
        <div className="text-center">
            <p className="text-neutral-500 mb-6">Don't see your role? Send us your resume anyway.</p>
            <Link href="/apply">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-display uppercase tracking-widest px-12 h-16 text-lg cursor-pointer">
                    Apply Now
                </Button>
            </Link>
        </div>
      </div>
    </Layout>
  );
}
