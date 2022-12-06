import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { SanityAsset, SanityReference } from "@sanity/image-url/lib/types/types";
import { Slug } from "@sanity/types";

export interface Post {
  _id: string;
  slug: Slug;
  title: string;
  description: string;
  categories: Category[] | null;
  _createdAt: string;
  content: PortableTextBlock;
  mainImage: SanityImage;
}

interface Category {
  name: string;
  description: string;
}

export interface SanityImage extends SanityImageObject {
  asset: SanityReference & SanityAsset;
}
