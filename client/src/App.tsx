import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import WhatIsAISEO from "@/pages/WhatIsAISEO";
import Audit from "@/pages/Audit";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ThankYou from "@/pages/ThankYou";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/what-is-ai-seo" component={WhatIsAISEO} />
      <Route path="/audit" component={Audit} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug" component={BlogPost} />
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
