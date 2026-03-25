import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function ReservationForm() {
    const [date, setDate] = useState<Date>();
    const [selectedLocation, setSelectedLocation] = useState("");
    const [partySize, setPartySize] = useState("");
    const [time, setTime] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !selectedLocation || !partySize || !time) {
            toast({
                title: "Incomplete details",
                description: "Please select all details for your reservation.",
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
                    _subject: `New Reservation Request - ${selectedLocation.toUpperCase()}`,
                    Date: format(date, "PPP"),
                    Time: time,
                    PartySize: partySize,
                    Location: selectedLocation,
                    _template: "table"
                })
            });

            if (response.ok) {
                toast({
                    title: "Reservation Received!",
                    description: "Your reservation details have been sent. We'll be in touch shortly.",
                });
                setDate(undefined);
                setSelectedLocation("");
                setPartySize("");
                setTime("");
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            toast({
                title: "Transmission Error",
                description: "There was a problem sending your request. Please call us directly.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="reservations" className="py-24 bg-secondary relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-noise opacity-5" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-primary font-display font-bold tracking-widest uppercase mb-4 text-xl">Book Your Spot</h2>
                    <h3 className="text-4xl md:text-6xl font-display font-black text-white uppercase leading-none mb-6">
                        Reserve a Table
                    </h3>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                        Secure the best seat in the house for the big game or your next night out.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-card/30 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Location Select */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" /> Location
                            </label>
                            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                <SelectTrigger className="bg-background/50 border-white/10 text-white h-12">
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="utsa">UTSA Blvd (Main)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Party Size */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
                                <Users className="w-4 h-4 text-primary" /> Party Size
                            </label>
                            <Select value={partySize} onValueChange={setPartySize}>
                                <SelectTrigger className="bg-background/50 border-white/10 text-white h-12">
                                    <SelectValue placeholder="Number of Guests" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2">2 People</SelectItem>
                                    <SelectItem value="3">3 People</SelectItem>
                                    <SelectItem value="4">4 People</SelectItem>
                                    <SelectItem value="5">5 People</SelectItem>
                                    <SelectItem value="6">6 People</SelectItem>
                                    <SelectItem value="8">8+ People</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Date Pixel */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-primary" /> Date
                            </label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-background/50 border-white/10 text-white h-12 hover:bg-white/5 hover:text-primary",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Time Select */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" /> Time
                            </label>
                            <Select value={time} onValueChange={setTime}>
                                <SelectTrigger className="bg-background/50 border-white/10 text-white h-12">
                                    <SelectValue placeholder="Select Time" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="17:00">5:00 PM</SelectItem>
                                    <SelectItem value="17:30">5:30 PM</SelectItem>
                                    <SelectItem value="18:00">6:00 PM</SelectItem>
                                    <SelectItem value="18:30">6:30 PM</SelectItem>
                                    <SelectItem value="19:00">7:00 PM</SelectItem>
                                    <SelectItem value="19:30">7:30 PM</SelectItem>
                                    <SelectItem value="20:00">8:00 PM</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 mt-4">
                            <Button size="lg" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-white font-display text-xl uppercase tracking-widest h-14">
                                {isSubmitting ? "Sending..." : "Confirm Reservation"}
                            </Button>
                            <p className="text-center text-neutral-500 text-xs mt-4">
                                Powered by MonkeyRes™ • No booking fees
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
