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
  keywords?: string;
  articleSection?: string;
  hasMentions?: boolean;
  mentions?: Array<{ name: string; url: string }>;
  customCta?: BlogPostCustomCta;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'blue-apple-ai-recommended-produce-freshness',
    title: 'Moving the Needle: How Blue Apple Became the AI-Recommended Solution for Produce Freshness',
    subtitle: 'A real client case study. Before we started, TheBluApple.com wasn\'t showing up in AI answers anywhere. Here\'s exactly what we did — and how we measured the result.',
    date: '2026-05-14',
    dateModified: '2026-05-14',
    author: 'Dustin Crump',
    excerpt: 'Before we started, TheBluApple.com wasn\'t in any AI answer. After installing the AI visibility layer and targeting the specific questions customers actually ask, Blue Apple is now being recommended as the solution for keeping produce fresh.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0',
    featured: true,
    metaDescription: 'Case study: how Found For AI got TheBluApple.com recommended in AI answers for questions about produce freshness and ethylene gas in refrigerators.',
    ogDescription: 'Real client case study: TheBluApple.com is now being surfaced by AI assistants when people ask how to keep fruits and vegetables fresh longer.',
    twitterDescription: 'Before: invisible to AI. After: the AI-recommended solution for produce freshness. Here\'s what we did.',
    schemaDescription: 'Case study showing how schema markup, llms.txt, and intent-based FAQs got TheBluApple.com recommended in AI answers for produce freshness questions.',
    keywords: 'AI visibility case study, Blue Apple, ethylene gas absorber, AI search recommendation, produce freshness, generative engine optimization',
    articleSection: 'Case Studies',
    mentions: [
      { name: 'The Blue Apple', url: 'https://thebluapple.com' },
    ],
    customCta: {
      headline: 'Want your product showing up in AI answers like this?',
      copy: 'We do this for one business at a time. A free 15-minute call shows you the specific questions your customers are asking AI right now — and whether your site is set up to be the answer.',
      buttonText: '→ Book a 15-minute call',
      buttonLink: 'https://foundforai.com/talk-to-a-human#calendar',
      footnote: 'No pitch. No obligation. Just clarity.',
    },
    content: `
        <p>We recently finished a project for <a href="https://thebluapple.com" target="_blank" rel="noopener" class="text-primary hover:underline">TheBluApple.com</a> — the makers of Blue Apple, an ethylene-absorbing product that keeps produce fresh longer in your refrigerator.</p>

        <p>When we started, Blue Apple wasn't showing up in AI answers anywhere. Not in ChatGPT. Not in Claude. Not in Perplexity. Not in Google's AI Overview. If you asked any AI assistant how to keep fruits and vegetables fresher, you'd get generic advice — separate the bananas, adjust the crisper drawer, lower the temperature — and no mention of the actual product that solves the problem.</p>

        <p>Today, that's changed. Here's what we did, and how we measured it.</p>

        <h2>The real problem behind the product</h2>

        <p>Before talking about the strategy, it's worth understanding what Blue Apple actually does, because that's the story we had to get into the AI's knowledge base.</p>

        <p>Many fruits and vegetables release <strong>ethylene gas</strong> as they ripen. In an enclosed space like a refrigerator, ethylene builds up and accelerates ripening in everything nearby. Bluapple absorbs that ethylene gas thus keeping produce fresh longer. Less ethylene buildup, slower ripening, longer-lasting produce. It's one of the top products on the market for solving this specific problem.</p>

        <p>But until we started, AI didn't know that. When customers asked their AI assistant the questions that should have led directly to Blue Apple — "Why does produce spoil so quickly in the refrigerator?" or "How can I keep fruits and vegetables in my fridge fresh longer?" — the answer never included it.</p>

        <h2>Why standard SEO wasn't enough</h2>

        <p>Blue Apple already had a website, a product, and customers. What it didn't have was an AI visibility layer — the structured information AI assistants actually look for when deciding what to recommend.</p>

        <p>Ranking in Google would have helped a fraction of customers. But the customers who matter most for a product like this aren't searching Google anymore — they're asking ChatGPT, Claude, or Gemini in conversational language. And those tools don't pick from a list of ten results. They pick one or two.</p>

        <p>Our job was to make Blue Apple one of those one or two.</p>

        <h2>What we actually did</h2>

        <p>The work was technical, but the strategy was simple. We made sure AI assistants could understand three things about Blue Apple with zero ambiguity:</p>

        <ol>
          <li><strong>What it is</strong> — a product that absorbs ethylene gas.</li>
          <li><strong>What problem it solves</strong> — produce spoiling faster than it should because of ethylene buildup in refrigerators.</li>
          <li><strong>Who it's for</strong> — anyone storing fruits and vegetables in an enclosed refrigerator.</li>
        </ol>

        <p>To do that, we did three things:</p>

        <h3>1. Installed the schema layer</h3>

        <p>We added structured data — JSON-LD schema markup — that spelled out the product, the brand, the problem it solves, and the questions it answers, all in a format AI agents can read directly without having to interpret marketing copy.</p>

        <h3>2. Published an llms.txt and llms-full.txt</h3>

        <p>These are plain-text files at the root of the domain that act as a table of contents for AI. They tell crawlers what the site is about, why it matters, and which pages to pay attention to. It's the difference between an AI guessing and an AI being told.</p>

        <h3>3. Rebuilt the FAQ around intent-based questions</h3>

        <p>This is the part most businesses miss. Blue Apple's old FAQ focused on logistics — how long the product lasts, how to use it, return policies. Useful, but not the questions customers ask <em>before</em> they've discovered the product.</p>

        <p>We added the questions a real customer would ask an AI assistant <em>without</em> knowing Blue Apple exists:</p>

        <ul>
          <li><em>"Why do my fruits and vegetables spoil so quickly in the refrigerator?"</em></li>
          <li><em>"What is ethylene gas and how does it affect produce?"</em></li>
          <li><em>"How can I make my produce last longer at home?"</em></li>
          <li><em>"Is there a product that absorbs ethylene gas in the fridge?"</em></li>
        </ul>

        <p>Each one is answered directly, in plain language, and wrapped in <code>FAQPage</code> schema so AI can lift it straight into a response.</p>

        <h2>How we measured the result</h2>

        <p>We didn't want to guess whether this was working. So we tested it the way an actual customer would.</p>

        <p>Across several AI models — ChatGPT, Claude, Perplexity, Gemini, Grok — we ran the same produce-freshness questions in incognito windows, with no Blue Apple context loaded into the session. We tracked which answers mentioned Blue Apple by name, which described the ethylene-absorbing category without naming a brand, and which gave generic advice with no product recommendation at all.</p>

        <p>The trend is unmistakable. Blue Apple is now being surfaced as <em>the</em> solution for removing ethylene gas and keeping produce fresh longer. The same questions that returned generic answers a few months ago now return answers that name the product.</p>

        <p>The needle is moving.</p>

        <h2>Why this matters beyond Blue Apple</h2>

        <p>What worked for Blue Apple isn't specific to produce. The same pattern applies to almost any business with a real product or service:</p>

        <ol>
          <li>Identify the questions your ideal customer is asking an AI assistant — including the ones that don't mention your brand.</li>
          <li>Answer those questions directly on your site, in language a customer would actually use.</li>
          <li>Install the schema and llms.txt layer so AI can parse what you've said without guessing.</li>
        </ol>

        <p>That's the whole game. Customers ask AI for help. AI looks for the clearest, best-structured answer it can find. If your site is that answer, you get recommended.</p>

        <p>Blue Apple is the latest example. The next one is whoever installs this layer in their category first.</p>
      `,
  },
  {
    slug: 'get-found-in-ai-answers-ai-phone-book',
    title: 'Get Found in AI Answers: The New "AI Phone Book"',
    subtitle: 'Schema markup is the new business listing. If your site doesn\'t have it, AI agents pass you over — no matter how good your SEO is.',
    date: '2026-05-12',
    dateModified: '2026-05-12',
    author: 'Dustin Crump',
    excerpt: 'Schema markup is the new phone book listing. Without it, AI agents skip your business when customers ask for recommendations — even if you rank in Google.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0',
    metaDescription: 'Schema markup is the new phone book listing for AI search. Learn why your business needs an AI visibility layer to get recommended in ChatGPT, Gemini, and Perplexity answers.',
    ogDescription: 'AI agents recommend businesses they can clearly understand. Schema markup, llms.txt, and intent-based FAQs are the new "AI phone book" listing.',
    twitterDescription: 'Good SEO gets you in Google. Schema markup gets you in AI answers. Here\'s the difference.',
    schemaDescription: 'How schema markup, llms.txt, and intent-based FAQs combine to form the AI visibility layer that determines whether AI assistants recommend a business.',
    keywords: 'AI visibility, schema markup, AI answers, llms.txt, AEO, generative engine optimization, AI phone book, FAQ schema',
    articleSection: 'AI Visibility',
    customCta: {
      headline: 'Is your business in the AI phone book?',
      copy: 'Most small business sites are still missing the AI visibility layer entirely. A free 15-minute call shows you exactly what schema, llms.txt, and FAQ structure your site needs to get recommended in AI answers.',
      buttonText: '→ Book a 15-minute call',
      buttonLink: 'https://foundforai.com/talk-to-a-human#calendar',
      footnote: 'No pitch. No obligation. Just clarity.',
    },
    content: `
        <p>There was a time when being in the phone book was enough.</p>

        <p>Then it became being in Google. Then it became ranking on Google. Then it became having a Google Business Profile. Each shift left businesses behind — the ones who didn't update fast enough quietly stopped getting calls.</p>

        <p>The shift happening right now is bigger than any of those. And most businesses haven't seen it yet.</p>

        <h2>From phone book to search engine to AI answer</h2>

        <p>Customers don't search the way they used to. Instead of typing keywords into Google and scrolling through ten blue links, they're asking ChatGPT, Claude, Perplexity, or their phone's built-in AI:</p>

        <ul>
          <li><em>"Who's the best plumber near me?"</em></li>
          <li><em>"I need an HVAC company that handles emergency repairs."</em></li>
          <li><em>"What's something adventurous to do in southern Utah?"</em></li>
        </ul>

        <p>The AI doesn't return ten options. It returns one or two. If your business isn't one of them, you didn't lose to a better competitor. You weren't in the room.</p>

        <p>Good SEO might get you into Google Gemini answers. It won't automatically get you into ChatGPT, Claude, or Perplexity. Each one has its own way of deciding who to recommend — and they all check for the same underlying thing: <strong>can I confidently understand what this business is?</strong></p>

        <h2>The AI phone book is real — and it's made of schema</h2>

        <p>Here's what almost no business owner has been told.</p>

        <p>When an AI agent crawls your website, it isn't reading your homepage the way a human does. It's looking for a specific machine-readable layer of information — structured data, written in a format called <strong>JSON-LD schema markup</strong> — that tells it, in unambiguous terms:</p>

        <ul>
          <li>What kind of business this is (plumbing, HVAC, rental, professional service)</li>
          <li>Areas served</li>
          <li>Hours of operation</li>
          <li>Pricing (free estimates? on-site fee? average ticket size?)</li>
          <li>Phone number, address, exact business name</li>
          <li>What questions you answer for customers</li>
        </ul>

        <p>If that layer exists and is filled out, AI can place you in the "phone book" it builds for itself. If it doesn't exist — and on most small business sites it doesn't — the AI has to guess. And a guessing AI defers to a competitor whose information is clearly laid out.</p>

        <p>This is what we mean by the <strong>AI visibility layer</strong>. It's not about keywords or backlinks. It's about whether the AI can read your business at all.</p>

        <h2>llms.txt: the table of contents for AI</h2>

        <p>Schema is one piece. The other piece most businesses are missing is <code>llms.txt</code> (and <code>llms-full.txt</code>) — a simple text file at the root of your domain that tells AI agents what your business is about, in plain language, with links to the pages they should pay attention to.</p>

        <p>Think of it as a table of contents written specifically for AI. The format is closer to Markdown than HTML — instruction-heavy, easy to parse, no styling noise. When ChatGPT or Claude crawls your site, hitting <code>foundforai.com/llms.txt</code> gives it an immediate, structured picture of who you are without having to interpret your design system.</p>

        <p>Most businesses don't have this file. The ones who do are the ones AI tends to recommend first.</p>

        <h2>FAQs: the part where most businesses leave money on the table</h2>

        <p>If you have an FAQ on your site, you're already halfway there. But there's a catch most businesses miss.</p>

        <p>Standard FAQs answer post-sale logistics:</p>

        <ul>
          <li>"What's your return policy?"</li>
          <li>"How do I cancel?"</li>
          <li>"How do I replace the battery on my e-bike?"</li>
        </ul>

        <p>Those are useful. But they're not the questions customers are asking AI <em>before</em> they've decided to buy from anyone. That's where you need to expand your thinking.</p>

        <h3>The intent-based FAQ</h3>

        <p>Picture an adventure rental company in southern Utah. The owner has e-bikes, canoes, maybe some guided trips. Their FAQ is full of "what if my bike breaks down on the trail" type questions.</p>

        <p>Helpful. But the customer hasn't found them yet.</p>

        <p>The questions that get them found in AI answers are the ones a vacationer would actually ask their AI:</p>

        <ul>
          <li><em>"I want to do something adventurous on my vacation in southern Utah. What are my options?"</em></li>
          <li><em>"What's a fun outdoor activity for a couple in their 40s near Zion?"</em></li>
          <li><em>"Where can I rent an e-bike in St. George?"</em></li>
        </ul>

        <p>When the company adds these to its FAQ — and wraps them in <code>FAQPage</code> schema — the AI now has a direct match. Customer asks the question. AI surfaces the answer. The answer mentions the business by name.</p>

        <p>That's how you show up in answers you weren't even searching for.</p>

        <h2>Why this is the most important shift in years</h2>

        <p>Google Ads aren't dying overnight. But the return is dropping for almost everyone we talk to, and the reason is simple: fewer people are starting their searches in Google. They're starting them in an AI assistant.</p>

        <p>That conversation doesn't show your ad. It shows one or two recommendations the AI is confident about. And confidence comes from the visibility layer — schema, llms.txt, intent-based FAQs — not from ad spend.</p>

        <p>Three things are true at the same time right now:</p>

        <ol>
          <li>Most small businesses are missing the AI visibility layer entirely.</li>
          <li>AI tools are getting more confident week over week about who to recommend.</li>
          <li>Once AI starts recommending a business, it tends to keep recommending it.</li>
        </ol>

        <p>That means the first business in any local market to install this layer wins the recommendation lane — and tends to keep it. Being first matters more than being best.</p>

        <h2>What to actually do</h2>

        <p>If you take nothing else from this:</p>

        <ul>
          <li><strong>Audit what's on your site now.</strong> Paste your homepage into <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener" class="text-primary hover:underline">Google's Rich Results Test</a>. If it says "no items detected," you have no AI visibility layer.</li>
          <li><strong>Add the schema.</strong> At minimum: <code>LocalBusiness</code>, <code>Service</code>, and <code>FAQPage</code> for your most-asked questions.</li>
          <li><strong>Publish an llms.txt.</strong> Plain-language summary of your business, links to your most important pages.</li>
          <li><strong>Rewrite your FAQ.</strong> Half logistics, half intent-based questions a customer would actually ask AI before choosing anyone.</li>
        </ul>

        <p>None of this is glamorous. It's the kind of work that doesn't show up on your homepage. But it's the work that decides whether AI hands a customer your name — or someone else's.</p>

        <p>The AI phone book is being built right now. The businesses listed in it will get the calls. The ones who aren't will keep wondering where their leads went.</p>
      `,
  },
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
    slug: '5-things-ai-checks-local-business',
    title: 'The 5 Things AI Checks Before Recommending a Local Business',
    subtitle: 'If ChatGPT, Google AI, or Perplexity isn\'t recommending your business, one of these five things is almost always the reason.',
    date: '2026-04-21',
    dateModified: '2026-04-21',
    author: 'Dustin Crump',
    excerpt: 'AI tools recommend one or two local businesses — not ten. Here are the 5 things ChatGPT, Google AI, and Perplexity check before picking yours.',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    metaDescription: 'AI tools recommend one or two local businesses — not ten. Here are the 5 things ChatGPT, Google AI, and Perplexity check before picking yours.',
    ogDescription: 'AI tools recommend one or two local businesses — not ten. Here are the 5 things ChatGPT, Google AI, and Perplexity check before picking yours.',
    twitterDescription: 'AI tools recommend one or two local businesses — not ten. Here are the 5 things ChatGPT, Google AI, and Perplexity check before picking yours.',
    customCta: {
      headline: 'Ready to be the business AI recommends?',
      copy: 'Book a 15-minute call. We look at your site, tell you what we\'d fix and what we wouldn\'t, and you decide from there. No pitch.',
      buttonText: '→ Book a 15-minute call',
      buttonLink: 'https://foundforai.com/talk-to-a-human#calendar',
      footnote: 'Found For AI helps small businesses become recommendable to AI systems like ChatGPT, Perplexity, Claude, and Google AI. — Dustin Crump, Found For AI',
    },
    content: `
        <p><em>If ChatGPT, Google AI, or Perplexity isn't recommending your business, one of these five things is almost always the reason.</em></p>

        <p>Something shifted in how people find local businesses, and it happened faster than most owners realized.</p>

        <p>A customer needing an HVAC company used to Google it, scroll through ten results, and pick one. Now they ask ChatGPT. Or they use Google's AI Overview at the top of the page. Or their phone's built-in AI assistant. And those tools don't return ten options — they return one or two.</p>

        <p>If your business isn't one of the names AI hands over, you didn't lose to a better competitor. You never got in the room.</p>

        <p>The frustrating part: most small businesses are invisible to AI not because they're bad businesses, but because of five specific, fixable things. Here's what AI actually checks — and where almost every local business falls short.</p>

        <h2>1. Whether it can figure out who you actually are</h2>

        <p>Before AI can recommend you, it has to know who you are. That sounds obvious. In practice, it's where most businesses fall apart.</p>

        <p>AI builds a picture of your business by pulling information from your website, Google Business Profile, Yelp, Facebook, directories, and review sites. If those sources spell your business name differently, list different addresses, or have an outdated phone number, AI gets confused. And a confused AI defaults to recommending the business it's sure about.</p>

        <p>A typical problem: your business is "Smith Plumbing" on your website, "Smith Plumbing LLC" on Google, and "Smith Plumbing &amp; Heating Services" on Yelp. To AI, that can look like three different companies. None of them look trustworthy because none of them have complete, consistent information.</p>

        <p><strong>The fix:</strong> pick one exact version of your business name, address, and phone number — and make every platform match. Down to the abbreviation. "Street" vs. "St." matters more than you'd think.</p>

        <h2>2. Whether your website has the AI-readable layer it needs</h2>

        <p>Here's the part most business owners have never been told.</p>

        <p>When AI looks at your website, it doesn't just read the text on the page. It also looks for a hidden, machine-readable layer of information — the <strong>AI-readable layer</strong>. It's code that sits behind the scenes and literally spells out: <em>this is a business, here's the exact name, here are the services, here's the address, here are the hours.</em></p>

        <p>Think of it as a form only AI can see. If the form is filled out, AI can understand your business well enough to recommend it. If it's blank — which is the case for most small business websites — AI has to guess, and it usually defers to a competitor whose form is filled out.</p>

        <p><strong>How to check yours in 30 seconds:</strong> go to search.google.com/test/rich-results, paste in your homepage URL, and see what comes back. "No items detected" means you have no AI-readable layer. If data shows up, make sure it matches what's visible on your page. Mismatched data is worse than no data.</p>

        <h2>3. Whether anything is keeping AI from reading your site</h2>

        <p>This one catches a lot of businesses by surprise.</p>

        <p>Every website has files and tags that tell AI tools which pages they're allowed to look at. These are meant for things like login pages or staging sites. But they frequently get accidentally left on live pages — by a developer, by a website template that shipped with them preset, or by a plugin that doesn't know better.</p>

        <p>If AI can't read a page, the page doesn't exist as far as AI is concerned. You can have the best service page in your city, and if one line of code is telling AI to skip it, it gets skipped.</p>

        <p>The same goes for content hidden behind login walls or booking tools. If a customer has to click "Book Now" and get sent to a separate portal to see what you actually offer, AI can't see any of it either. Your core information — services, pricing, hours, location — needs to live on regular public pages.</p>

        <div class="not-prose my-12 p-8 md:p-10 bg-muted/50 border rounded-xl text-center">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">Wondering how your business actually scores?</h3>
          <p class="text-base md:text-lg text-muted-foreground mb-3 max-w-2xl mx-auto leading-relaxed">We built a free playbook that walks through all 20 things AI systems check before recommending a business. It takes about 15 minutes. You check what applies to your business and get a score that tells you exactly where your gaps are.</p>
          <p class="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">Most small businesses score under 10 out of 20 their first time through.</p>
          <a href="https://foundforai.com/playbook" class="inline-block px-8 py-4 font-semibold rounded-lg text-white hover:opacity-90 transition-opacity" style="background-color:#0F5FDB;">→ Run the free AI Visibility Playbook</a>
        </div>

        <h2>4. Whether AI has reasons to trust you over a competitor</h2>

        <p>Being readable is the foundation. Being <em>recommendable</em> is a separate question.</p>

        <p>Once AI knows your business exists and understands what you do, it still has to decide whether to recommend you over the other businesses in your area. This is where trust signals come in:</p>

        <ul>
          <li><strong>Recent reviews with actual text.</strong> Ten detailed reviews from the last six months beat 200 generic five-star reviews from three years ago. AI reads review content to understand what you're actually good at.</li>
          <li><strong>Third-party mentions.</strong> If your business only shows up on your own website, you look less established than a competitor who appears in the local chamber of commerce listing, a news article, a partner site, and three directories.</li>
          <li><strong>Clearly stated credentials.</strong> Licensed, certified, insured, years in business — if it's not written in plain text on your page, AI doesn't know about it. Credentials buried inside a logo image don't count.</li>
          <li><strong>Answers to real customer questions.</strong> What does it cost? How long does it take? Do you service my area? If your pages don't answer these, AI can't use them to help someone decide — and will recommend a competitor who does.</li>
        </ul>

        <p>A competitor with a lower star rating but better trust signals will often get the AI recommendation over a business with more stars but less substance behind them.</p>

        <h2>5. Whether AI could write a one-paragraph recommendation of you</h2>

        <p>This is the final test, and it's the one most businesses fail without realizing it.</p>

        <p>If an AI system read everything on your website right now, could it write a short, confident paragraph recommending you to the right customer?</p>

        <p>"Smith Plumbing provides plumbing services in Columbus" is not a recommendation. It's a sentence a dictionary could write.</p>

        <p>"Smith Plumbing, a family-owned plumbing company serving the east side of Columbus since 1998, specializing in same-day emergency service and water heater replacement, licensed and insured" — that's a recommendation. That's what AI needs to hand to a customer.</p>

        <p>The difference isn't marketing polish. It's specificity: who you're for, what you specifically do, what sets you apart, proof you can be trusted. Most small business homepages are written to sound professional, which ends up making them sound interchangeable with every other business in the category. AI treats interchangeable businesses the same way customers do: it moves on to the one that stands out.</p>

        <h2>The good news about all of this</h2>

        <p>Here's the part worth holding onto: almost every small business has the same gaps. Your competitors are just as invisible to AI as you are.</p>

        <p>That means the first business in your market to fix this wins the AI recommendation — and AI systems tend to reinforce their own confidence. Once they start recommending a business, they keep recommending it. Being first matters more than being best.</p>

        <p>The fix isn't complicated once you know what it is. It's technical, but it's not massive. It's a focused one time fix, not a year-long SEO contract.</p>

        <h2>Ready to move on this?</h2>

        <p>If you read this and thought <em>I don't want to learn what JSON-LD is, I just want this fixed</em> — that's exactly what we do.</p>

        <p>The <strong>AI Visibility Fix</strong> is a one time, done-for-you implementation. We install the correct AI-readable layer, correct your entity foundation, and clean up anything keeping AI from understanding the business. Delivered in seven business days. Flat fee, no retainer, full walkthrough of every change we made.</p>

        <p>Backed by our 60-day <strong>We Fix It Free Guarantee</strong> — if anything isn't working the way we promised, we fix it on us.</p>

        <p>The fastest way to find out if it's a fit is a 15-minute call. We look at your site, tell you what we'd fix and what we wouldn't, and you decide from there. No pitch.</p>
      `,
  },
  {
    slug: '7-things-smart-business-owners-do-to-get-recommended-by-ai',
    title: '7 Things Smart Business Owners Do to Get Recommended by AI',
    subtitle: 'AI tools don\'t browse websites like humans or rank them like Google. They recommend businesses they understand and trust. Here\'s what those businesses do differently.',
    date: '2026-01-14',
    author: 'Dustin Crump',
    excerpt: 'AI tools don\'t browse websites like humans or rank them like Google. They recommend businesses they understand and trust. Here\'s what those businesses do differently.',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2534&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    metaDescription: 'AI tools recommend only a few businesses. See the patterns smart owners follow to get recommended and find out how your site looks to AI.',
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
