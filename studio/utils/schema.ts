import { ListItemBuilder, StructureBuilder } from 'sanity/desk';
import { i18nConfig } from '../config/i18n';
import { documentTypeIcons } from '../constants/sanity';
import { SchemaType } from 'sanity';

export const getLocalizedObject = (fieldType: string) => {
  return {
    title: `Localized ${fieldType}`,
    name: `locale${fieldType.charAt(0).toUpperCase()}${fieldType.substring(1)}`,
    type: 'object',
    fieldsets: [
      {
        title: 'Translations',
        name: 'translations',
        options: { collapsible: true },
      },
    ],
    // Dynamically define one field per language
    fields: i18nConfig.languages.map((lang) => ({
      title: lang.title,
      name: lang.id,
      type: fieldType,
      fieldset: lang.id === i18nConfig.base ? null : 'translations',
    })),
  };
};

export const applyIconOnListItemBuilder = (element: ListItemBuilder) => {
  const elementId = element.getId() || 'default';
  if (documentTypeIcons[elementId]) {
    return element.icon(documentTypeIcons[elementId]);
  }
  return element;
};

export const filterChildrenForBaseLanguage = (
  S: StructureBuilder,
  element: ListItemBuilder,
) => {
  if (
    typeof element.getSchemaType() !== 'string' &&
    element.getSchemaType()?.i18n
  ) {
    return element.child(
      S.documentList()
        .title(element.getTitle() as string)
        .schemaType(element.getSchemaType() as string | SchemaType)
        .filter(
          `_type == "${
            element.getSchemaType()?.name
          }" && __i18n_lang == $baseLanguage`,
        )
        .params({ baseLanguage: i18nConfig.base }),
    );
  }
  return element;
};

export const getBlogTypes = (listItem: ListItemBuilder) =>
  ['post', 'category'].includes(listItem.getId() as string);

export const getPageType = (listItem: ListItemBuilder) =>
  ['page'].includes(listItem.getId() as string);
export const getHiddenDocumentTypes = (listItem: ListItemBuilder) =>
  !['siteconfig', 'page', 'post', 'category'].includes(
    listItem.getId() as string,
  );
