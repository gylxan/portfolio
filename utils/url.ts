import { isDefaultLanguage } from 'utils/i18n';

export const getUrlFromSlugs = (locale: string, slugs: string[]) => {
  const isDefaultLang = isDefaultLanguage(locale);
  const prefix = isDefaultLang ? '/' : `/${locale}`;
  return `${prefix}${prefix !== '/' && slugs.length ? '/' : ''}${slugs.join(
    '/',
  )}`;
};

export const getPathsFromSlug = (slug: string, locale: string | undefined) =>
  slug === '/' || slug === `/${locale}`
    ? []
    : slug.split('/').filter((slugPart) => !!slugPart && slugPart !== locale);

export const isSlugMatchingCurrentUrl = (
  slugUrl: string,
  locale: string | undefined,
  asPath: string,
) => {
  const url = slugUrl.startsWith('/') ? slugUrl : `${slugUrl}`;
  return url === asPath || url === `/${locale}${asPath}`;
};
