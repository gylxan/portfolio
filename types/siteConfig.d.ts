import type { SanityAltImage, SanityImage } from 'types/image';
import type { Slug } from '@sanity/types';
import type { SanityFile } from 'types/file';

export type SocialMedia = 'github' | 'linkedin' | 'spotify';
interface Social {
  media: SocialMedia;
  url: string;
}

export interface MenuLink {
  title: string;
  slug: Slug;
}

interface TranslationNamespace {
  namespace: string;
  translations: Translation[];
}
interface Translation {
  key: string;
  value: string;
}

export interface SanitySiteConfig {
  title: string;
  url: string;
  copyright?: string;
  description: string;
  social: Social[];
  openGraphImage: SanityImage;
  logo: SanityAltImage;
  keywords: string[];
  menuLinks: MenuLink[];
  resume?: SanityFile;
  appleTouchIcon: SanityImage;
  safariTabIcon: SanityImage;
  translations: TranslationNamespace[];
}

export interface SiteConfig extends Omit<SanitySiteConfig, 'translations'> {
  translations: Record<string, Record<string, string>>;
}
