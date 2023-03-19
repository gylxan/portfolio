import { isDefaultLanguage } from 'utils/i18n';

export const getUrl = (locale: string, slugs: string[]) => {
  const isDefaultLang = isDefaultLanguage(locale);
  const prefix = isDefaultLang ? '/' : `/${locale}`;
  return `${prefix}${prefix !== '/' && slugs.length ? '/' : ''}${slugs.join(
    '/',
  )}`;
};
