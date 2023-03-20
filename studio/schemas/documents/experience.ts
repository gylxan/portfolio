import { defineType, Rule } from 'sanity';
import { i18nConfig } from '../../config/i18n';

export default defineType({
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
              type: 'localeString',
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
              of: [{ type: 'localeString' }],
            },
          ],
          preview: {
            select: {
              role: 'role',
              startDate: 'startDate',
              endDate: 'endDate',
            },
            prepare: ({
              role,
              startDate,
              endDate,
            }) => {
              return {
                title: role[i18nConfig.base],
                subtitle: `${startDate} - ${endDate || 'Today'}`,
              };
            },
          },
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
      positions: { role: Record<string, string> }[];
    }) => {
      return {
        title: company,
        subtitle:
          positions
            .map((position) => position.role[i18nConfig.base])
            .join(', ') ?? '',
      };
    },
  },
});
