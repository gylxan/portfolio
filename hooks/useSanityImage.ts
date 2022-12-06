import { useNextSanityImage } from 'next-sanity-image';
import client from 'utils/sanity';
import type { SanityImageObject } from '@sanity/image-url/lib/types/types';

const useSanityImage = (image: SanityImageObject | null | undefined = null) => {
  const imageProps = useNextSanityImage(client, image);
  if (!image || !image.asset) {
    return null;
  }
  return imageProps;
};

export default useSanityImage;
