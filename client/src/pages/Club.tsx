import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscribe } from "@/hooks/use-subscribe";
import { insertSubscriberSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Mail, Gift, Tag, CheckCircle } from "lucide-react";

type SubscribeForm = z.infer<typeof insertSubscriberSchema>;

export default function Club() {
  const subscribe = useSubscribe();
  const form = useForm<SubscribeForm>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: SubscribeForm) => {
    subscribe.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center relative overflow-hidden bg-neutral-900 pt-56 md:pt-64 pb-20">
        {/* Background Graphic */}
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-neutral-900 to-neutral-900"></div>
           {/* Unsplash: Cheering crowd */}
           <img src="https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2940&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-overlay" alt="Crowd" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Content */}
            <div className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
                
                <div>
                    <h1 className="text-4xl md:text-5xl font-display font-black uppercase mb-6 leading-none">Join The <br/> 5M Club</h1>
                    <p className="text-lg text-white/90 font-medium mb-8">Become a VIP and never miss out on the action.</p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-2 rounded-full"><Gift className="w-5 h-5" /></div>
                        <span className="font-bold">Free appetizer on your birthday</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-2 rounded-full"><Tag className="w-5 h-5" /></div>
                        <span className="font-bold">Exclusive member-only discounts</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-2 rounded-full"><CheckCircle className="w-5 h-5" /></div>
                        <span className="font-bold">First dibs on event tickets</span>
                    </div>
                </div>
            </div>

            {/* Right Form */}
            <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white">
                <div className="text-center mb-8">
                    <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-display font-bold uppercase text-neutral-900">Sign Up Now</h2>
                    <p className="text-neutral-500">It's free and takes 10 seconds.</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-neutral-700 uppercase tracking-wide">Email Address</label>
                        <Input 
                            {...form.register("email")}
                            placeholder="you@example.com" 
                            className="h-12 border-neutral-300 focus:border-primary focus:ring-primary"
                        />
                        {form.formState.errors.email && (
                            <p className="text-red-500 text-xs font-bold">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                    <Button 
                        type="submit" 
                        disabled={subscribe.isPending}
                        className="w-full h-12 bg-black hover:bg-neutral-800 text-white font-display uppercase tracking-widest text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        {subscribe.isPending ? "Joining..." : "Join the Club"}
                    </Button>
                </form>
                
                <p className="text-xs text-neutral-400 text-center mt-6">
                    By joining, you agree to receive marketing emails. Unsubscribe at any time.
                </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
