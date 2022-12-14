export default {
  name: 'experience',
  type: 'document',
  title: 'Experience',
  fields: [
    {
      name: 'company',
      type: 'string',
      title: 'Company',
      description: 'Company name you worked for',
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
            },
            {
              name: 'endDate',
              type: 'date',
              title: 'End date',
            },
          ],
        },
      ],
    },
  ],
};
