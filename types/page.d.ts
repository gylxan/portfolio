import type { Slug } from '@sanity/types';

export interface Page {
  slug: Slug;
  title?: string;
  pageTitle?: string;
  content: ContentBlock[];
  ogDescription?: string;
  enabled: boolean;
  language?: string;
  fullHeight?: boolean;
}

export interface ContentBlock {
  _key: string;
  _type: string;
}
