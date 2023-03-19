import type { Rule, Slug } from 'sanity';
import { pageContentTypes } from '../constants/page';
import { ConditionalPropertyProps } from 'sanity/src/core/field/conditional-property';
import { i18nConfig } from '../config/i18n';

const isRootUrl = (url: string) =>
  url === '/' || i18nConfig.languages.some((lang) => `/${lang.id}` === url);

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  i18n: true,
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL of the page',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description:
        'Title used for open graph and the tab. When slug is root (/) no title is shown.',
      readOnly: ({ document }: ConditionalPropertyProps) =>
        isRootUrl((document?.slug as Slug)?.current ?? ''),
    },
    {
      name: 'pageTitle',
      type: 'string',
      title: 'Page title',
      description:
        'Title, which is used on the page. When empty, the title is used',
      readOnly: ({ document }: ConditionalPropertyProps) =>
        isRootUrl((document?.slug as Slug)?.current ?? ''),
    },

    {
      name: 'enabled',
      type: 'boolean',
      title: 'Enabled',
      description:
        "Whether the page is enabled or not. Disabled pages won't be pre-build and are shown as 404 pages",
      initialValue: true,
    },
    {
      name: 'ogDescription',
      type: 'string',
      title: 'Open graph description',
      description:
        'Specific site description for Open Graph. When empty default description is used',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [...pageContentTypes],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      lang: '__i18n_lang',
    },
    prepare: ({
      title,
      slug,
      lang,
    }: {
      title: string;
      slug: Slug;
      lang: string;
    }) => {
      return {
        title: `${
          title ? title : isRootUrl(slug?.current ?? '') ? 'Home' : 'Untitled'
        } (${slug?.current})`,
        subtitle: lang || i18nConfig.base,
      };
    },
  },
};
