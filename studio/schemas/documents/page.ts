import {
  ConditionalPropertyCallbackContext,
  defineType,
  Rule,
  Slug,
} from 'sanity';
import { pageContentTypes } from '../../constants/page';
import { i18nConfig } from '../../config/i18n';
import { withActivatable } from '../../utils/schema';
import { languageField } from '../../config/i18n';

const isRootUrl = (url: string) =>
  url === '/' || i18nConfig.languages.some((lang) => `/${lang.id}` === url);

export default defineType(
  withActivatable({
    name: 'page',
    type: 'document',
    title: 'Page',
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
        readOnly: ({ document }: ConditionalPropertyCallbackContext) =>
          isRootUrl((document?.slug as Slug)?.current ?? ''),
      },
      {
        name: 'pageTitle',
        type: 'string',
        title: 'Page title',
        description:
          'Title, which is used on the page. When empty, the title is used',
        readOnly: ({ document }: ConditionalPropertyCallbackContext) =>
          isRootUrl((document?.slug as Slug)?.current ?? ''),
      },
      {
        name: 'ogDescription',
        type: 'string',
        title: 'Open graph description',
        description:
          'Specific site description for Open Graph. When empty default description is used',
      },
      {
        name: 'fullHeight',
        type: 'boolean',
        title: 'Use full height for content',
        initialValue: false,
        description:
          'Use full height for content, to position it in the center. Useful for small content',
      },
      {
        name: 'content',
        type: 'array',
        title: 'Content',
        of: [...pageContentTypes],
      },
      { ...languageField },
    ],
    preview: {
      select: {
        title: 'title',
        slug: 'slug',
        enabled: 'enabled',
        language: 'language',
      },
      prepare: ({
        title,
        slug,
        enabled,
        language,
      }: {
        title: string;
        slug: Slug;
        enabled: boolean;
        language: string;
      }) => {
        return {
          title: `${
            title ? title : isRootUrl(slug?.current ?? '') ? 'Home' : 'Untitled'
          } (${slug?.current})`,
          subtitle: `${language.toUpperCase()}, Enabled: ${enabled ? '✔' : '✖'}`,
        };
      },
    },
  }),
);
