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

**Images must be licensed.** The site ships with no photographs, only CSS and SVG.
Don't pull photos from Google Images. Use Manu's own photos of the kiosk and his work,
or properly licensed stock.

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
