import { i18nConfig } from '../../config/i18n';
import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'translation',
  type: 'document',
  title: 'Translation',
  fields: [
    {
      name: 'namespace',
      type: 'string',
      title: 'Namespace',
    },
    {
      name: 'translations',
      type: 'array',
      title: 'Translations',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'key',
              title: 'Key',
              type: 'string',
            },
            {
              name: 'value',
              title: 'Value',
              type: 'localeString',
            },
          ],
        },
      ],
      preview: {
        select: {
          key: 'key',
          value: 'value',
        },
        prepare: ({
          key,
          value,
        }) => {
          return {
            title: key,
            subtitle: value?.[i18nConfig.base] || '',
          };
        },
      },
    },
  ],
  preview: {
    select: {
      title: 'namespace',
      translations: 'translations',
    },
    prepare: ({
      title,
      translations,
    }: {
      title: string;
      translations: string[];
    }) => {
      const translationLength = translations?.length ?? 0;

      return {
        title,
        subtitle: `${translationLength} translation${
          translationLength === 1 ? '' : 's'
        }`,
      };
    },
  },
});
