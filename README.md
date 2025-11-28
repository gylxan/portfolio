# portfolio

My portfolio website with Next.js, Tailwind CSS and [Sanity](https://sanity.io/) as CMS.

![Tests](https://github.com/gylxan/portfolio/actions/workflows/main.yml/badge.svg)

# Quick start

- Signup/Login to Sanity CMS (if not already)
- Create a Sanity Project
- Add required CORS & API settings in the project
- Install Sanity Integration in Vercel
- Add required `.env` variables for next and studio
- Deploy Sanity Studio - Content Manager
- Deploy to Vercel

Vercel will automatically build sanity and the next project.
Afterwards the sanity studio can be called like https://your-vercel-project/studio.

# Configuration

## Environment

Most parts of the portfolio can be configured by environment variables.
Create a `.env.local` file in the root of your project to configure.

The `.env` file can contain following configurations:

| Key name                       | Description                                 | Example                 |
| ------------------------------ | ------------------------------------------- | ----------------------- | --- | --- |
| NEXT_PUBLIC_URL                | URL the frontend is running on              | `http://localhost:3000` |
| NEXT_PUBLIC_SANITY_PROJECT_ID  | ID of your Sanity project                   | `5m2a40us`              |     |     |
| NEXT_PUBLIC_SANITY_DATASET     | Dataset to use for from your sanity project | `production`            |     |     |
| NEXT_PUBLIC_SANITY_API_VERSION | API version of Sanity to use                | `v2021-10-21`           |     |     |
| NEXT_PUBLIC_DEFAULT_LANGUAGE   | Default language for next                   | `en`                    |     |     |

## Colors

All colors can be changed in the `globals.css` for your own design.
We use three main colors for styling the elements (`--primary`, `--secondary(-ghost)` and `--tertiary`) and a color for the background (`--background`).

When you change the colors in the `globals.css` you have to adjust them in the `manifest.json`, too.

## Manifest

To customize the portfolio for your needs, you have to adjust the `manifest.json` and define your icons and colors there.
Check also the `_document.tsx` for your customizations.

## Sanity

Configure sanity like described [here](./studio/README.md).

# Start developing

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# Run linting and tests

Linting and tests can be run with

```bash
npm run lint
# or
yarn lint
```

and with

```bash
npm run test
# or
yarn test
```

# Building

The portfolio can be building by simply triggering

```bash
npm run build
# or
yarn build
```

Before building the portfolio, Sanity studio dependencies are installed, we build the studio and copy the output to `public/studio`.
Like this it can be accessed later via `https://NEXT_PUBLIC_URL/studio`.

After building the portfolio, we also create a sitemap for the portfolio with `next-sitemap`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
