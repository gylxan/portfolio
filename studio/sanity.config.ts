import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas/schema';
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { HiDocument, HiOutlineCog } from 'react-icons/hi';
import { ListItemBuilder } from 'sanity/lib/exports/desk';

const hiddenDocTypes = (listItem: ListItemBuilder) =>
  !['siteconfig'].includes(listItem.getId() as string);

const pageType = (listItem: ListItemBuilder) =>
  ['page'].includes(listItem.getId() as string);

const blogTypes = (listItem: ListItemBuilder) =>
  ['post', 'category'].includes(listItem.getId() as string);

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio',
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  basePath: '/studio',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content Manager')
          .items([
            S.listItem()
              .title('Site config')
              .icon(HiOutlineCog)
              .child(
                S.editor().schemaType('siteconfig').documentId('siteconfig'),
              ),
            S.divider(),
            ...S.documentTypeListItems()
              .filter(pageType)
              .map((element) => element.icon(HiDocument)),
            S.divider(),
            ...S.documentTypeListItems().filter(blogTypes),
            S.divider(),
            ...S.documentTypeListItems()
              .filter(hiddenDocTypes)
              .filter((element) => !pageType(element))
              .filter((element) => !blogTypes(element)),
          ]),
    }),
    codeInput(),
    visionTool({
      // Note: These are both optional
      defaultApiVersion: 'v2021-10-21',
      defaultDataset: import.meta.env.SANITY_STUDIO_DATASET,
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
