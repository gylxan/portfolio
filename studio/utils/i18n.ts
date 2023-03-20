import { i18nConfig } from '../config/i18n';
import { Slug } from 'sanity';

export const getLanguagesWithoutBase = () =>
  i18nConfig.languages.filter(({ id }) => id !== i18nConfig.base);

export const getEnabledLanguagesString = (
  baseEnabled: boolean,
  enabledStates: Record<string, boolean | string | Slug>,
) => {
  const allLanguages = [{ id: i18nConfig.base }, ...getLanguagesWithoutBase()];
  const enabledLanguages = { ...enabledStates, [i18nConfig.base]: baseEnabled };

  return allLanguages
    .filter(({ id }) => enabledLanguages[id])
    .map(({ id }) => `${id.toUpperCase()}: ${enabledLanguages[id] ? '✔' : '✖'}`)
    .join(', ');
};
