import { isDefaultLanguage } from 'utils/i18n';

export const getUrlFromSlugs = (locale: string, slugs: string[]) =>
  `${getLanguageUrlPrefix(locale)}${slugs.length ? '/' : ''}${slugs.join('/')}` || '/';

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

export const getLanguageUrlPrefix = (locale: string | undefined) =>
  isDefaultLanguage(locale) ? '' : `/${locale}`;
