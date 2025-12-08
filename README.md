# Reholife Leadership Training Platform

A modern, high-conversion Next.js application for leadership training services targeting church, school, college, and workplace clients.

## Features

- 🎨 Black & Gold brand palette
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 📝 WordPress Headless CMS integration for blogs
- 📧 Newsletter subscription with Brevo (free tier)
- 📬 Contact form with Web3Forms (free service)
- 🚀 Built with Next.js 14 App Router

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# WordPress Headless CMS
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2

# Web3Forms (Contact Form) - Get free key at https://web3forms.com
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key

# Brevo (Newsletter) - Get free API key at https://www.brevo.com
NEXT_PUBLIC_BREVO_API_KEY=your_brevo_api_key
```

### 2. WordPress Setup

1. Install WordPress on your hosting
2. Enable REST API (enabled by default)
3. Create blog posts in WordPress admin
4. Update `NEXT_PUBLIC_WORDPRESS_API_URL` with your WordPress URL

### 3. Web3Forms Setup (Contact Form)

1. Visit https://web3forms.com
2. Sign up for free (300 submissions/month)
3. Get your access key
4. Add to `.env.local` as `NEXT_PUBLIC_WEB3FORMS_KEY`

### 4. Brevo Setup (Newsletter)

1. Visit https://www.brevo.com
2. Sign up for free (300 emails/day)
3. Create a contact list
4. Get API key from Settings > API Keys
5. Add to `.env.local` as `NEXT_PUBLIC_BREVO_API_KEY`
6. Update list ID in `src/components/Newsletter.tsx` (line 23)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel:

```bash
vercel
```

Add environment variables in Vercel dashboard.

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui
- WordPress REST API
- Web3Forms
- Brevo API
"# reholife" 
