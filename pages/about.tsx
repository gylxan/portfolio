import type { NextPage } from 'next';
import Page from '../components/Page/Page';
import TagCloud from '../components/TagCloud/TagCloud';
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';

import { parseHtml } from '../utils/htmlParse';
import { ConfigKey, Format, getConfig } from '../utils/config';

interface AboutProps {
  slugs: string[];
  aboutParagraphs: string[];
}

const About: NextPage<AboutProps> = ({ slugs, aboutParagraphs }) => {
  return (
    <Page title="About" description="About me">
      <AnimatedTitle title="Me, Myself and I" />
      <div className="container mt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{parseHtml(paragraph)}</p>
          ))}
        </div>
        <TagCloud tags={slugs} />
      </div>
    </Page>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      slugs: getConfig(ConfigKey.ABOUT_SLUGS, [], Format.JSON),
      aboutParagraphs: getConfig(ConfigKey.ABOUT_PARAGRAPHS, [], Format.JSON),
    },
  };
};

export default About;
