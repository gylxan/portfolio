import type { Slug } from '@sanity/types';

export interface Page {
  slug: Slug;
  title?: string;
  pageTitle?: string;
  content: ContentBlock[];
  ogDescription?: string;
}

export interface ContentBlock {
  _key: string;
  _type: string;
}
