# kwcherokee.com Wix Replacement — Punchlist

Merged from the earlier scoping (CLAUDE.md) and a 2026-10-22 audit of the live site and the Wix dashboard (KWRP site, Premium).

**Wix footprint:** 17 apps, 842 contacts, 285 site members, 18 upcoming events, 8 booking services, 1 pricing plan, 1 custom automation, 2 blog posts.

Legend: ✅ done · 🔲 to do · ❓ needs a decision · 🆕 not in the earlier scope

## Build status (code written, not yet run against live services)
Everything below except payments is coded and `npm run build` passes with no keys set. Not yet exercised end-to-end because it needs a Clerk app, a Supabase project (run `supabase/schema.sql`) and a Resend domain; see `.env.local.example`.
- **Built:** Clerk sign-in/up + approval gate, Agent Portal (DB-driven links/videos), events + RSVP + calendar, conference-room booking (6 rooms, double-booking prevented by a DB unique index), contact form to DB + email, admin panel (members, events + recurring + RSVP CSV, rooms + book on behalf, portal content, submissions).
- **Not built yet:** vendors/leadership editing, site search, Wix data import, redirects, SEO, blog, payments, real portal content (links/videos must be entered in admin), 301 redirects.

## Phase 1 — Public site ✅
- ✅ Home, About (leadership + ALC), Vendors, Locations, Contact
- 🔲 Replace hardcoded events on the home page with real data (Phase 3 Events)
- 🔲 Real Formspree ID, or replace with own form handling (see Forms)
- 🔲 KW logo in `public/logo.png`
- 🔲 SEO metadata and sitemap, and 301 redirects from old Wix URLs (`/about-us`, `/our-vendors`, `/agent-portal`, `/event-details-registration/*`, `/calendar`, `/servicemenu`, `/conference-rooms`, ...)

## Phase 2 — Auth + Agent Portal
- 🔲 Clerk sign-in / sign-up, `/pending-approval` screen
- 🔲 Member approval queue (approve/deny)
- 🔲 🆕 Import the 285 existing Wix members/contacts (Contacts → Import/Export CSV)
- 🔲 Gate `/portal/*` by approved status
- 🔲 Portal sections (all member-only on Wix):
  - Just Getting Started
  - Conference Rooms (links to Phase 3 booking)
  - OH Dibs (https://kwcherokee.ohdibs.com/)
  - Opportunity Agent: register + info + video doc. On Wix this is a $0 one-month Pricing Plan used as an access gate; replace with a simple "requested access" flag or a form
  - Resource Links, Coaching, Marketing & Advertising, Video Library
  - 🆕 Services menu (`/servicemenu`), Transaction Coordination Services
- ✅ Decision: email + admin approval for launch. KW Command SSO is a later nice-to-have; likely needs KW to grant partner/API access (unverified), so ask KW before planning on it. Clerk can add an external provider later.
- ❓ Are the Wix member screens (Orders, Wallet, Subscriptions, Addresses) used by anyone? Assumed no; skip.

## Phase 3 — Events + Booking + Email
### 🆕 Events (largest gap in the earlier scope)
- 🔲 Events table: title, description, image, start/end, location, Zoom URL, capacity, category
- 🔲 Recurring events (Wix "Multiple dates": Contracts Unveiled, Begin Your Career, Market Center Orientation)
- 🔲 Public list, detail page `/events/[slug]`, and full calendar page (month view)
- 🔲 Free RSVP with guest count, RSVP confirmation email, and RSVP list per event
- 🔲 Home page "Upcoming Events" fed from the table
- 🔲 Import the 18 current events from Wix
### Conference room booking
- Rooms on Wix: Front Conference Room, The Small Training Room, Back Conference Room, Conference Room A Canton, Conference Room B Canton plus The Deb (6 rooms total)
- 🔲 Hours 6 AM – 8 PM Mon–Fri, 1-hour slots, same-day allowed (per earlier scope)
- 🔲 Conflict checking, my-bookings page, cancel, admin can book on behalf of an agent
- 🔲 Booking confirmation + cancellation email (Resend)
- 🔲 Calendar view for staff
- ✅ Canton rooms use the same hours as Woodstock.
- ✅ Transaction Coordination Services is a real appointment-style booking. The Deb is a conference room reservation (Wix schedule was used to show available times), so it is a sixth room.
### Forms 🆕
- 🔲 Agent interest form (→ misty@kwcherokee.com) and Homeowner form (→ Frontdesk406@kw.com)
- 🔲 Capper Luncheon form (2 versions on Wix, check if still used)
- 🔲 Store submissions in Supabase, send notification, and send the visitor a thank-you email (replaces the one Wix automation, "Thank visitors who submit a form")
### Data / email
- 🔲 Supabase schema: members, events, rsvps, rooms, bookings, vendors, resources, videos, form_submissions
- 🔲 Resend domain verified for kwcherokee.com (SPF/DKIM)
- 🔲 🆕 Contacts: keep as the members + rsvps + submissions tables; import the 842 Wix contacts only if still needed
- 🔲 🆕 Site search (Postgres full-text or Algolia) to replace Wix Site Search

## Phase 4 — Admin panel
- 🔲 Approve / deny agents
- 🔲 Manage events (create, edit, recurrence, view RSVPs, export CSV)
- 🔲 Manage rooms and bookings (book on behalf, cancel)
- 🔲 Vendors by category; leadership/ALC bios
- 🔲 Resource links, video library, marketing documents
- 🔲 🆕 Edit simple page text (About, Locations) without code
- 🔲 🆕 Roles: admin vs staff

## Later — Payments 🆕
- 🔲 Paid in-office events: ticket price on events, checkout, receipts, refunds. Stripe Checkout is the likely fit
- 🔲 Admin view of paid RSVPs and payouts
- ✅ Today the office uses Wix Payments (Wix's built-in processor). It disappears with the Wix plan, so a new processor account must be set up before cutover if paid events continue.
- ✅ Susan Mortimer (Market Center Administrator) will set up the payment processor account and payout bank details. Payments are deferred; build everything else first.

## Low priority / optional
- Blog: 2 posts from 2024 (what's new with KW websites, KW Command). Port as static pages or drop
- Pro Gallery: only if galleries are actually used
- Zoom integration: paste meeting links manually at first
- Analytics: Vercel Analytics or Plausible
- Not in use on Wix, so skipped: store, POS, invoices, gift cards, coupons, loyalty, community, email marketing, ads, mobile app, AI agents

## Cutover
- 🔲 Content freeze + final Wix data export (members, events, contacts)
- 🔲 DNS move for kwcherokee.com to Vercel, email (MX) unaffected: confirm no Wix-hosted mailboxes first
- 🔲 301 redirects live, then cancel the Wix Premium plan (check renewal date)
- ✅ Wix plan costs $468/yr. Renews May 1, 2027, so the cutover must be done before then.
