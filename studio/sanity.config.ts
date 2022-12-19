import { defineConfig } from 'sanity';
import { deskTool, ListItem } from 'sanity/desk';
import { schemaTypes } from './schemas/schema';
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import {
  HiOutlineCog,
  HiOutlineClipboardList,
  HiOutlineFilter,
  HiOutlineNewspaper,
} from 'react-icons/hi';
import { ListItemBuilder } from 'sanity/lib/exports/desk';

const hiddenDocTypes = (listItem: ListItemBuilder) =>
  !['siteconfig'].includes(listItem.getId() as string);

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
            ...S.documentTypeListItems().filter(hiddenDocTypes),
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
