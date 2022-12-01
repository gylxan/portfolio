import { blurImageUrl } from '../../../constants/image';
import NextImage from 'next/image';
import { PortableTextTypeComponentProps } from '@portabletext/react/src';
import { SanityImage } from '../../../types/post';
import useSanityImage from "../../../hooks/useSanityImage";

interface ImageValue extends SanityImage {
  alt: string;
}

export type ImageProps = PortableTextTypeComponentProps<ImageValue>;

const Image = ({ value }: ImageProps) => {
  const imageProps = useSanityImage(value);
  if (!imageProps) {
    return null;
  }

  return (
    <NextImage
      {...imageProps}
      blurDataURL={value.asset.metadata.lqip || blurImageUrl}
      sizes="(max-width: 800px) 100vw, 800px"
      alt={value.alt || ' '}
      placeholder="blur"
      loading="lazy"
    />
  );
};

export default Image;
