import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-100">
      <Card className="w-full max-w-md mx-4 shadow-xl border-none">
        <CardContent className="pt-6 pb-8 px-8 text-center">
          <div className="mb-6 flex justify-center">
            <AlertCircle className="h-20 w-20 text-primary" />
          </div>
          
          <h1 className="text-4xl font-display font-black uppercase text-neutral-900 mb-2">
            404
          </h1>
          <h2 className="text-xl font-bold text-neutral-700 mb-4">
            Foul Ball!
          </h2>
          <p className="text-neutral-500 mb-8">
            The page you're looking for seems to have gone out of bounds. Let's get you back in the game.
          </p>

          <Link href="/">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest h-12">
              Return Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
