import pageContent from './pageContent';

export default {
  name: 'row',
  type: 'object',
  title: 'Row',
  description: 'A row with content. On mobile breaks to a column',
  fields: [
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Content',
      of: [...pageContent],
    },
    {
      name: 'space',
      type: 'number',
      title: 'Choose a space between the columns',
      initialValue: 2,
      options: {
        list: [
          { title: '10', value: 10 },
          { title: '8', value: 8 },
          { title: '6', value: 6 },
          { title: '4', value: 4 },
          { title: '2', value: 2 },
          { title: '0', value: 0 },
        ],
      },
    },
  ],
  preview: {
    select: {
      space: 'space',
      content: 'content',
    },
    prepare: ({
      space,
      content,
    }: {
      space: string;
      content: { _type: string }[];
    }) => {
      const contentTypes = content.map(({ _type }) => _type) ?? [];
      return {
        title: `Row (space: ${space})`,
        subtitle:
            contentTypes.length > 3
            ? `${contentTypes.slice(0, 3).join(', ')}...`
            : contentTypes.join(', '),
      };
    },
  },
};
