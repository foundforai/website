import aiAutomationImg from '@assets/stock_images/ai_automation_workfl_1fb79544.jpg';
import aiSearchImg from '@assets/stock_images/artificial_intellige_8c98905d.jpg';
import websiteOptimizationImg from '@assets/stock_images/website_optimization_b4ff5bda.jpg';

export interface BlogPostCustomCta {
  headline: string;
  copy: string;
  buttonText: string;
  buttonLink: string;
  footnote?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  dateModified?: string;
  author: string;
  excerpt: string;
  readTime: string;
  image: string;
  featured?: boolean;
  metaDescription?: string;
  ogDescription?: string;
  twitterDescription?: string;
  schemaDescription?: string;
  hasMentions?: boolean;
  hasArticleSchema?: boolean;
  customCta?: BlogPostCustomCta;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'mental-model-shift-ai-search',
    title: 'The Mental Model Shift Businesses Are Missing About AI Search',
    subtitle: 'Most business websites are still written for keyword matching and human browsing. AI systems don\'t browse — they interpret.',
    date: '2025-01-12',
    author: 'Dustin Crump',
    excerpt: 'Most business websites are still written for keyword matching and human browsing. AI systems don\'t browse — they interpret.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.1.0',
    featured: true,
    metaDescription: 'AI search doesn\'t work like Google. Learn why businesses built for keywords are disappearing from AI answers — and what visibility really means now.',
    ogDescription: 'AI systems don\'t browse websites — they interpret them. Here\'s why that changes how businesses get recommended.',
    twitterDescription: 'Why AI search works differently than Google — and why most businesses haven\'t adapted yet.',
    schemaDescription: 'AI search doesn\'t rank pages the way Google does. It interprets meaning, context, and clarity to decide what to recommend.',
    hasArticleSchema: true,
    customCta: {
      headline: 'Want to know how visible your business actually is to AI?',
      copy: 'We\'ve already seen how often AI tools fail to understand otherwise great businesses. A quick visibility scan shows what AI can and can\'t interpret about your site — and whether it\'s likely to recommend you.',
      buttonText: 'Check My AI Visibility',
      buttonLink: '/',
      footnote: 'No pitch. No obligation. Just clarity.',
    },
    content: `
        <p>AI search and Google search look similar on the surface. You type words into a box. You get an answer.</p>

        <p>But under the hood, they are built for completely different goals — and that difference is already affecting which businesses get recommended and which ones quietly disappear.</p>

        <p>Most businesses haven't caught this yet.<br />They're still optimizing for how search used to work.</p>

        <h2>Google search asks: "Where is the answer?"</h2>

        <p>Traditional search engines like Google are discovery systems.</p>

        <p>When you search, Google's job is to find pages on the internet that might contain the answer, rank them, and send you there. It doesn't explain. It doesn't synthesize. It points.</p>

        <p>That's why classic SEO focuses on:</p>

        <ul>
          <li>Keywords</li>
          <li>Backlinks</li>
          <li>Long-form content</li>
          <li>Ranking position</li>
        </ul>

        <p>Google assumes you will do the reading, comparing, and deciding.</p>

        <h2>AI search asks: "Can I explain the answer?"</h2>

        <p>AI systems work differently.</p>

        <p>When someone asks an AI tool a question, it isn't trying to send them elsewhere. It's trying to be the answer.</p>

        <p>That means the system has to:</p>

        <ul>
          <li>Understand who you are</li>
          <li>Understand what you offer</li>
          <li>Understand when you are relevant</li>
          <li>Decide whether it's confident enough to mention you</li>
        </ul>

        <p>AI doesn't browse websites the way humans do.<br />It interprets them.</p>

        <p><strong>This is the mental model shift most businesses are missing.</strong></p>

        <h2>Keywords vs understanding</h2>

        <p>Google treats queries like signals.</p>

        <p>Short, fragmented phrases work because Google is matching keywords across billions of pages.</p>

        <p>AI treats queries like intent.</p>

        <p>People write full sentences. They add context. They ask follow-ups. The system tracks meaning across the conversation.</p>

        <p><strong>Google search:</strong><br /><em>best hvac company salt lake city</em></p>

        <p><strong>AI query:</strong><br /><em>"I just bought a house and need a reliable HVAC company that can handle both repairs and ongoing maintenance — who should I call?"</em></p>

        <p>One system matches words.<br />The other tries to understand the situation.</p>

        <h2>Why this matters for your website</h2>

        <p>Most business websites were built for human browsing plus keyword indexing.</p>

        <p>That worked when search engines acted like directories.</p>

        <p>But AI systems aren't scanning your site looking for keywords. They're trying to answer questions like:</p>

        <ul>
          <li>What does this business actually do?</li>
          <li>Is this service clearly defined?</li>
          <li>Is the information consistent and complete?</li>
          <li>Can I confidently recommend this company?</li>
        </ul>

        <p>If the answer isn't clear, the AI doesn't "rank you lower."</p>

        <p><strong>It simply doesn't mention you.</strong></p>

        <h2>Retrieval vs synthesis</h2>

        <p>Google retrieves.</p>

        <p>It shows you links and trusts you to figure things out.</p>

        <p>AI synthesizes.</p>

        <p>It combines information, summarizes, explains, and recommends.</p>

        <p>That's why prompts like "explain this like I'm 12" work with AI but not with Google. AI is designed to produce answers, not just locate them.</p>

        <p>From a business perspective, this changes everything.</p>

        <p>You're no longer competing just to be found.<br /><strong>You're competing to be understood well enough to be chosen.</strong></p>

        <h2>Ambiguity exposes the gap</h2>

        <p>When a search query is ambiguous, Google often returns mixed results.</p>

        <p>AI systems try to resolve ambiguity or ask clarifying questions.</p>

        <p>That difference matters because business information is often ambiguous by default.</p>

        <p>If your site doesn't clearly explain:</p>

        <ul>
          <li>Your services</li>
          <li>Your location</li>
          <li>Your availability</li>
          <li>Your booking path</li>
        </ul>

        <p>AI has no incentive to guess.</p>

        <p>And when AI doesn't feel confident, it moves on.</p>

        <h2>Follow-up is the new reality</h2>

        <p>Google resets every time you search.</p>

        <p>AI builds context.</p>

        <p>Someone can ask:</p>

        <p><em>"What about a cheaper option?"</em></p>

        <p>And the system knows exactly what "that" refers to.</p>

        <p>This means recommendations aren't isolated moments. They're part of an ongoing reasoning process.</p>

        <p>If your business information can't survive that process, it won't surface.</p>

        <h2>The uncomfortable truth</h2>

        <p>Most business websites still assume:</p>

        <ul>
          <li>Humans will read everything</li>
          <li>Search engines will connect the dots</li>
          <li>Rankings equal visibility</li>
        </ul>

        <p>That assumption is breaking.</p>

        <p>AI systems don't browse.<br />They interpret.</p>

        <p>If your site isn't structured in a way an AI can confidently understand, it may never recommend you — even if you rank well in Google.</p>

        <p>That's the shift.</p>

        <p>Not new tools.<br />Not new tactics.<br /><strong>A new mental model.</strong></p>

        <p>And the businesses that adapt to it early won't just keep their visibility — they'll own it.</p>
      `,
  },
  {
    slug: '7-things-smart-business-owners-do-to-get-recommended-by-ai',
    title: '7 Things Smart Business Owners Do to Get Recommended by AI',
    subtitle: 'AI tools don\'t browse websites like humans or rank them like Google. They recommend businesses they understand and trust. Here\'s what those businesses do differently.',
    date: new Date().toISOString().split('T')[0],
    author: 'Dustin Crump',
    excerpt: 'AI tools don\'t browse websites like humans or rank them like Google. They recommend businesses they understand and trust. Here\'s what those businesses do differently.',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    metaDescription: 'AI tools recommend only a few businesses. See the patterns smart owners follow to get recommended and find out how your site looks to AI.',
    hasArticleSchema: true,
    content: `
        <p>More customers are asking AI tools questions like "Who should I call?" or "What's the best option near me?"</p>

        <p>When that happens, AI rarely gives a long list. It usually recommends one or two businesses.</p>

        <p>Those recommendations aren't random.</p>

        <p>After reviewing many business websites, a clear pattern shows up. The businesses that get recommended tend to do a few things consistently, often without realizing it.</p>

        <p>Here are seven of them.</p>

        <h2>1. They make it easy to understand what they do</h2>

        <p>AI doesn't guess. Businesses that get recommended clearly explain what they offer and who it's for. No clever wording. No ambiguity. If the AI has to interpret your business, it usually moves on.</p>

        <h2>2. They look legitimate everywhere, not just on their website</h2>

        <p>AI cross-checks information. Businesses that show up tend to have consistent details across their website and the rest of the web. When information doesn't line up, confidence drops fast.</p>

        <h2>3. Their information doesn't contradict itself</h2>

        <p>Conflicting service descriptions, locations, or messaging introduce doubt. Smart business owners remove those contradictions so AI systems see one clear, consistent story.</p>

        <h2>4. They answer real customer questions directly</h2>

        <p>AI exists to answer questions. Businesses that show up tend to make key information easy to find and easy to understand. Clear answers beat clever marketing language every time.</p>

        <h2>5. Their website is structured for machines, not just people</h2>

        <p>Many websites look great to humans but are confusing to AI. Businesses that get recommended tend to have an underlying structure that helps machines identify what matters and what can be trusted.</p>

        <h2>6. They reduce uncertainty</h2>

        <p>AI avoids recommending businesses when it's unsure. Smart owners remove doubt around services, location, credibility, and relevance so the recommendation feels safe.</p>

        <h2>7. They've adapted to how search is changing</h2>

        <p>The biggest difference is mindset. Businesses that show up in AI answers understand that visibility now means being clear, consistent, and reference-worthy to systems that summarize the web.</p>

        <hr />

        <h2>Want to see how your business looks to AI?</h2>

        <p>Most business owners have no idea how AI systems interpret their website. That's normal.</p>

        <p>Our AI Visibility Audit shows how AI tools read your site, where confidence breaks down, and what's helping or hurting your chances of being recommended.</p>

        <p>No guesswork. No jargon. Just clarity.</p>

        <p><a href="/audit" class="text-primary hover:underline font-semibold">Get Your Free AI Visibility Audit →</a></p>
      `,
  },
  {
    slug: 'what-is-found-for-ai',
    title: 'What Is Found For AI?',
    date: '2025-01-03',
    author: 'Dustin Crump',
    excerpt: 'Found For AI is a consulting firm that helps real businesses become visible, understandable, and recommendable in AI-powered search.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1516382799247-87df95d790b7?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    metaDescription: 'Found For AI is a consulting firm that helps real businesses become visible, understandable, and recommendable in AI-powered search.',
    content: `
        <h2>What Is Found For AI?</h2>

        <p>Found For AI is a consulting firm that helps real businesses become visible, understandable, and recommendable in AI-powered search.</p>

        <p>As search shifts away from traditional keyword results and toward AI-generated answers, many legitimate businesses are becoming invisible — not because they aren't good, but because AI systems don't clearly understand who they are, what they do, or when to recommend them.</p>

        <p>Found For AI exists to fix that.</p>

        <hr />

        <h2>The Problem Found For AI Solves</h2>

        <p>AI search tools like Google Gemini, ChatGPT, and other AI-driven discovery systems don't search the web the same way humans do.</p>

        <p>Instead of scanning pages for keywords, they try to <strong>understand entities</strong>:</p>

        <ul>
          <li>Who a business is</li>
          <li>What services it offers</li>
          <li>Where it operates</li>
          <li>When it should be recommended</li>
          <li>Why it is credible</li>
        </ul>

        <p>Most business websites were never built with this kind of understanding in mind. As a result, AI systems either skip them entirely or misinterpret them.</p>

        <p>Found For AI helps businesses close that gap.</p>

        <hr />

        <h2>What Found For AI Does</h2>

        <p>Found For AI works with businesses to make their websites and online presence <strong>AI-readable</strong>, not just human-readable.</p>

        <p>That includes:</p>

        <ul>
          <li>Clarifying what the business is and is not</li>
          <li>Structuring information so AI systems can interpret it accurately</li>
          <li>Aligning on-site content with how AI models evaluate trust and relevance</li>
          <li>Ensuring businesses are correctly represented across AI-driven discovery tools</li>
        </ul>

        <p>The goal is simple:<br /><strong>Be the business AI recommends first.</strong></p>

        <hr />

        <h2>Who Found For AI Is For</h2>

        <p>Found For AI works with:</p>

        <ul>
          <li>Local and regional service businesses</li>
          <li>Professional services firms</li>
          <li>Consultants and agencies</li>
          <li>Real companies that rely on being discovered, trusted, and chosen</li>
        </ul>

        <p>This is not about chasing trends or gaming algorithms.<br />It's about making sure legitimate businesses are not left behind as search evolves.</p>

        <hr />

        <h2>Who Founded Found For AI</h2>

        <p>Found For AI was founded by <strong>Dustin Crump</strong>, a longtime technical SEO strategist who saw a growing disconnect between how businesses present themselves online and how AI systems actually interpret them.</p>

        <p>After years of watching strong businesses disappear from AI-driven answers — even while ranking well in traditional search — Found For AI was created to address that blind spot.</p>

        <hr />

        <h2>Why Found For AI Matters Now</h2>

        <p>AI search is no longer experimental. It's already shaping how customers find businesses.</p>

        <p>Companies that adapt early will be:</p>

        <ul>
          <li>Seen more often</li>
          <li>Trusted more quickly</li>
          <li>Recommended more confidently by AI systems</li>
        </ul>

        <p>Found For AI helps businesses prepare for that future — without hype, shortcuts, or guesswork.</p>

        <hr />

        <p>If you want to understand how visible your business is to AI search today, you can scan your website at <a href="https://foundforai.com" class="text-primary hover:underline">https://foundforai.com</a>.</p>
      `,
  },
  {
    slug: 'missing-half-of-ai-seo-automation',
    title: 'The Missing Half of AI SEO: Automating What Happens After You\'re Found',
    date: '2025-01-25',
    author: 'Dustin Crump',
    excerpt: 'Getting found by AI is only half the game. The other half is what happens after—the follow-up, the workflow, the automation. That\'s where Fripse AI comes in.',
    readTime: '5 min read',
    image: aiAutomationImg,
    metaDescription: 'Getting found by AI is only half the game. The other half is what happens after—the follow-up, the workflow, the automation. That\'s where Fripse AI comes in.',
    hasMentions: true,
    content: `
        <h2>Visibility Is Just Step One</h2>

        <p>Optimizing your website for AI search is crucial—but it's only the first step in the new digital landscape. Once an AI system finds you, the next question is:</p>

        <p><strong>What happens next?</strong></p>

        <p>If the customer asks a chatbot to contact you, book a service, or get a quote—does your system handle that smoothly, or does the lead vanish into an inbox?</p>

        <p>AI SEO gets you discovered. Automation keeps you connected.</p>

        <h2>The Invisible Gap Most Businesses Miss</h2>

        <p>Many websites are still built like billboards: they get seen, but they don't talk back. Today's customer expects instant replies, frictionless scheduling, and fast follow-ups—all powered by automation.</p>

        <p>Even if you're winning the AI SEO race, without automation, you're still leaking opportunity.</p>

        <h2>Enter Fripse AI</h2>

        <p>That's where <a href="https://fripse.com" target="_blank" rel="noopener" class="text-primary hover:underline">Fripse AI</a> comes in. They design the systems that take over once visibility turns into interest—automating things like:</p>

        <ul>
          <li>Lead follow-up sequences</li>
          <li>Scheduling and reminders</li>
          <li>Workflow routing</li>
          <li>Client communication templates</li>
          <li>CRM integrations</li>
        </ul>

        <p>We handle getting you found by AI; they handle what happens after you're found.</p>

        <h2>Why This Matters Now</h2>

        <p>The same AI that helps customers discover you can also manage your backend operations—if it's implemented correctly. The winners of the next decade won't just have websites optimized for AI search; they'll have businesses optimized for AI performance.</p>

        <h2>The Partnership Approach</h2>

        <p>We built Found For AI to prepare small businesses for the age of AI visibility. We partner with Fripse AI to make sure that visibility turns into results.</p>

        <p>Together, we help business owners:</p>

        <ul>
          <li>Get discovered</li>
          <li>Capture leads automatically</li>
          <li>Follow up consistently</li>
          <li>And grow with less manual effort</li>
        </ul>

        <h2>The Takeaway</h2>

        <p>Being visible to AI is powerful. But being ready to respond when AI sends you business—that's where real growth happens.</p>

        <p>Learn more about how automation can amplify your AI visibility at <a href="https://fripse.com" target="_blank" rel="noopener" class="text-primary hover:underline">Fripse AI</a>.</p>
      `,
  },
  {
    slug: 'are-you-ready-to-be-found-by-ai',
    title: 'Are You Ready to Be Found by AI? Why Traditional SEO Is About to Change Forever',
    date: '2025-01-20',
    author: 'Dustin Crump',
    excerpt: 'The way people find businesses is changing. AI assistants are replacing search engines, and if your business isn\'t visible to AI, it doesn\'t exist in that conversation.',
    readTime: '4 min read',
    image: aiSearchImg,
    content: `
        <p>When was the last time you Googled something?</p>

        <p>Exactly. You're not even doing that as much anymore, right? You're asking ChatGPT, Perplexity, or another AI assistant. And pretty soon, you'll be asking them everything.</p>

        <p>Now think about your customers.</p>

        <p>They're going to be doing the same thing.</p>

        <p>That's where FoundForAI comes in.</p>

        <p>Because the way people find businesses is changing — and most companies have no idea it's already happening.</p>

        <h2>The Shift: From Search to Suggestion</h2>

        <p>In the old world, you typed a keyword and scrolled through results.</p>

        <p>In the new world, AI does the searching for you — and only shows one or two answers.</p>

        <p>If your business isn't visible to AI, it doesn't exist in that conversation.</p>

        <h2>What "Being Found by AI" Really Means</h2>

        <p>It means your website, services, and reputation are structured so that AI models can:</p>

        <ul>
          <li>Understand what you do</li>
          <li>Trust your information</li>
          <li>Confidently recommend you when someone asks</li>
        </ul>

        <p>That's what AI SEO (or AI discoverability) is all about.</p>

        <p>It's not keyword stuffing. It's clarity, context, and clean data.</p>

        <p>At FoundForAI, we help businesses:</p>

        <ul>
          <li>Add the schema markup that makes your content machine-readable</li>
          <li>Structure your pages for natural-language questions</li>
          <li>Optimize your brand presence for LLMs like ChatGPT and Perplexity</li>
        </ul>

        <p>So when someone asks, "Who's the best AI consultant near me?" — the answer isn't random anymore. It's you.</p>

        <h2>The Future Is Already Here</h2>

        <p>AI-driven discovery is happening quietly right now.</p>

        <p>If you wait for "everyone else to catch on," you'll be buried behind the ones who didn't.</p>

        <p>Your business deserves to be visible in the new search era — and that starts today.</p>

        <p><a href="/audit" class="text-primary hover:underline">Get your free AI Readiness Audit</a> and find out if your business is visible to AI at FoundForAI.com/audit</p>
      `,
  },
  {
    slug: 'how-to-make-website-ai-discoverable',
    title: 'How To Make Your Website AI Discoverable',
    date: '2025-01-10',
    author: 'Dustin Crump',
    excerpt: 'A step-by-step guide to optimizing your website for AI search engines. Implement schema, structure content, and ensure your business shows up in AI-powered answers.',
    readTime: '7 min read',
    image: websiteOptimizationImg,
    content: `
        <p>AI search is fundamentally different from traditional search. When someone asks ChatGPT or Perplexity for recommendations, the AI scans the web for structured, clear information. Here's how to ensure your business shows up.</p>

        <h2>Step 1: Add Schema Markup</h2>
        <p>Schema markup is the foundation of AI discoverability. At minimum, implement LocalBusiness schema with your NAP (Name, Address, Phone), Service schema describing what you offer, and FAQPage schema for common questions.</p>

        <h2>Step 2: Structure Your Content Clearly</h2>
        <p>AI models prefer well-organized content with semantic HTML. Use:</p>
        <ul>
          <li>Proper heading hierarchy (H1, H2, H3)</li>
          <li>Short, factual paragraphs</li>
          <li>Lists and tables for comparisons</li>
          <li>Clear answers to common questions</li>
        </ul>

        <h2>Step 3: Optimize Your GEO Data</h2>
        <p>If you're a local business, ensure your geographic information is consistent and complete. This includes accurate coordinates, area served, opening hours, and a verified Google Business Profile.</p>

        <h2>Step 4: Create an FAQ Section</h2>
        <p>FAQs are gold for AI search. They directly answer user questions in a format AI can easily parse and present. Focus on real questions your customers ask.</p>

        <h2>Step 5: Test and Monitor</h2>
        <p>Ask ChatGPT, Perplexity, and Google AI questions related to your services in your area. Do you appear? If not, there's work to do.</p>

        <h2>Get Expert Help</h2>
        <p>Optimizing for AI search requires technical implementation and content restructuring. Found For AI provides a complete roadmap in every audit, plus done-for-you implementation if you need it.</p>

        <p><a href="/audit" class="text-primary hover:underline">Request your free AI Readiness Audit</a> to discover exactly what's holding you back from AI discovery.</p>
      `,
  },
];

export const blogPostsBySlug: Record<string, BlogPost> = Object.fromEntries(
  blogPosts.map((p) => [p.slug, p])
);

export const blogPostSlugs: string[] = blogPosts.map((p) => p.slug);
