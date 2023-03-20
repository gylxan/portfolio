import {
  ConditionalPropertyCallbackContext,
  defineType,
  Rule,
  Slug,
} from 'sanity';
import { pageContentTypes } from '../constants/page';
import { i18nConfig } from '../config/i18n';
import { withActivatable } from '../utils/schema';
import {
  getEnabledLanguagesString,
  getLanguagesWithoutBase,
} from '../utils/i18n';

const isRootUrl = (url: string) =>
  url === '/' || i18nConfig.languages.some((lang) => `/${lang.id}` === url);

export default defineType(
  withActivatable({
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

      // {
      //   name: 'enabled',
      //   type: 'boolean',
      //   title: 'Enabled',
      //   description:
      //     "Whether the page is enabled or not. Disabled pages won't be pre-build and are shown as 404 pages",
      //   initialValue: true,
      // },
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
        enabled: 'enabled',
        ...getLanguagesWithoutBase().reduce(
          (accu, { id }, index) => ({
            ...accu,
            [id]: `__i18n_refs.${index}.enabled`,
          }),
          {},
        ),
      },
      prepare: ({
        title,
        slug,
        enabled,
        ...i18nRefs
      }: {
        title: string;
        slug: Slug;
        enabled: boolean;
        lang: string;
        [langCode: string]: string | boolean | Slug;
      }) => {
        return {
          title: `${
            title ? title : isRootUrl(slug?.current ?? '') ? 'Home' : 'Untitled'
          } (${slug?.current})`,
          subtitle: getEnabledLanguagesString(enabled, i18nRefs),
        };
      },
    },
  }),
);
