# Infyro Inc. — website

Marketing site for **Infyro Inc.** and its three companies: Infyro Technologies, Infyro Studios and Infyro Construction.
React 18 (Vite) · Tailwind CSS · Framer Motion · React Router · lucide-react.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the build locally
```

## Routes

| Route | Page |
|---|---|
| `/` | Infyro Inc. — interactive logo hero, companies, about, vision & mission, values, why Infyro, contact |
| `/technologies` | About · six pillars · academic training · corporate training · careers · contact |
| `/technologies/internships` | Internship intro, **Apply Now** (Google Form) and enquiry |
| `/studios` | About · services · booking (email) · contact |
| `/construction` | About · services · booking (email) · contact |
| `*` | 404 |

Old URLs `/technologies/academic-training`, `/corporate-training`, `/careers`, `/contact` redirect to the matching section
(`?type=` is kept, so `/technologies?type=corporate#contact` pre-selects the enquiry type).

## Where things live

```
src/
├─ data/         all copy and links — edit these, not the JSX
│  ├─ contact.js    phone, email, address, per-company social profiles, form endpoint
│  ├─ links.js      internship application Google Form
│  ├─ footer.js  navigation.js  seo.js  brands.js
│  └─ inc.js  tech.js  studios.js  construction.js   page content
├─ components/   brand (logo mark) · precision (design motifs) · hero · company (page template)
│                layout (navbar, switcher, transitions) · footer · forms · ui · motion
├─ pages/        Home, technologies/{Overview,Internships}, Studios, Construction, NotFound
└─ styles/index.css   design tokens and type scale
public/          favicon.svg + PNG icons, site.webmanifest, robots.txt, sitemap.xml
```

## Contact details & forms

- Phone **+91 84389 38918**, email **info@infyroinc.com**, location **Tiruchirappalli, Tamil Nadu, India** — all in `src/data/contact.js`.
- Social profiles are per company (`SOCIAL_BY_BRAND` in `contact.js`); a missing profile is simply hidden.
- Studios and Construction **booking buttons** open an email to info@infyroinc.com.
- The three **enquiry forms** POST JSON to [FormSubmit](https://formsubmit.co) (`src/components/forms/submit.js`) and include a hidden spam honeypot.
  **One-time setup:** FormSubmit emails an *Activate Form* link to info@infyroinc.com on the first submission — click it once.
  To use another service (Web3Forms, Formspree, …) set `VITE_FORM_ENDPOINT` or replace `submitEnquiry()`.

## Deploy on Vercel

1. Push to GitHub, then import the repo in Vercel (framework preset **Vite**, build `npm run build`, output `dist`).
2. Optional: set `VITE_FORM_ENDPOINT` (see `.env.example`).
3. `vercel.json` rewrites every route to `index.html`, so refreshing any page works. (`netlify.toml` / `public/_redirects` do the same on Netlify.)
4. After deploying: submit one test enquiry and activate FormSubmit (see above).

## Still to supply

Real photography for Studios and Construction (those pages use designed visuals until then — set `image` in `src/data/studios.js` / `construction.js`),
legal pages (Privacy, Terms, …), internship programme details (shared on request), an X/Twitter profile, and group-level (Infyro Inc.) social accounts — the group currently shows the Technologies profiles.
Search the code for `TODO` for the full list.
