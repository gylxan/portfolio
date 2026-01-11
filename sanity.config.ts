import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './studio/schemas/schema';
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { HiOutlineCog } from 'react-icons/hi';
import { documentInternationalization } from '@sanity/document-internationalization';
import { languageFilter } from '@sanity/language-filter';
import { i18nConfig, i18nDocuments } from './studio/config/i18n';
import {
  applyIconOnListItemBuilder,
  filterChildrenForBaseLanguage,
  getBlogTypes,
  getHiddenDocumentTypes,
  getPageType,
} from './studio/utils/schema';

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? '',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) => {
        const documentTypesWithIcons = S.documentTypeListItems().map(
          (element) =>
            filterChildrenForBaseLanguage(
              S,
              applyIconOnListItemBuilder(element),
            ),
        );
        return S.list()
          .title('Content Manager')
          .items([
            S.listItem()
              .title('Site config')
              .icon(HiOutlineCog)
              .child(
                S.editor().schemaType('siteconfig').documentId('siteconfig'),
              ),
            S.divider(),
            ...documentTypesWithIcons.filter(getPageType),
            S.divider(),
            ...documentTypesWithIcons.filter(getBlogTypes),
            S.divider(),
            ...documentTypesWithIcons.filter(getHiddenDocumentTypes),
          ]);
      },
    }),
    codeInput(),
    visionTool({
      // Note: These are both optional
      defaultApiVersion: 'v2021-10-21',
      defaultDataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    }),
    languageFilter({
      supportedLanguages: i18nConfig.languages,
      defaultLanguages: [i18nConfig.base],
      documentTypes: [
        'siteconfig',
        'category',
        'experience',
        'project',
        'translation',
      ],
    }),
    documentInternationalization({
      supportedLanguages: i18nConfig.languages,
      schemaTypes: i18nDocuments,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  form: {
    image: {
      directUploads: true,
    },
  },
});
