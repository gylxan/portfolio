import NextImage from 'next/image';
import { PortableTextTypeComponentProps } from '@portabletext/react/src';
import useSanityImage from 'hooks/useSanityImage';
import { getBlurDataUrl } from 'utils/sanity';
import type { SanityAltImage } from 'types/image';

export type ImageProps = PortableTextTypeComponentProps<SanityAltImage>;

const SanityImage = ({ value }: ImageProps) => {
  const imageProps = useSanityImage(value);
  if (!imageProps || !imageProps.src) {
    return null;
  }

  return (
    <NextImage
      {...imageProps}
      blurDataURL={getBlurDataUrl(value)}
      sizes="(max-width: 800px) 100vw, 800px"
      alt={value.alt || ' '}
      placeholder="blur"
      loading="lazy"
    />
  );
};

export default SanityImage;
