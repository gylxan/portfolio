import { Layout, SlugIcon, Title } from 'components';
import { parseHtml } from 'utils/htmlParse';
import { parseJSON } from 'utils/json';
import type { Slug, SlugExtended } from 'components/slug-icon/slug-icon';
import * as simpleIcons from 'simple-icons/icons';
import type { SimpleIcon } from 'simple-icons';
import client from 'utils/sanity';
import type { SiteConfig } from 'types/siteConfig';
import { configQuery } from 'constants/groq';

interface AboutProps {
  siteConfig: SiteConfig;
  skillSlugs: SlugExtended[];
  toolSlugs: SlugExtended[];
  paragraphs: string[];
}
const About = ({
  skillSlugs,
  toolSlugs,
  paragraphs,
  siteConfig,
}: AboutProps) => {
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
    <Layout title="About" siteConfig={siteConfig}>
      <Title>Me, Myself and I</Title>
      <div className="container mt-8 flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{parseHtml(paragraph)}</p>
          ))}
        </div>
        <div className="container flex flex-col gap-10">
          {skillSlugs.length &&
            renderSlugSection('My tech stack and skills', skillSlugs)}
          {toolSlugs.length &&
            renderSlugSection('Other tools I use', toolSlugs)}
        </div>
      </div>
    </Layout>
  );
};

function getSlugData(slug: Slug) {
  const slugName = `si${slug.name.charAt(0).toUpperCase()}${slug.name
    .slice(1)
    .toLowerCase()}`;
  const icons = simpleIcons as Record<string, SimpleIcon>;
  return {
    ...slug,
    path: icons[slugName].path,
    hex: icons[slugName].hex,
    title: icons[slugName].title,
  };
}

export async function getStaticProps() {
  const siteConfig = await client.fetch<SiteConfig>(configQuery);
  /**
   * Get the icons while building, so that the import of simpleIcons can be removed afterwards and
   * the bundle size will be decreased again
   */
  const skillSlugs = parseJSON<Slug[]>(process.env.NEXT_PUBLIC_SKILL_SLUGS, []);
  const toolSlugs = parseJSON<Slug[]>(process.env.NEXT_PUBLIC_TOOL_SLUGS, []);
  return {
    props: {
      siteConfig,
      skillSlugs: skillSlugs.map(getSlugData),
      toolSlugs: toolSlugs.map(getSlugData),
      paragraphs: parseJSON<string[]>(
        process.env.NEXT_PUBLIC_ABOUT_PARAGRAPHS,
        [],
      ),
    },
  };
}

export default About;
