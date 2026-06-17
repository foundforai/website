import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Redirect from "@/components/Redirect";
import AiSourceTracker from "@/components/AiSourceTracker";
import { trackEvent } from "@/lib/analytics";
import Home from "@/pages/Home";
import Scorecard from "@/pages/Scorecard";
import ScorecardResults from "@/pages/ScorecardResults";
import WhatIsAISEO from "@/pages/WhatIsAISEO";
import RetrievalLayerSEO from "@/pages/RetrievalLayerSEO";
import WhatIsFoundForAI from "@/pages/WhatIsFoundForAI";
import AEO from "@/pages/AEO";
import Audit from "@/pages/Audit";
import Services from "@/pages/Services";
import BookCall from "@/pages/BookCall";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ThankYou from "@/pages/ThankYou";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import AISearchVisibility from "@/pages/AISearchVisibility";
import Insights from "@/pages/Insights";
import Playbook from "@/pages/Playbook";
import PlaybookAccess from "@/pages/PlaybookAccess";
import PlaybookThanks from "@/pages/PlaybookThanks";
import Media from "@/pages/Media";
import MediaEpisodeSmallLake from "@/pages/MediaEpisodeSmallLake";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Refund from "@/pages/Refund";
import ToolsIndex from "@/pages/ToolsIndex";
import LlmsTxtGenerator from "@/pages/tools/LlmsTxtGenerator";
import SchemaValidator from "@/pages/tools/SchemaValidator";
import FaqPersonasDelegating from "@/pages/FaqPersonasDelegating";
import Events from "@/pages/Events";
import EventAIVisibilityWorkshopJune2026 from "@/pages/EventAIVisibilityWorkshopJune2026";
import NotFound from "@/pages/NotFound";

function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/scorecard" component={Scorecard} />
        <Route path="/scorecard/results" component={ScorecardResults} />
        <Route path="/what-is-ai-seo" component={WhatIsAISEO} />
        <Route path="/retrieval-layer-seo" component={RetrievalLayerSEO} />
        <Route path="/what-is-found-for-ai" component={WhatIsFoundForAI} />
        <Route path="/aeo" component={AEO} />
        <Route path="/audit" component={Audit} />
        <Route path="/services" component={Services} />
        <Route path="/book-call" component={BookCall} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/blog" component={BlogIndex} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/ai-search-visibility" component={AISearchVisibility} />
        <Route path="/insights" component={Insights} />
        <Route path="/playbook/access" component={PlaybookAccess} />
        <Route path="/playbook/thanks" component={PlaybookThanks} />
        <Route path="/playbook" component={Playbook} />
        <Route path="/media/small-lake-city-podcast" component={MediaEpisodeSmallLake} />
        <Route path="/media" component={Media} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/refund-policy" component={Refund} />
        <Route path="/tools" component={ToolsIndex} />
        <Route path="/tools/llms-txt-generator" component={LlmsTxtGenerator} />
        <Route path="/tools/schema-validator" component={SchemaValidator} />
        <Route path="/faq/personas/delegating-owner-operator" component={FaqPersonasDelegating} />
        <Route path="/events" component={Events} />
        <Route path="/events/ai-visibility-workshop-june-2026" component={EventAIVisibilityWorkshopJune2026} />
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

function LeadIntentTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (!target) return;
      const anchor = target.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      let linkType: 'email' | 'phone' | null = null;
      if (href.startsWith('mailto:')) linkType = 'email';
      else if (href.startsWith('tel:')) linkType = 'phone';
      if (!linkType) return;
      trackEvent('lead_intent', { link_type: linkType, link_url: href });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}

function App({ ssrPath }: { ssrPath?: string }) {
  const routerProps = ssrPath ? { ssrPath } : {};
  return (
    <Router {...routerProps}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <DeferredToaster />
          <AiSourceTracker />
          <LeadIntentTracker />
          <AppRouter />
        </TooltipProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
