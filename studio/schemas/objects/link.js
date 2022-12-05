export default {
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    {
      name: 'href',
      type: 'url',
      title: 'URL',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto'],
        allowRelative: true
      })
    },
    {
      name: 'label',
      type: 'string',
      title: 'Label for the link. Later used in aria-label',
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      description: 'Read https://css-tricks.com/use-target_blank/',
      type: 'boolean',
    },
  ],
};
