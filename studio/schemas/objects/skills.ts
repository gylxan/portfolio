export default {
  name: 'skills',
  type: 'object',
  title: 'Skills',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      title: 'Slugs',
      name: 'slugs',
      type: 'array',
      of: [
        {
          type: 'string',
        }
      ]
    },
  ],
};
