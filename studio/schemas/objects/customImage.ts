import { defineType } from 'sanity';

export default defineType({
  name: 'customImage',
  type: 'image',
  title: 'Image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      description: 'Important for SEO and accessibility',
    },
  ],
});
