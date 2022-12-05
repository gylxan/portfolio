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
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'skills' }],
    },
  ],
};
