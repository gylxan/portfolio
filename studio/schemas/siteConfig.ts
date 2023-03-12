import { Rule } from 'sanity';
export default {
  name: 'siteconfig',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [/* "create", "delete", */ 'update', 'publish'],
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Social Media',
      name: 'social',
    },
    {
      title: 'Menu',
      name: 'menu',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Apple',
      name: 'apple',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site title',
    },
    {
      title: 'URL',
      name: 'url',
      type: 'url',
      description: 'The main site url. Used to create canonical url',
    },
    {
      name: 'copyright',
      type: 'string',
      title: 'Copyright Name',
      description: 'Enter company name to appear in footer after ©',
    },
    {
      title: 'Main logo',
      description: 'Upload your main logo here. SVG preferred.',
      name: 'logo',
      type: 'customImage',
    },
    {
      name: 'social',
      type: 'array',
      title: 'Social Links',
      description: 'Enter your Social Media URLs',
      validation: (rule: Rule) => rule.unique(),
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'media',
              title: 'Choose Social Media',
              options: {
                list: [
                  { title: 'GitHub', value: 'github' },
                  { title: 'Linkedin', value: 'linkedin' },
                  { title: 'Spotify', value: 'spotify' },
                ],
              },
            },
            {
              type: 'url',
              name: 'url',
              title: 'Full Profile URL',
            },
          ],
          preview: {
            select: {
              title: 'media',
              subtitle: 'url',
            },
          },
        },
      ],
    },

    {
      title: 'Meta Description',
      name: 'description',
      fieldset: 'metadata',
      type: 'text',
      rows: 5,
      validation: (rule: Rule) => rule.min(20).max(200),
      description: 'Enter SEO Meta Description',
    },

    {
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Default image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      description: 'Keywords that describe your portfolio and topics on it',
      type: 'array',
      of: [{ type: 'string' }],
    },

    {
      name: 'menuLinks',
      title: 'Menu links',
      description: 'Links shown in the Header and Mobile menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              description: 'Title for the link',
              type: 'string',
              validation: (rule: Rule) => rule.required(),
            },
            {
              title: 'Slug',
              name: 'slug',
              description: 'Slug of the page',
              type: 'slug',
              validation: (rule: Rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'slug.current',
            },
          },
        },
      ],
      fieldset: 'menu',
    },
    {
      name: 'resume',
      title: 'Resume',
      description: 'Resume, which can be downloaded from the menu. Empty when should not been shown.',
      type: 'file',
      accept: '.pdf',
      fieldset: 'menu',
    },

    {
      title: 'Apple touch icon',
      description:
        'Icon used for IPhone or IPad, when website is saved as favourite on home screen',
      name: 'appleTouchIcon',
      type: 'image',
      fieldset: 'apple',
    },
    {
      title: 'Safari pinned tab icon',
      description: 'Icon used when website is pinned in Safari',
      name: 'safariTabIcon',
      type: 'image',
      fieldset: 'apple',
    },
  ],
};
