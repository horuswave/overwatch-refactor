# Overwatch Website

Modern bilingual marketing website for Overwatch — Mozambique's AI-powered virtual guarding and remote monitoring service.

## Tech Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS v4**
- **next-intl** — English (`/en`) and Portuguese (`/pt`) with locale-prefixed routing
- **Framer Motion** — subtle animations
- **Resend** — contact form email delivery

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en`.

## Environment Variables

Create a `.env.local` file:

```env
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_EMAIL=Overwatch <noreply@overwatchmoz.com>
CONTACT_EMAIL=info@overwatchmoz.com
```

Without `RESEND_API_KEY`, form submissions are logged to the console (useful for local development).

## Pages

| Route | Description |
|-------|-------------|
| `/en`, `/pt` | Home |
| `/en/business`, `/pt/business` | B2B solutions |
| `/en/homes`, `/pt/homes` | Residential solutions |
| `/en/about`, `/pt/about` | How it works |
| `/en/faq`, `/pt/faq` | FAQ |
| `/en/contact`, `/pt/contact` | Contact form |

## Build

```bash
npm run build
npm start
```

## Brand

- Primary: `#0A1428`
- Accent: `#00E5FF`
- Tagline EN: *Your Virtual Guard, Powered by AI*
- Tagline PT: *O Seu Guarda Virtual, com Inteligência Artificial*
