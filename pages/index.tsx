import { AnimatedTitle, Button, Link, Page } from '../components';

import Image from 'next/image';
import { parseHtml } from '../utils/htmlParse';
import { parseJSON } from '../utils/json';
import type { GetStaticProps } from 'next';
import { blurImageUrl } from '../constants/image';

interface Props {
  name: string;
  jobTitle: string;
  profileImageUrl: string;
  paragraphs: string[];
}
const Home = ({ name, jobTitle, profileImageUrl, paragraphs }: Props) => {
  return (
    <Page>
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="flex w-full items-center justify-center">
          <AnimatedTitle title={name} subTitle={jobTitle} />
        </div>
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
        <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">{name}</h2>
        {paragraphs.map((intro) => (
          <p key={intro}>{parseHtml(intro)}</p>
        ))}
        <Button href="/about">Check me out!</Button>
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      name: process.env.NEXT_PUBLIC_NAME ?? '',
      jobTitle: process.env.NEXT_PUBLIC_JOB_TITLE ?? '',
      profileImageUrl: process.env.NEXT_PUBLIC_PROFILE_IMAGE_URL ?? '',
      paragraphs: parseJSON<string[]>(
        process.env.NEXT_PUBLIC_START_PARAGRAPHS,
        [],
      ),
    },
  };
};

export default Home;
