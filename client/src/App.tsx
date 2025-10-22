import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import WhatIsAISEO from "@/pages/WhatIsAISEO";
import WhatIsFoundForAI from "@/pages/WhatIsFoundForAI";
import Audit from "@/pages/Audit";
import Services from "@/pages/Services";
import Pricing from "@/pages/Pricing";
import BookCall from "@/pages/BookCall";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ThankYou from "@/pages/ThankYou";
import PurchaseConfirmation from "@/pages/PurchaseConfirmation";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import NotFound from "@/pages/NotFound";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/what-is-ai-seo" component={WhatIsAISEO} />
        <Route path="/what-is-found-for-ai" component={WhatIsFoundForAI} />
        <Route path="/audit" component={Audit} />
        <Route path="/services" component={Services} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/book-call" component={BookCall} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/purchase-complete" component={PurchaseConfirmation} />
        <Route path="/blog" component={BlogIndex} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route component={NotFound} />
      </Switch>
    </>
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
