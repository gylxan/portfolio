import Page from '../components/Page/Page';
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';

import { parseHtml } from '../utils/htmlParse';
import { parseJSON } from '../utils/json';
import SlugIcon from '../components/SlugIcon/SlugIcon';

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
              {slugs.map((slug) => (
                <SlugIcon key={slug.name} {...slug} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Other tools I use</h2>
            <div className="flex flex-row flex-wrap gap-6">
              {otherToolsSlugs.map((slug) => (
                <SlugIcon key={slug.name} {...slug} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default About;
