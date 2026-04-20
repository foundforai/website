import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Redirect from "@/components/Redirect";
import Home from "@/pages/Home";
import WhatIsAISEO from "@/pages/WhatIsAISEO";
import WhatIsFoundForAI from "@/pages/WhatIsFoundForAI";
import AEO from "@/pages/AEO";
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
import AISearchVisibility from "@/pages/AISearchVisibility";
import Insights from "@/pages/Insights";
import Playbook from "@/pages/Playbook";
import PlaybookThanks from "@/pages/PlaybookThanks";
import Media from "@/pages/Media";
import MediaEpisodeSmallLake from "@/pages/MediaEpisodeSmallLake";
import NotFound from "@/pages/NotFound";

function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/what-is-ai-seo" component={WhatIsAISEO} />
        <Route path="/what-is-found-for-ai" component={WhatIsFoundForAI} />
        <Route path="/aeo" component={AEO} />
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
        <Route path="/ai-search-visibility" component={AISearchVisibility} />
        <Route path="/insights" component={Insights} />
        <Route path="/playbook/thanks" component={PlaybookThanks} />
        <Route path="/playbook" component={Playbook} />
        <Route path="/media/small-lake-city-podcast" component={MediaEpisodeSmallLake} />
        <Route path="/media" component={Media} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function DeferredToaster() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Toaster />;
}

function App({ ssrPath }: { ssrPath?: string }) {
  const routerProps = ssrPath ? { ssrPath } : {};
  return (
    <Router {...routerProps}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <DeferredToaster />
          <AppRouter />
        </TooltipProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
