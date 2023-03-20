import { defineType } from 'sanity';
import { i18nConfig } from '../../config/i18n';

export default defineType({
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Name',
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description',
    },
  ],

  preview: {
    select: {
      name: 'name',
    },
    prepare: ({ name }: { name: Record<string, string> }) => {
      return {
        title: name[i18nConfig.base],
      };
    },
  },
});
