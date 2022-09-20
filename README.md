# portfolio

My portfolio website with Next.js and Tailwind CSS

# Portfolio configuration

Create a `.env.local` file in the root of your project.

Example:

```
ABOUT_SLUGS=["react","javascript","typescript","webdriverio","ionic"]
ABOUT_PARAGRAPHS=["Hi, I&quot; a developer","And I live in Berlin"]

```

The `.env` file can contain following configurations:

| Key name         | Description                                                  | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|------------------|--------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ABOUT_SLUGS      | List of slugs used to create Tag cloud                       | `["react", "git"]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ABOUT_PARAGRAPHS | List of paragraphs for the about page. Can contain HTML.     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| PROJECTS         | A list of projects, which will be shown on the projects page | <pre> [<br/>&emsp;&emsp;{ <br>&emsp;&emsp;&emsp; "name": "Project name",<br>&emsp;&emsp;&emsp; "description": "Project description",<br>&emsp;&emsp;&emsp; "private": "true" (private or work project), <br>&emsp;&emsp;&emsp; "slugs": ["HTML", "CSS", "Javascript"],<br>&emsp;&emsp;&emsp; "githubUrl": "https://github.com/user/my-repo" (optional),<br>&emsp;&emsp;&emsp; "imageUrl": "https://public-image-url" (optional),<br>&emsp;&emsp;&emsp; "previewUrl": "https://my-project.com" (optional),<br>&emsp;&emsp;}<br>]</pre> |



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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
