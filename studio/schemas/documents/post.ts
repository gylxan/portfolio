import richtextEditor from '../objects/richtextEditor';
import { defineType, Rule } from 'sanity';
import { withActivatable } from '../../utils/schema';
import { languageField } from '../../config/i18n';

export default defineType(
  withActivatable({
    name: 'post',
    type: 'document',
    title: 'Post',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        description: 'Title of the post. Recommended: 60 chars',
        validation: (rule: Rule) => rule.required().min(5),
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
        description:
          'Short description for the post, which will be used in the overview and meta tags. Recommended: 155-160 chars',
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'Slug of the post',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (rule: Rule) => rule.required(),
      },
      {
        name: 'mainImage',
        type: 'image',
        title: 'Main Image',
        options: {
          hotspot: true,
          metadata: ['lqip', ''],
        },
      },
      {
        name: 'categories',
        type: 'array',
        title: 'Categories',
        of: [
          {
            type: 'reference',
            to: [{ type: 'category' }],
          },
        ],
      },
      { ...richtextEditor },
      { ...languageField },
    ],
    preview: {
      select: {
        title: 'title',
        enabled: 'enabled',
        media: 'mainImage',
        language: 'language',
      },
      prepare: ({
        title,
        enabled,
        media,
        language,
      }: {
        title: string;
        media: any;
        enabled: boolean;
        language: string;
      }) => {
        return {
          title,
          media,
          subtitle: `${language.toUpperCase()}, Enabled: ${
            enabled ? '✔' : '✖'
          }`,
        };
      },
    },
  }),
);
