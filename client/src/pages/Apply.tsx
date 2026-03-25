import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Clock, Briefcase } from "lucide-react";

export default function Apply() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [availability, setAvailability] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pos = params.get("position");
        if (pos === "Bartender" || pos === "Server") {
            setPosition(pos);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || !email || !phone || !position || !availability) {
            toast({
                title: "Incomplete details",
                description: "Please fill out all fields to submit your application.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("https://formsubmit.co/ajax/operations@5monkeysusa.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Job Application - ${position}`,
                    Name: name,
                    Email: email,
                    Phone: phone,
                    Position: position,
                    Availability: availability,
                })
            });

            if (response.ok) {
                toast({
                    title: "Application Received!",
                    description: "Your application has been sent. We'll be in touch if there's a good fit.",
                });
                setName("");
                setEmail("");
                setPhone("");
                setPosition("");
                setAvailability("");
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            toast({
                title: "Transmission Error",
                description: "There was a problem sending your application. Please try again later.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <div className="bg-neutral-900 text-white pt-56 md:pt-64 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Bar Background" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-display font-black uppercase mb-4 tracking-tighter">Join the Jungle</h1>
                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto">Fill out the form below to apply for a position on our team.</p>
                </div>
            </div>

            <section className="py-24 bg-background relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-card border border-neutral-200 dark:border-white/10 p-8 md:p-12 rounded-2xl shadow-xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Name & Email Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                                        <User className="w-4 h-4 text-primary" /> Full Name
                                    </label>
                                    <Input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-12 bg-black/40 border-white/20 text-white placeholder:text-neutral-500 font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary" /> Email
                                    </label>
                                    <Input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-12 bg-black/40 border-white/20 text-white placeholder:text-neutral-500 font-bold"
                                    />
                                </div>
                            </div>

                            {/* Phone & Position Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-primary" /> Phone Number
                                    </label>
                                    <Input 
                                        type="tel" 
                                        placeholder="(210) 555-0123" 
                                        value={phone} 
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-12 bg-black/40 border-white/20 text-white placeholder:text-neutral-500 font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-primary" /> Desired Position
                                    </label>
                                    <Select value={position} onValueChange={setPosition}>
                                        <SelectTrigger className="h-12 bg-black/40 border-white/20 text-white font-bold">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Bartender">Bartender</SelectItem>
                                            <SelectItem value="Server">Server</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Availability Textarea */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" /> Availability
                                </label>
                                <Textarea 
                                    placeholder="e.g., Available nights and weekends, Monday through Friday after 4 PM..." 
                                    value={availability} 
                                    onChange={(e) => setAvailability(e.target.value)}
                                    className="min-h-[120px] bg-black/40 border-white/20 text-white placeholder:text-neutral-500 font-bold resize-y"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-display text-xl uppercase tracking-widest h-14"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Application"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
