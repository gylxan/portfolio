import { Button, Link, Layout, Title } from 'components';

import Image from 'next/image';
import { parseHtml } from 'utils/htmlParse';
import { parseJSON } from 'utils/json';
import type { GetStaticProps } from 'next';
import { blurImageUrl } from 'constants/image';
import { Routes } from 'constants/routes';
import client from 'utils/sanity';
import { configQuery } from 'constants/groq';
import type { SiteConfig } from 'types/siteConfig';

interface Props {
  siteConfig: SiteConfig;
  name: string;
  profileImageUrl: string;
  paragraphs: string[];
}
const Home = ({ name, profileImageUrl, paragraphs, siteConfig }: Props) => {
  return (
    <Layout siteConfig={siteConfig}>
      <div className="container flex flex-col items-center justify-center gap-4">
        <Link
          href="/about"
          coloredHover={false}
          underlined={false}
          className="relative h-[300px] overflow-hidden rounded-full"
          aria-label="Profile image with a link to the about page"
        >
          <Image
            src={profileImageUrl ?? blurImageUrl}
            alt="profile-image"
            className="opacity-80 hover:opacity-100"
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL={blurImageUrl}
            priority
          />
        </Link>

        <p className="text-secondary">Hi, my name is</p>
        <Title>{name}</Title>
        {paragraphs.map((intro) => (
          <p key={intro}>{parseHtml(intro)}</p>
        ))}
        <Button href={Routes.About}>Check me out!</Button>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteConfig = await client.fetch<SiteConfig>(configQuery);

  return {
    props: {
      siteConfig,
      name: process.env.NEXT_PUBLIC_NAME ?? '',
      profileImageUrl: process.env.NEXT_PUBLIC_PROFILE_IMAGE_URL ?? '',
      paragraphs: parseJSON<string[]>(
        process.env.NEXT_PUBLIC_START_PARAGRAPHS,
        [],
      ),
    },
  };
};

export default Home;
