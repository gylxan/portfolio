import { Rule } from "sanity";

export default {
  name: 'skills',
  type: 'object',
  title: 'Skills',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Title used for the skill section',
    },
    {
      title: 'Skills',
      name: 'skills',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'skill',
          title: 'Skill',
          fields:[
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              description: 'Name of the skill',
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              description: 'URL to a description or page for the skill'
            }
          ]
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slugs: 'slugs',
    },
    prepare: ({
      title,
      slugs,
    }: {
      title: string;
      slugs: string[];
    }) => {
      return {
        title,
        subtitle: slugs?.join(',') ?? '',
      };
    },
  },
};
