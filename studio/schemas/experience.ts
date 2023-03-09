import { Rule } from 'sanity';

export default {
  name: 'experience',
  type: 'document',
  title: 'Experience',
  fields: [
    {
      name: 'company',
      type: 'string',
      title: 'Company',
      description: 'Name of the company you have worked for',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'Link to the company home page',
    },
    {
      name: 'positions',
      type: 'array',
      title: 'Positions',
      of: [
        {
          name: 'position',
          type: 'object',
          title: 'Position',
          fields: [
            {
              name: 'role',
              type: 'string',
              title: 'Role',
            },
            {
              name: 'startDate',
              type: 'date',
              title: 'Start date',
              description: 'Date you started the role',
            },
            {
              name: 'endDate',
              type: 'date',
              title: 'End date',
              description:
                'Date you ended the role. Let it empty, if you are currently working in this role',
            },
            {
              name: 'tasks',
              type: 'array',
              title: 'Tasks',
              description: 'Tasks you had in the position',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      company: 'company',
      positions: 'positions',
    },
    prepare: ({
      company,
      positions,
    }: {
      company: string;
      positions: { role: string }[];
    }) => {
      return {
        title: company,
        subtitle: positions.map((position) => position.role).join(', ') ?? '',
      };
    },
  },
};
