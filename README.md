Heritage Wash Plus web app built with [Next.js](https://nextjs.org) (App Router), **TypeScript**, **Tailwind CSS v4**, and Turbopack. Scaffolded via `create-next-app`.

## Getting Started

First, install dependencies (already done if you just created the app) then run the development server:

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file. A reusable Tailwind powered `Hero` component lives in `app/components/Hero.tsx`.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```
app/
	components/        Reusable UI components (Hero, etc.)
	layout.tsx         Root layout
	page.tsx           Home page
public/              Static assets
app/globals.css      Tailwind + design tokens (colors, fonts)
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Styling

Tailwind v4 design tokens are defined inline inside `globals.css` under `@theme inline`. Brand shades: `brand-50 ... brand-900`. Use with classes like `bg-brand-500` or `text-brand-700`.

## Type Checking & Linting

```powershell
npm run lint
npm run build   # also performs type checking
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
