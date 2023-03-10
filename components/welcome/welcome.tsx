import { Button, Link, PortableText, Title } from 'components';
import Image from 'next/image';
import { blurImageUrl } from 'constants/image';
import { Routes } from 'constants/routes';
import type { SanityImage } from 'types/image';
import useSanityImage from 'hooks/useSanityImage';
import type { PortableTextBlock } from '@portabletext/types';
import {getBlurDataUrl} from "utils/sanity";

export interface WelcomeProps {
  description: PortableTextBlock;
  introduction: string;
  profileImage: SanityImage;
  name: string;
  buttonText: string;
}
const Welcome = ({
  name,
  profileImage,
  introduction,
  description,
  buttonText,
}: WelcomeProps) => {
  const imageProps = useSanityImage(profileImage);
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-4">
      {imageProps && (
        <Link
          href="/about"
          coloredHover={false}
          underlined={false}
          className="relative h-[300px] overflow-hidden rounded-full"
          aria-label="Profile image with a link to the about page"
        >
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            alt="Profile image"
            className="opacity-80 hover:opacity-100"
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL={getBlurDataUrl(profileImage)}
            priority
          />
        </Link>
      )}

      <p className="text-secondary">{introduction}</p>
      <Title>{name}</Title>
      <PortableText value={description} />
      <Button href={Routes.About}>{buttonText}</Button>
    </div>
  );
};

export default Welcome;
