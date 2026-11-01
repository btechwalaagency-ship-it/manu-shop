# Photographs

Drop photos in here and the site picks them up automatically. No HTML changes.

## Filenames — these exact names

| File | Where it appears |
|---|---|
| `phone-repair.jpg` | Phone Repair card + that page's hero |
| `computer-laptop-repair.jpg` | Laptop & Computer Repair |
| `data-recovery.jpg` | Data Recovery |
| `virus-malware-removal.jpg` | Virus & Malware Removal |
| `device-sales.jpg` | Device Sales |
| `gaming-pc-setup.jpg` | Gaming PC Builds & Setup |
| `cctv-installation.jpg` | CCTV Installation & Service |

## How it works

Each illustration carries a `data-photo` attribute pointing at its slot here.
`assets/site.js` quietly tests whether the photo loads. If it does, it replaces the
illustration. If the file isn't there, the illustration stays.

So you can add photos **one at a time** — a missing photo never breaks anything, it just
keeps the drawing. No partial state, no broken image icons.

## Specs

- **1600×900** (16:9). They display around 400–760px wide, so this covers retina.
- **JPEG**, quality 80, aim for under 200 KB each. Compress at squoosh.app or tinyjpg.com.
- Crop so the subject sits centre — the cards crop to 16:9 and the edges get trimmed.

## Where to get them

**Best: Manu's own photos.** A real shot of Kiosk 3, the bench, a phone mid-repair, a
finished CCTV install. For a local business these beat stock every time, because
customers recognise the place and it proves the business is real. A modern phone camera
in good light is plenty.

**Otherwise: licensed stock.** Unsplash and Pexels are free for commercial use with no
attribution required. Search terms that work:

| File | Search |
|---|---|
| `phone-repair` | "phone repair technician", "smartphone screen replacement" |
| `computer-laptop-repair` | "laptop repair motherboard", "computer technician screwdriver" |
| `data-recovery` | "hard drive platter", "hard disk repair" |
| `virus-malware-removal` | "cyber security laptop", "computer security screen" |
| `device-sales` | "laptops retail display", "smartphone store shelf" |
| `gaming-pc-setup` | "gaming pc rgb build", "custom pc interior" |
| `cctv-installation` | "security camera installation", "cctv camera wall mount" |

**Save the licence terms and download date for each one** in this folder — if the
licensing is ever queried, that record is what you need.

## Two cautions

**Stock people are not Manu's staff.** The image licence may be fine, but presenting a
stock model in a way that implies they work at the kiosk can be misleading conduct under
the Australian Consumer Law. Prefer photos of hands, tools and devices over photos of
faces.

**Never use Google Images.** It's a search index, not a source. Everything in it is
owned by someone.

See the copyright section in the root `README.md` for the full position.

## One thing you'll see in the browser console

Until a photo exists, its probe request 404s, so the dev-tools console shows up to seven
404s for files in this folder. **That is the fallback working, not a bug** — the probe
failing is exactly what keeps the illustration in place. Each 404 disappears as you add
that photo.
