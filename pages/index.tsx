import Page from '../components/Page/Page';

import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';
import Button from '../components/Button/Button';
import Image from 'next/image';
import Link from '../components/Link/Link';
import { parseHtml } from '../utils/htmlParse';
import { parseJSON } from '../utils/json';

const Home = () => {
  const name = process.env.NEXT_PUBLIC_NAME ?? '';
  const blurImageUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcum1nPQAG8QKl/SZJzwAAAABJRU5ErkJggg==';
  return (
    <Page>
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="flex w-full items-center justify-center">
          <AnimatedTitle title={name} subTitle="Frontend Developer" />
        </div>
        <Link
          href="/about"
          coloredHover={false}
          underlined={false}
          className="relative overflow-hidden rounded-full h-[300px]"
          aria-label="Profile image with a link to the about page"
        >
          <Image
            src={process.env.NEXT_PUBLIC_PROFILE_IMAGE_URL ?? blurImageUrl}
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
        {parseJSON<string[]>(process.env.NEXT_PUBLIC_START_PARAGRAPHS, []).map(
          (intro) => (
            <p key={intro}>{parseHtml(intro)}</p>
          ),
        )}
        <Button href="/about">Check me out!</Button>
      </div>
    </Page>
  );
};

export default Home;
