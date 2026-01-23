import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Locations from "@/pages/Locations";
import Specials from "@/pages/Specials";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import Club from "@/pages/Club";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/locations" component={Locations} />
      <Route path="/specials" component={Specials} />
      <Route path="/about" component={About} />
      <Route path="/careers" component={Careers} />
      <Route path="/club" component={Club} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
