import {
  SanityAsset,
  SanityImageObject,
  SanityReference,
} from '@sanity/image-url/lib/types/types';

export interface SanityImage extends SanityImageObject {
  asset: SanityReference & SanityAsset;
}

export type SanityAltImage = SanityImage & { alt: string };
