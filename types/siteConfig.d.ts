import { SanityAltImage, SanityImage } from 'types/image';
import { Slug } from '@sanity/types';

export type SocialMedia = 'github' | 'linkedin' | 'spotify';
interface Social {
  media: SocialMedia;
  url: string;
}

export interface MenuLink {
  title: string;
  slug: Slug;
}
export interface SiteConfig {
  title: string;
  url: string;
  copyright: string;
  description: string;
  social: Social[];
  openGraphImage: SanityImage;
  logo: SanityAltImage;
  keywords: string[];
  menuLinks: MenuLink[];
  appleTouchIcon: SanityImage;
  safariTabIcon: SanityImage;
}
