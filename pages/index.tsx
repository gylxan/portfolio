import type { NextPage } from 'next';
import Page from '../components/Page/Page';

import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';
import { ConfigKey, Format, getConfig } from '../utils/config';
import Button from '../components/Button/Button';
import Image from 'next/image';
import Link from '../components/Link/Link';
import { parseHtml } from '../utils/htmlParse';

interface HomeProps {
  name: string;
  profileImageUrl: string;
  introduction: string[];
}

const Home: NextPage<HomeProps> = ({ name, profileImageUrl, introduction }) => {
  return (
    <Page title="Portfolio" description="Portfolio of Guido Lange">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="flex w-full items-center justify-center">
          <AnimatedTitle title={name} subTitle="Frontend Developer" />
        </div>
        <Link href="/about" coloredHover={false} underlined={false}>
          <Image
            src={profileImageUrl}
            alt="profile-image"
            className="rounded-full opacity-80 hover:opacity-100"
            width={300}
            height={300}
            priority={true}
          />
        </Link>

        <p className="text-secondary">Hi, my name is</p>
        <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">{name}</h2>
        {introduction.map((intro) => (
          <p key={intro}>{parseHtml(intro)}</p>
        ))}
        <Button href="/about">Check me out!</Button>
      </div>
    </Page>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      name: getConfig(ConfigKey.NAME, ''),
      profileImageUrl: getConfig(ConfigKey.PROFILE_IMAGE_URL, ''),
      introduction: getConfig(ConfigKey.START_PARAGRAPHS, [], Format.JSON),
    },
  };
};

export default Home;
