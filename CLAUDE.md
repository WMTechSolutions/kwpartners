# KW Partners — Project Context

## Client
- **Organization:** Keller Williams Realty Partners (Woodstock & Canton, GA)
- **Live site to replace:** kwcherokee.com (Wix)
- **Wesley's role:** Agent Services Tech Trainer — building this as an internal project
- **Goal:** Replace Wix ($300–435/yr) with custom Next.js at $0/month

## Git & Deployment
- Separate project from wmtechsolutions
- Push command: `cd "C:\Users\ASTT\Documents\Claud Code\kwpartners" && git add . && git commit -m "..." && git push`
- Auto-deploy on Vercel on every push
- **Always auto-push after every change — no need to ask**

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Fonts:** Montserrat (headings) + Inter (body) via next/font/google
- **Styling:** Plain CSS in app/globals.css
- **Phase 2:** Clerk.dev (auth + member approval)
- **Phase 3:** Supabase (database) + Resend (email confirmations)
- **Forms:** Formspree (contact page — needs real ID added)

## Brand Colors
- KW Red: `#cc0000`
- Dark bg: `#1a1a1a`
- Gray bg: `#2d2d2d` / `#3d3d3d`
- White: `#ffffff`
- Muted text: `#aaaaaa`

## File Structure
```
app/
  layout.js              — root layout, Montserrat + Inter fonts
  globals.css            — all styles
  page.js                — Home (hero, events, quick actions, career banner)
  about/page.js          — Leadership team + ALC
  vendors/page.js        — Alliance partners + 10 vendor categories
  locations/page.js      — Woodstock & Canton offices
  contact/page.js        — Contact form (Formspree — needs real ID)
  portal/page.js         — Stub (Phase 2 replaces this)
  admin/                 — Stub (Phase 4)
  components/
    Navbar.js            — client component
    Footer.js            — server component
public/                  — place KW logo here as logo.png
```

## Build Phases
- **Phase 1** ✅ Public site (Home, About, Vendors, Locations, Contact)
- **Phase 2** 🔲 Auth (Clerk.dev) + Agent Portal + Member approval queue
- **Phase 3** 🔲 Conference room booking + Supabase + Resend email confirmations
- **Phase 4** 🔲 Admin panel (approve members, manage bookings, vendors, files, videos)

## Conference Rooms (Phase 3)
- **Rooms:** The Deb, Back Conference Room, Small Training Room
- **Hours:** 6:00 AM – 8:00 PM, Monday–Friday
- **Slots:** 1-hour blocks
- **Same-day booking:** Allowed
- **Confirmation email:** Yes — via Resend
- **Admin can add more rooms** via admin panel

## Agent Portal Sections (Phase 2)
From screenshots of current Wix portal:
- Welcome hero + "Just Getting Started" CTA + Conference Rooms button
- Resource Links (button grid: FAQs, KWRP Forms, Leadership Team, ALC, Agent Roster, Training Calendar, KW Command, My KW, Opportunity Agent, BULK Mail)
- Marketing & Advertising (docs/files from Google Drive links)
- Coaching (resources for PC and MAPS coaching)
- Video Library (YouTube embeds — categories: Compliance Tips, Team Meetings, Classes)
- Register for Opportunity Agent (external links)

## Staff Admin Needs (Phase 4)
1. Approve / deny new agent registrations
2. Book conference rooms on behalf of agents
3. Add / remove vendors by category
4. Add / remove / edit resource links and video links in portal

## Key External Links
- Property Search: https://kwcherokee.kw.com/search
- OH Dibs: https://ohdibs.com

## Contact Info
- Woodstock: 678-494-0644 · Frontdesk406@kw.com · 722 Stonecroft Lane, Woodstock GA 30188
- Canton: 678-493-2100 · frontdesk@kwcanton.com · 149 Reinhardt College Pkwy Ste 3, Canton GA 30114
- Hours: Mon–Fri 9:00 AM – 5:00 PM
