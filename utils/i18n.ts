import { TranslationNamespace } from 'types/siteConfig';

export const restructureTranslations = (translations: TranslationNamespace[]) =>
  translations.reduce(
    (accumulatedNs, current) => ({
      ...accumulatedNs,
      [current.namespace]: current.translations.reduce(
        (accumulatedTranslations, { key, value }) => ({
          ...accumulatedTranslations,
          [key]: value,
        }),
        {},
      ),
    }),
    {} as Record<string, Record<string, string>>,
  );

export const isDefaultLanguage = (language: string | undefined) =>
    language === process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;

