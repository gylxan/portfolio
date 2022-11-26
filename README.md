# portfolio

My portfolio website with Next.js and Tailwind CSS.

![Tests](https://github.com/gylxan/portfolio/actions/workflows/main.yml/badge.svg)

# Configuration

## Environment
Most parts of the portfolio can be configured by environment variables.
Create a `.env.local` file in the root of your project to configure.

The `.env` file can contain following configurations:

| Key name                      | Description                                                                                                                                            | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| NEXT_PUBLIC_NAME              | Your full name                                                                                                                                         | `Guido Lange`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| NEXT_PUBLIC_JOB_TITLE         | Your job title                                                                                                                                         | `Frontend Developer`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| NEXT_PUBLIC_DESCRIPTION       | Description about you. Will be used in description meta tag of the portfolio                                                                           | `I'm a frontend developer specialized in building digital products`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| NEXT_PUBLIC_KEYWORDS          | Keywords for the meta tags                                                                                                                             | `HTML,CSS,JavaScript,TypeScript,React`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| NEXT_PUBLIC_URL               | Public URL of the portfolio for the `og:url` meta tag                                                                                                  | `https://guidolange.dev`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| NEXT_PUBLIC_PROFILE_IMAGE_URL | URL to your profile image. The domain of the URL must also be configured in `next.config.js`.                                                          | `https://guidolange.dev/myprofileimage.png`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| NEXT_PUBLIC_LOGO_URL          | URL to your logo image. The domain of the URL must also be configured in `next.config.js`.                                                             | `https://guidolange.dev/logo.png`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| NEXT_PUBLIC_OG_IMAGE_URL      | URL to your open graph image which is used when sharing the link to your portfolio. The domain of the URL must also be configured in `next.config.js`. | `https://guidolange.dev/og-image.png`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| NEXT_PUBLIC_GITHUB_URL        | URL to your github profile.                                                                                                                            | `https://github.com/gylxan`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| NEXT_PUBLIC_LINKEDIN_URL      | URL to your LinkedIn profile.                                                                                                                          | `https://linkedin.com/in/guido-lange-1217a71b8/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| NEXT_PUBLIC_SPOTIFY_URL       | URL to your Spotify profile.                                                                                                                           | `https://open.spotify.com/user/gerynix?si=2c87a1e95b83421e`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| NEXT_PUBLIC_COPYRIGHT         | Copyright for your portfolio.                                                                                                                          | `© 2022 Designed and developed by me`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| NEXT_PUBLIC_START_PARAGRAPHS  | List of paragraphs to describe yourself on the start page.                                                                                             | `["I'm a passionate frontend developer<br/> and build nice products.", "Feel free to contact me!"]`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| NEXT_PUBLIC_ABOUT_PARAGRAPHS  | List of paragraphs to describe yourself on the about page.                                                                                             | `["I'm a passionate frontend developer<br/> and build nice products.", "Feel free to contact me!"]`                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| NEXT_PUBLIC_SKILL_SLUGS       | List of skill slug objects. A slug contains a name and a URL. The project uses simple-icons to determine icons for your slugs.                         | `[{"name":"TypeScript","url":"https://www.typescriptlang.org/"},{"name":"JavaScript","url":"https://developer.mozilla.org/en-US/docs/Web/JavaScript"}]`                                                                                                                                                                                                                                                                                                                                                                                                         |
| NEXT_PUBLIC_TOOL_SLUGS        | List of tool slug objects. A slug contains a name and a URL. The project uses simple-icons to determine icons for your slugs.                          | `[{"name":"TypeScript","url":"https://www.typescriptlang.org/"},{"name":"JavaScript","url":"https://developer.mozilla.org/en-US/docs/Web/JavaScript"}]`                                                                                                                                                                                                                                                                                                                                                                                                         |
| NEXT_PUBLIC_PROJECTS          | List of private and work projects you have worked on. All URLs are optional.                                                                           | `[{"name":"Douglas Customer App","private":false,"description":"Douglas Customer App for iOS and Android. ","previewUrl":"https://www.douglas.de/de/cp/douglas-app/douglas-app","slugs":["TypeScript","React","Ionic","Capacitor","SASS"]},{"name":"Home Dashboard","description":"A client/server application with a dashboard for your home","private":true,"githubUrl":"https://github.com/gylxan/home-dashboard","imageUrl":"https://background.image-url.png","previewUrl":"https://myhome.onthewifi.com/","slugs":["TypeScript","React","CSS modules"]}]` |
| NEXT_PUBLIC_EXPERIENCES       | List of experiences at companies and positions shown on the experiences page                                                                           | `[{"company":"Company","url":"https://company-url.com","positions":[{"name":"Frontend Developer","startDate":"January 2020", "endData": "January 2023 (optional)", "tasks":["Develop this","Another task"]}]}]`                                                                                                                                                                                                                                                                                                                                                 |

## Colors
All colors can be changed in the `globals.css` for your own design.
We use three main colors for styling the elements (`--primary`, `--secondary(-ghost)` and `--tertiary`) and a color for the background (`--background`).

When you change the colors in the `globals.css` you have to adjust them in the `manifest.json`, too.

## Manifest
To customize the portfolio for your needs, 

## Start developing

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


## Run linting and tests

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

## Building

The portfolio can be building by simply triggering
```bash
npm run build
# or
yarn build
```

After building the portfolio, we also create a sitemap for the portfolio with `next-sitemap`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
