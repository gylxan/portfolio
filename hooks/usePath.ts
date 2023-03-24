import { useRouter } from 'next/router';
import { isDefaultLanguage } from 'utils/i18n';

export const usePath = () => {
  const { asPath, locale } = useRouter();

  return `${isDefaultLanguage(locale) ? '' : `/${locale}`}${asPath}`;
};
