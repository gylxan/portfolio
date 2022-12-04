import { AnimatedTitle, Button, Link, Page } from '../components';

import Image from 'next/image';
import { parseHtml } from '../utils/htmlParse';
import { parseJSON } from '../utils/json';
import type { GetStaticProps } from 'next';
import { blurImageUrl } from '../constants/image';
import { Routes } from '../constants/routes';

interface Props {
  name: string;
  profileImageUrl: string;
  paragraphs: string[];
}
const Home = ({ name, profileImageUrl, paragraphs }: Props) => {
  return (
    <Page>
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
        <AnimatedTitle title={name} />
        {paragraphs.map((intro) => (
          <p key={intro}>{parseHtml(intro)}</p>
        ))}
        <Button href={Routes.About}>Check me out!</Button>
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
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
