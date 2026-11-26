# Partnership portfolio (private)

This file is not a public page. Founder review required before it is sent anywhere.

OpenWorks is named here only as the private portfolio purpose. Do not copy that name onto foundforai.com or fripseai.com. Do not claim acceptance, sponsorship, or a formal partnership. Those are not in the repos.

## Founder

- Name: Dustin Crump.
- Founder of Found For AI and of Fripse AI. The companies are sisters. They are not merged.
- Found For AI public position: help businesses become discoverable inside AI assistants. The site is https://foundforai.com. Public contact on the contact page includes info@foundforai.com. The footer lists support@foundforai.com and Salt Lake City, Utah. The contact page also says Cottonwood Heights, Utah.
- Fripse AI public position: AI business assessments and workflow automation for small businesses in Utah and remotely. The site is https://fripseai.com. The about page says the company is based in Utah. Published phone on the site schema: +1-801-790-0923. Form mail recipient in the worker: info@fripse.com.
- Teaching already described on the sites: Dustin has hosted local meetups helping small-business owners use ChatGPT. The community page says it has been a while since the last meetup. No attendance number is published. TODO: add a count only if a record exists.
- Fripse about page says 25+ years in IT, operations, and sales. TODO: if a biography needs employers, the founder should write that line. Do not copy employer names into public pages.

## Teaching experience on record

- Past local ChatGPT meetups. No dates, venues, or headcounts are in the repos. TODO.
- AI Visibility Workshop, Thursday, June 18, 2026, 10:30 to 11:30 AM MDT, Kiln, 1895 E Rodeo Walk Dr Suite B200, Holladay, UT 84117. Free. In person. Hosted by FoundForAI.
- Instructors named on the event: Dustin Crump, founder, and Brian Jolley, COO of Found For AI.
- Topics published for that workshop: how AI tools decide who to recommend, what AI crawlers read (including robots.txt, structured data, and server-rendered content), and a short list of website changes.
- Photos already on the site: `/events/june-2026-workshop-1.jpg`, `/events/june-2026-workshop-2.jpg`, `/events/june-2026-workshop-3.jpg`. Alt text is in `client/src/data/community.ts`. Do not rename people in those photos.

## Events

- Previous: the June 18, 2026 workshop above. It is not upcoming.
- Upcoming: none are seeded. TODO: add a real date in the dashboard before listing one.

## Case studies already published

- Grogan Vending, as already written on the community page: 48 vending machines, approximately two years in production as of November 2026, about three hours saved per day. Time savings are approximate and were reported by Dustin Crump. Do not expand this.
- Goldsberry Orthodontics: an MCP integration, described in the article at https://foundforai.com/blog/goldsberry-orthodontics-ai-actions. Do not rewrite that article here.

## Testimonials

None are approved for publishing. The public pages render no testimonial block until a record has both approval and publishing permission.

## Metrics

Do not type numbers here. Generate them from the store:

```bash
npm run community:impact
```

If the store has only the seeded past workshop, the summary should show that and zeros for registrations, attendance, and commercial records.

## Current program

- FoundForAI community page: past ChatGPT teaching, the June 2026 workshop, practical project examples, and a place for future workshops.
- Fripse AI community page: practical workshops on ChatGPT, automation, assessments, and team use, with a link to the existing assessment. It does not host a second assessment app.
- Shared registration and CRM live in the Found For AI app. Email delivery is off. TODO: provision Postgres (`DATABASE_URL`) and run `db/community/001_init.sql` before production writes will persist.
