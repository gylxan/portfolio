import Page from '../components/Page/Page';
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';

import { parseHtml } from '../utils/htmlParse';
import { parseJSON } from '../utils/json';
import simpleIcons from 'simple-icons';

interface Slug {
  name: string;
  url?: string;
}
const About = () => {
  const slugs = parseJSON<Slug[]>(process.env.NEXT_PUBLIC_ABOUT_SLUGS, []);
  const otherToolsSlugs = parseJSON<Slug[]>(
    process.env.NEXT_PUBLIC_ABOUT_SLUGS_OTHER_TOOLS,
    [],
  );
  const paragraphs = parseJSON<string[]>(
    process.env.NEXT_PUBLIC_ABOUT_PARAGRAPHS,
    [],
  );
  function renderSlug(slug: Slug) {
    const image = simpleIcons[slug.name.toLowerCase()];
    if (!image) {
      return null;
    }

    const svg = (
      <svg
        key={image.title}
        viewBox="0 0 24 24"
        role="img"
        className={`w-12 fill-secondary transition-all duration-300 hover:scale-125`}
        aria-label={`${image.title} slug`}
      >
        <path d={image.path} />
      </svg>
    );
    return slug.url ? <a href={slug.url}>{svg}</a> : svg;
  }

  console.warn(simpleIcons);

  return (
    <Page title="About">
      <AnimatedTitle title="Me, Myself and I" />
      <div className="container mt-8 flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{parseHtml(paragraph)}</p>
          ))}
        </div>
        <div className="container flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">My Skills and Tech I use</h2>
            <div className="flex flex-row flex-wrap gap-6">
              {slugs.map(renderSlug)}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Other tools I use</h2>
            <div className="flex flex-row flex-wrap gap-6">
              {otherToolsSlugs.map(renderSlug)}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default About;
