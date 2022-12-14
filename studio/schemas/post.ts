import richtextEditor from './objects/richtextEditor.jsx';

export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title of the post. Recommended: 60 chars',
      validation: (Rule) => Rule.required().min(5),
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
      validation: (Rule) => Rule.required(),
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
  ],
};
