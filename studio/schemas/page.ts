import type { Rule, Slug } from 'sanity';
import pageContent from './objects/pageContent';
import { ConditionalPropertyProps } from 'sanity/src/core/field/conditional-property';

export default {
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
      readOnly: ({ document }: ConditionalPropertyProps) =>
        (document?.slug as Slug)?.current === '/',
    },
    {
      name: 'pageTitle',
      type: 'string',
      title: 'Page title',
      description:
        'Title, which is used on the page. When empty, the title is used',
      readOnly: ({ document }: ConditionalPropertyProps) =>
        (document?.slug as Slug)?.current === '/',
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
      of: [...pageContent],
    },
  ],
  preview: {
    select: {
      title: 'title',
      pageTitle: 'pageTitle',
      slug: 'slug',
    },
    prepare: ({ title, slug }: { title: string; slug: Slug }) => {
      return {
        title: title ? title : slug?.current === '/' ? 'Home' : 'Untitled',
      };
    },
  },
};
