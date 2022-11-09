import Page from '../components/Page/Page';
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';

import { parseHtml } from '../utils/htmlParse';
import { parseJSON } from '../utils/json';
import SlugIcon, { Slug, SlugExtended } from '../components/SlugIcon/SlugIcon';
import simpleIcons from 'simple-icons';
import Title from '../components/Title/Title';

interface Props {
  skillSlugs: SlugExtended[];
  toolSlugs: SlugExtended[];
}
const About = ({ skillSlugs, toolSlugs }: Props) => {
  const paragraphs = parseJSON<string[]>(
    process.env.NEXT_PUBLIC_ABOUT_PARAGRAPHS,
    [],
  );

  function renderSlugSection(title: string, slugs: SlugExtended[]) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl">{title}</h2>
        <div className="flex flex-row flex-wrap gap-6">
          {slugs.map((slug) => (
            <SlugIcon key={slug.title} {...slug} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Title title="About" animatedTitle="Me, Myself and I" />
      <div className="container mt-8 flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{parseHtml(paragraph)}</p>
          ))}
        </div>
        <div className="container flex flex-col gap-10">
          {renderSlugSection('My tech stack and skills', skillSlugs)}
          {renderSlugSection('Other tools I use', toolSlugs)}
        </div>
      </div>
    </>
  );
};

function getSlugData(slug: Slug) {
  const slugName = slug.name.toLowerCase();
  return {
    ...slug,
    path: simpleIcons[slugName].path,
    hex: simpleIcons[slugName].hex,
    title: simpleIcons[slugName].title,
  };
}

export async function getStaticProps() {
  /**
   * Get the icons while building, so that the import of simpleIcons can be removed afterwards and
   * the bundle size will be decreased again
   */
  const skillSlugs = parseJSON<Slug[]>(process.env.NEXT_PUBLIC_SKILL_SLUGS, []);
  const toolSlugs = parseJSON<Slug[]>(process.env.NEXT_PUBLIC_TOOL_SLUGS, []);
  return {
    props: {
      skillSlugs: skillSlugs.map(getSlugData),
      toolSlugs: toolSlugs.map(getSlugData),
    },
  };
}

export default About;
