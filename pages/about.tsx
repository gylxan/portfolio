import type { NextPage } from 'next';
import Page from '../components/Page/Page';
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';

import { parseHtml } from '../utils/htmlParse';
import { ConfigKey, Format, getConfig } from '../utils/config';
import ProgressBar from '../components/ProgresBar/ProgressBar';

interface Slug {
  name: string;
  percentage: number;
}
interface AboutProps {
  slugs: Slug[];
  aboutParagraphs: string[];
}

const removeWhiteSpaces = (text: string): string => text.replace(/ /g, '');

const About: NextPage<AboutProps> = ({ slugs, aboutParagraphs }) => {
  function renderSlug(slug: Slug, index: number) {
    const id = removeWhiteSpaces(slug.name.toLowerCase());
    return (
      <div className="flex flex-col gap-2" key={id}>
        <label
          id={`progressbar-label-${id}`}
          className="text-tertiary"
          htmlFor={`progressbar-${id}`}
        >
          {slug.name}
        </label>
        <ProgressBar
          progress={slug.percentage}
          id={`progressbar-${id}`}
          delay={200 + index * 100}
          aria-labelledby={`progressbar-label-${id}`}
        />
      </div>
    );
  }

  return (
    <Page title="About" description="About me">
      <AnimatedTitle title="Me, Myself and I" />
      <div className="container mt-8 flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{parseHtml(paragraph)}</p>
          ))}
        </div>
        <div className="container flex flex-col gap-6">
          {slugs.map(renderSlug)}
        </div>
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
