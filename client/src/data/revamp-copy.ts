export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: 'Will AI book appointments by itself?',
    a: 'No. The assistant sends a request, the person confirms it, and your team schedules the way you do now.',
  },
  {
    q: 'Do I need a new website?',
    a: 'No. We add a small layer to the site you already have.',
  },
  {
    q: 'Can you guarantee AI will recommend me?',
    a: 'No one honestly can. What we can do is make sure that when an assistant tries to reach you, it gets through.',
  },
  {
    q: "What's the tech behind this?",
    a: 'A new web standard called WebMCP, plus MCP for assistants that connect to your business directly. Support is early and growing fast, which is why monitoring is part of the plan.',
  },
  {
    q: 'Is patient information safe?',
    a: 'Our actions collect only contact details and a short note. No health history, insurance, or payment details.',
  },
  {
    q: 'What happened to AI visibility?',
    a: "It's still here. It's how assistants find you in the first place, and it's included in Monitoring.",
  },
];

export const BUSINESS_TYPES = [
  { value: 'dental', label: 'Dental / Orthodontics' },
  { value: 'med-spa', label: 'Med spa' },
  { value: 'home-services', label: 'Home services' },
  { value: 'law-firm', label: 'Law firm' },
  { value: 'other', label: 'Other' },
] as const;

export const AUDIT_ACTIONS = [
  { value: 'consult', label: 'Request a consult or appointment' },
  { value: 'quote', label: 'Request a quote' },
  { value: 'question', label: 'Ask a question' },
  { value: 'other', label: 'Other' },
] as const;

export const RESOURCE_LINKS = [
  { href: '/playbook', label: 'Playbook' },
  { href: '/tools', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/aeo', label: 'What is AEO' },
  { href: '/what-is-ai-seo', label: 'What is AI SEO' },
  { href: '/retrieval-layer-seo', label: 'Retrieval-Layer SEO' },
  { href: '/agentic-web-assessment', label: '3-minute self check' },
] as const;

export const PROOF_BODY =
  "On October 27, 2026, an AI assistant sent a real consult request through a Salt Lake orthodontist's website from start to finish, and the request was routed to the practice.";

export const PROOF_WARNING =
  "What the test also caught: the assistant's approval prompt flashed on screen and disappeared before the person could confirm. That's the kind of thing our audit finds before your patients run into it.";
