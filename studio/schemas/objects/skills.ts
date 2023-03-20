import { defineType, Rule } from 'sanity';
import { getShortenedJoinedList } from '../../utils/array';

export default defineType({
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
          fields: [
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
              description: 'URL to a description or page for the skill',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      skills: 'skills',
    },
    prepare: ({
      title,
      skills,
    }: {
      title: string;
      skills: { name: string }[];
    }) => {
      const skillNames = skills?.map(({ name }) => name) ?? [];
      return {
        title,
        subtitle: getShortenedJoinedList(skillNames),
      };
    },
  },
});
