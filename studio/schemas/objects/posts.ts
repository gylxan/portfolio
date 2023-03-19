import { defineType } from 'sanity';

export default defineType({
  name: 'posts',
  type: 'object',
  title: 'Posts',
  fields: [
    {
      title: 'Categories',
      name: 'categories',
      description:
        'Categories for which posts should be loaded for. Empty loads all posts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      categories: 'categories',
    },
    prepare: ({ categories }: { categories: string[] }) => {
      return {
        title: 'Posts',
        subtitle: categories?.length
          ? `${categories?.length} categories`
          : 'All categories',
      };
    },
  },
});
