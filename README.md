# The Horse Sale at Rancho Rio — Standalone Site

A bold, standalone site for The Horse Sale at Rancho Rio, pulled out of RanchoRioAZ.com so the sale has its own identity in the market.

## What's built

- **`index.html`** — Homepage: hero, sale stats, positioning ("we set the standard"), 2026 schedule, high-seller highlights, consignor CTA, Tito's sponsor mention
- **`results.html`** — Full sale results table, 2016–2024 (real historical data), notable high sellers
- **`consignors.html`** — Nomination window, fees, requirements, deadlines (real content, pulled from current site)
- **`sale-horses.html`** — 2026 lot catalog, scaffolded with a reusable lot-card template — placeholder until real lots are finalized
- **`terms.html`** — Stub, ready for the full legal Terms & Conditions text
- **`contact.html`** — Basic contact info
- **`css/styles.css`** — The full design system (colors, type, components) — one file, no build step

## Design system

- **Colors:** Ink black `#0B0B0C`, bone white `#F5F0E6`, signal red `#C8102E`, saddle rust `#7A3B2E` — red/white/black as requested, with rust as a quiet third tone so red doesn't fight itself everywhere.
- **Type:** Fraunces (bold display serif, headlines/lot numbers), Barlow Condensed (nav/labels/auction-catalog feel), Barlow (body copy). Loaded via Google Fonts CDN — no local font files needed.
- **Signature element:** the auction "lot tag" shape and a "SOLD" stamp treatment — leans into the real numbered-lot structure of a horse sale rather than decoration for its own sake.

## What's placeholder right now

1. **Photos** — Some slots still show a styled "add photo" placeholder pattern. Real sale photography (`assets/images/photography/`) is wired into the homepage hero, mosaic, and two high-seller cards; the rest will fill in as more imagery comes in.
2. **2026 lot catalog** — `sale-horses.html` has 3 template lot cards. Once you have the finalized 65-horse lineup, I can generate all lot cards from a simple list/spreadsheet you give me (name, sire/dam, year, color, sex, consignor, photo).
3. **Terms & Conditions** — `terms.html` has a warranty summary but needs the full legal text from the current site.
4. **Tito's Handmade Vodka** — homepage has a simple sponsor callout section; happy to build this out more (logo lockup, dedicated sponsor page, etc.) once you share brand assets/guidelines from Tito's.

## Logo

Real logo files live in `assets/logo/`: `TheHorseSale_RanchoRio_LOGO_1C_2023.png` (single color), `..._Black-Red_2023.png` (light backgrounds), `..._White-Red_2023.png` (dark backgrounds) — the full lockup with "THE HORSE SALE" wordmark and "Rancho Rio" script. `rancho-rio-mark.png` is a cropped version of just the red "R~" mark (works on any background since it has no black/white elements), used in the compact header/footer nav slot. The full lockups aren't used anywhere yet — good candidates for a more spacious spot if one comes up.

## Next steps (matching your usual workflow)

1. **Review locally** — open `index.html` in a browser to see the current state.
2. **Upload real assets** — logo + photos, and I'll wire them in.
3. **GitHub** — create a repo (e.g. `idlewild-creative/rancho-rio-horse-sale`) and push this project.
4. **Netlify** — connect the repo, set Publish Directory to the project root (no build command needed — it's plain HTML/CSS/JS).
5. **DNS** — once you've got a domain picked for the standalone site, we'll set up the A record + CNAME at your registrar, same pattern as the Arizona Horse Lovers Park build.

## Notes

- Content on `results.html` and `consignors.html` was pulled directly from the current RanchoRioAZ.com horse sale pages (sale history, consignor terms, fees) as a starting point — verify figures/dates before this goes live in case anything's changed for 2026.
- No JS framework, no build step — same static stack as the NexGen project. Easy for you to hand-edit text directly in the HTML files if needed.
