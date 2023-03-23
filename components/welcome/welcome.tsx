import { Button, Link, PortableText, Title } from 'components';
import Image from 'next/image';
import type { SanityImage } from 'types/image';
import useSanityImage from 'hooks/useSanityImage';
import type { PortableTextBlock } from '@portabletext/types';
import { getBlurDataUrl } from 'utils/sanity';
import { useTranslations } from 'use-intl';
import type { Slug } from '@sanity/types';

export interface WelcomeProps {
  description: PortableTextBlock;
  introduction: string;
  profileImage: SanityImage;
  name: string;
  buttonText: string;
  link: Slug;
}
const Welcome = ({
  name,
  profileImage,
  introduction,
  description,
  buttonText,
  link,
}: WelcomeProps) => {
  const imageProps = useSanityImage(profileImage);
  const t = useTranslations('welcome');
  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-4">
      {imageProps && (
        <Link
          href={link.current}
          coloredHover={false}
          underlined={false}
          className="relative h-[300px] overflow-hidden rounded-full"
          aria-label={t('profile_image_link')}
        >
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            alt={t('profile_image')}
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
      <Button href={link.current}>{buttonText}</Button>
    </div>
  );
};

export default Welcome;
