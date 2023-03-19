import { isDefaultLanguage } from 'utils/i18n';

export const getUrlFromSlugs = (locale: string, slugs: string[]) => {
  const isDefaultLang = isDefaultLanguage(locale);
  const prefix = isDefaultLang ? '/' : `/${locale}`;
  return `${prefix}${prefix !== '/' && slugs.length ? '/' : ''}${slugs.join(
    '/',
  )}`;
};

export const getPathsFromSlug = (slug: string, locale: string | undefined) => {
  return slug === '/' || slug === `/${locale}`
    ? []
    : slug.split('/').filter((slugPart) => !!slugPart && slugPart !== locale);
};
