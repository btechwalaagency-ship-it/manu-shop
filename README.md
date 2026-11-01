# MM Repair Master — website

Website for **MM Repair Master**, a phone, laptop and computer repair kiosk at
The Spring Shopping Centre, Beechboro WA.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no server code —
it deploys to GitHub Pages, Cloudflare Pages or any Australian host as-is.

## Business details baked into the site

| | |
|---|---|
| Name | MM Repair Master |
| Address | Kiosk 3, The Spring Shopping Centre, Beechboro WA 6063 |
| Phone | 0470 282 957 (`tel:+61470282957`) |
| Email | mmrepairmaster@gmail.com |
| Instagram | [@mm.repair.master](https://www.instagram.com/mm.repair.master/) |

Taken from the business card and logo supplied by the client.

## Pages

| File | What it is |
|---|---|
| `index.html` | Homepage — hero, seven service cards, process, why-us, FAQ, CTA. |
| `services.html` | Services hub. |
| `services/*.html` | One page per service, each with its own meta tags and `Service` + `FAQPage` + `BreadcrumbList` structured data. |
| `about.html` | About the business, how it works, business details. |
| `contact.html` | Enquiry form, phone/email/address/Instagram, hours, map slot. |
| `404.html` | Not-found page. |
| `assets/style.css` | Shared stylesheet. Light and dark mode. Palette taken from the logo. |
| `assets/site.js` | Mobile nav, scroll reveal, current-page highlighting. |
| `assets/logo-original.jpg` | The supplied logo mockup. **Needs replacing** — see below. |
| `robots.txt`, `sitemap.xml` | Search engine files. |

## Services

Seven, taken from the business card:

1. Phone Repair
2. Laptop & Computer Repair
3. Data Recovery
4. Virus & Malware Removal
5. Device Sales
6. Gaming PC Builds & Setup
7. CCTV Installation & Service

All copy is original, written for this site.

## What's filled in, and what still needs Manu

Everything from the business card is on the site: name, tagline, the
`SALES · REPAIR · DATA RECOVERY` line, phone, email, Instagram handle, the kiosk
address, and all the services from the card's "What We Offer" panel.

**Trading hours** are set to the standard Perth metro retail pattern:

| | |
|---|---|
| Mon–Wed, Fri | 9:00am – 5:30pm |
| Thursday | 9:00am – 9:00pm (late night) |
| Saturday | 9:00am – 5:00pm |
| Sunday | 11:00am – 5:00pm |

These are **an assumption based on typical centre trading, not confirmed with Manu.**
Check them against The Spring Shopping Centre's actual hours. They appear in two
places — the table in `contact.html` and the `openingHoursSpecification` block in the
homepage JSON-LD. Update both.

**ABN — deliberately left off.** I did not put a made-up ABN on the site. ABNs are
publicly checkable on ABN Lookup, so a fake one on a real trading business is a
misrepresentation rather than filler. Having no ABN on the page is fine; having a wrong
one is not. Add Manu's real ABN to the footer and the About page when you have it — and
you'll need it anyway to register a `.com.au` domain.

**No reviews.** Deliberately absent rather than invented. Fake testimonials breach the
Australian Consumer Law and the ACCC pursues them. Add a section once there are real
Google reviews.

**Still outstanding:**

| What | Where | Notes |
|---|---|---|
| ABN | footer, `about.html` | See above |
| Confirm trading hours | `contact.html` + homepage JSON-LD | See above |
| Confirm WhatsApp number | `fabs()` block | Link is `wa.me/61470282957`, built from the card's mobile — confirm it's on WhatsApp |
| Domain | canonical URLs, `sitemap.xml` | Currently `https://mmrepairmaster.com.au` — **confirm it's registered**; find-and-replace if different |
| Form backend | `contact.html` | Works right now via mailto fallback — see below |
| Photos | — | No photographs anywhere; see below |

### The contact form already works

The form posts to `[YOUR-FORM-ID]`, which is not a real endpoint. Rather than leaving it
broken, `assets/site.js` detects the unconfigured endpoint and falls back to opening the
visitor's mail client with the enquiry pre-filled to mmrepairmaster@gmail.com. So the
form works from day one.

To collect submissions properly instead: sign up at [Formspree](https://formspree.io),
create a form, and replace `[YOUR-FORM-ID]` in `contact.html` with its ID. The fallback
switches itself off automatically once a real endpoint is in place.

### The map works

`contact.html` embeds a Google Map pointed at The Spring Shopping Centre, Beechboro. It
needs no API key. It will look blank in a local preview with no internet, but loads
normally for real visitors.

### Logo

`assets/logo.png`, `assets/icon.png`, `assets/favicon-32.png` and `assets/og-image.png`
were all cut from the logo mockup supplied by the client. The mockup was a JPEG on a
grey background, so the background was keyed out to make it transparent. It is clean at
the sizes used here, but **if Manu has the original vector or transparent PNG, use that
instead** — it will be sharper on large screens.

The logo appears as the emblem in the header, the full logo in the footer, the browser
favicon, and the social share image.

### Photos

The site ships with no photographs at all — only the logo and CSS/SVG graphics. Real
photos of the kiosk, repairs in progress and finished CCTV installs would lift it
considerably. Don't pull images from Google Images or from the reference site the client
supplied; use Manu's own, or properly licensed stock.

## 🖼 Adding photographs

The site has **no photographs** — the service cards use illustrations drawn for this
project. Stock photo sources were unreachable from the build environment, so rather than
guess at image URLs that might not resolve, the site was built to take photos the moment
they exist.

**Drop a JPEG into `assets/photos/` with the right filename and it appears.** No HTML or
CSS changes. A missing photo is not an error — the illustration just stays, so you can
add them one at a time.

| File to add | Replaces the illustration on |
|---|---|
| `assets/photos/phone-repair.jpg` | Phone Repair |
| `assets/photos/computer-laptop-repair.jpg` | Laptop & Computer Repair |
| `assets/photos/data-recovery.jpg` | Data Recovery |
| `assets/photos/virus-malware-removal.jpg` | Virus & Malware Removal |
| `assets/photos/device-sales.jpg` | Device Sales |
| `assets/photos/gaming-pc-setup.jpg` | Gaming PC Builds & Setup |
| `assets/photos/cctv-installation.jpg` | CCTV Installation & Service |

**1600×900, JPEG, under ~200 KB each.** Full specs, search terms and the licensing
cautions are in `assets/photos/README.md`.

Each illustration carries a `data-photo` attribute; `assets/site.js` tests whether that
photo loads and swaps it in only on success. That is why nothing ever renders broken.

**Manu's own photos are worth more than stock here.** A real shot of Kiosk 3, the bench,
a phone mid-repair — customers recognise the place, and it proves the business exists. A
phone camera in decent light is enough. Prefer hands, tools and devices over faces:
stock photos of people carry model-release requirements, and implying a stock model
works at the kiosk can be misleading conduct under the Australian Consumer Law.

## 🎨 Colour — "Amber"

Deep teal-navy structure with a **gold call button**. Chosen for contrast: dark ink on
gold measures **10.15:1**, which makes the Call button the loudest element on every page.
For a repair shop whose customers are mostly phoning or walking in, that button is the
whole conversion path.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--accent` | `#ffb020` | `#ffb020` | Gold. **Fills only** — buttons, call bar, call FAB. |
| `--accent-ink` | `#1a1203` | `#1a1203` | Text *on* gold. 10.15:1. |
| `--accent-text` | `#8a5a00` | `#ffc451` | Gold *text* on page backgrounds. |
| `--brand` | `#0b6c86` | `#45b9da` | Deep teal. Structure, card icons, numbered steps. |
| `--navy` | `#06181f` | `#040f14` | Hero, footer, CTA bands. |
| `--bg` | `#ffffff` | `#081a21` | Page background. |

**Both light and dark are built**, switching automatically with the visitor's device
setting via `prefers-color-scheme`. `data-theme="light"` or `data-theme="dark"` on
`<html>` forces one if you ever need to.

### Two rules to keep

**Gold means "you can click this."** Teal carries structure and the illustrations; gold
only ever appears on actions. The moment gold goes decorative, the Call button stops
standing out.

**Everything is measured, not eyeballed.** Current state: **0 failures across 12
pairings in light mode and 12 in dark.** If you change a colour, re-check it — any
contrast checker works, WebAIM's is the usual one. Text needs 4.5:1 (3:1 at 18.66px bold
or 24px regular and above); icons and borders need 3:1.

This matters commercially as well as legally: much of the audience is reading
one-handed on a phone in a shopping centre, and under the *Disability Discrimination
Act 1992* the accessibility of a public-facing service is a real consideration.

### A note on the logo

Manu's logo is blue and orange, which is close to but not identical to the site's teal
and gold. It reads as a deliberate family rather than a clash, and the logo is his
identity so it was left untouched. If he ever has it redrawn, teal and gold would tie
it together completely.

### Illustrations follow the palette

`assets/img/*.svg` and `assets/og-image.png` were regenerated in teal and gold to match.
If you change the palette again, regenerate them too or they'll fight the page.

## 📷 Copyright &mdash; what's on this site and where it came from

Not legal advice. But this is the asset register, so the provenance of everything is
traceable if it's ever questioned.

| Asset | Source | Licence position |
|---|---|---|
| All page copy | Written for this site | Original work. Nothing copied. |
| `assets/img/*.svg` (7 service illustrations) | Drawn for this site | Original work. No third-party rights. |
| `assets/logo.png`, `icon.png`, `favicon-32.png` | Cut from the logo mockup the client supplied | Manu's logo &mdash; see the caveat below |
| `assets/og-image.png` | Composed from that logo | As above |
| Inter, Barlow (fonts) | Google Fonts | SIL Open Font License &mdash; commercial use and embedding permitted |
| Google Map on `contact.html` | Standard Google Maps embed | Permitted under the Google Maps terms when used as a standard embed |
| **Photographs** | **None on the site** | Nothing to clear |

### Why there are no photos

Stock photo sources were unreachable from the build environment, so rather than guess at
image URLs, the service cards use illustrations drawn specifically for this site. That
sidesteps the licensing question entirely.

### If you add photos later

Under the **Copyright Act 1968 (Cth)** copyright is automatic the moment an image is
created &mdash; there's no registration step in Australia, and no copyright notice is
needed for protection to exist. So an image having no watermark, no credit and no
copyright symbol tells you nothing about whether you can use it.

**Australia does not have "fair use."** That's a United States doctrine. Australia has
narrower **fair dealing** exceptions &mdash; research or study, criticism or review,
parody or satire, reporting news, and professional legal advice. Decorating a commercial
website fits none of them. Remedies for infringement include injunctions and damages or
an account of profits, with additional damages available where the infringement was
flagrant.

So every image must be one of:

1. **Taken by or for Manu** &mdash; best option. Real photos of the kiosk, the bench and
   finished CCTV installs will outperform stock for a local business anyway, because
   customers recognise the place.
2. **Properly licensed stock.** Unsplash and Pexels both allow free commercial use
   without attribution. **Save the licence terms and download date for each image** in a
   folder alongside the repo &mdash; if it's ever queried, that record is what you need.
3. **Paid stock** (Adobe Stock, Shutterstock, iStock) under the licence you bought.

Three traps worth knowing:

- **Identifiable people.** Most stock licences require a model release for commercial
  use. Separately, using a stock photo of a "technician" in a way that implies they're
  Manu's staff can be misleading conduct under the Australian Consumer Law, even where
  the image licence is fine.
- **Google Images is not a source.** It's a search index. Images found there are owned
  by somebody.
- **Photographing the centre.** The Spring Shopping Centre's management may restrict
  commercial photography on the premises. Ask before a shoot.

### The logo &mdash; confirm ownership

The logo was supplied by the client, and the site uses it on that basis. Worth
confirming with Manu that **he owns it**: if a designer created it, copyright usually
stays with the designer unless there's a written assignment. If it came from an AI
generator, check that tool's terms for commercial use.

Also note **moral rights** (Part IX of the Copyright Act) &mdash; a creator's right to
attribution and to the integrity of their work stays with them even after copyright is
assigned, and can't be transferred, only consented to.

### The reference site

The client supplied an existing IT company's website as a layout reference. It was used
for **structure and service mix only**. None of its wording, images or code appear here,
and the generated output was scanned to confirm no trace of that business remains.

Copyright protects the *expression* of an idea, not the idea itself &mdash; so a general
layout approach isn't protected, but the specific text, photographs and code on another
site are. Keep it that way if you edit this later.

## ⚖️ Legal checklist — Western Australia

Not legal advice. Have Manu confirm what applies.

**CCTV installation is a licensed activity in WA.** The *Security and Related Activities
(Control) Act 1996* regulates security installers. Advertising CCTV installation without
the right licence is a real risk. **Confirm Manu is licensed before publishing the CCTV
page** — and if he is, display the licence number on it. It's both a compliance point
and a strong trust signal. If he isn't licensed, remove `services/cctv-installation.html`
and its links from `index.html`, `services.html` and `sitemap.xml`.

**No invented reviews.** There's deliberately no testimonials section. Fake reviews
breach the Australian Consumer Law and the ACCC pursues them. Add one only with real,
attributable Google reviews.

**Claims must be accurate** (ACL s18, misleading or deceptive conduct). The copy is
deliberately hedged — "most repairs", "usually", "in most cases". Don't harden it to
"guaranteed same day" unless that is genuinely always true.

**Prices must be GST-inclusive** and shown as a single total price. No prices are on the
site yet; keep this in mind if you add them.

**Privacy.** The contact form collects personal information. Businesses under $3M
turnover are generally exempt from the *Privacy Act 1988*, but a short privacy policy is
good practice and some form providers require one. Worth adding `privacy.html` and
linking it from the footer. The Privacy Act has been under reform — check current
obligations.

**Fonts.** Inter and Barlow, loaded from Google Fonts — open-source, fine commercially.

**ABN/ACN.** The ABN belongs in the footer. If the business is a company, the ACN must
appear too.

## Contact form

Posts to [Formspree](https://formspree.io) — free at low volume and works on static
hosts, which can't run server code.

1. Sign up at formspree.io using mmrepairmaster@gmail.com
2. Create a form and copy its endpoint (`https://formspree.io/f/abcdwxyz`)
3. Replace `[YOUR-FORM-ID]` in `contact.html`

## Running it locally

```bash
python3 -m http.server 8000
```

## Publishing

The site is static, so it runs anywhere with no code changes.

**GitHub Pages** — Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
Add the domain under Custom domain, add a `CNAME` file containing it, and point DNS
at GitHub Pages.

**Cloudflare Pages** — free, deploys from this repo, served from Australian edge
locations (Sydney, Melbourne, Brisbane, Perth, Adelaide). Good choice given the
customers are all in Perth.

**Australian-hosted** — an AU cPanel host (FTP the folder up), or AWS S3 + CloudFront
with the Sydney `ap-southeast-2` region as origin.

Note: a `.com.au` domain requires Australian *presence* (ABN), not Australian *hosting*.
Server location is at most a very weak search signal — the `.com.au` domain and a Google
Business Profile do the geo-targeting work.

## SEO in place

- Unique title and meta description per page, targeting service + Beechboro/Perth
- Canonical URLs, `robots` meta, `robots.txt`, `sitemap.xml`
- `LocalBusiness` structured data with address, hours and all seven services
- `Service`, `FAQPage` and `BreadcrumbList` structured data on every service page
- Open Graph and Twitter Card tags
- Semantic HTML, one `h1` per page, skip link, 48px minimum tap targets
- Sticky call bar on mobile — the main conversion path for a repair shop

**Biggest remaining win:** claim and complete the **Google Business Profile** for
Kiosk 3, The Spring Shopping Centre. For a local repair business that outweighs
everything on the site itself. Make sure the name, address and phone match this site
exactly.

## Still to do

- Real photos of the kiosk, repairs in progress, and completed CCTV installs
- Transparent logo file
- Reviews section, once there are real Google reviews
- A prices page, if Manu wants one (GST-inclusive)
