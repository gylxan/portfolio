import type { PortableTextBlock } from '@portabletext/types';
import { Slug } from '@sanity/types';
import { SanityImage } from 'types/image';

export interface Post {
  _id: string;
  slug: Slug;
  title: string;
  description: string;
  categories: Category[] | null;
  _createdAt: string;
  content: PortableTextBlock;
  mainImage: SanityImage;
  estimatedReadingTime: number;
  language?: string;
  enabled?: boolean;
}

interface Category {
  name: string;
  description: string;
}
