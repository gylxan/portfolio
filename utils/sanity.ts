import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION, // "2022-11-16"
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === 'production',
};

export const imageBuilder = createImageUrlBuilder(config);

export const urlForImage = (source: SanityImageSource) =>
  imageBuilder.image(source).auto('format').fit('max');

export const client = createClient(config);

export default client;
