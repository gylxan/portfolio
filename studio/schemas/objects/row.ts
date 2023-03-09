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
      of: [...pageContent.filter(({ type }) => type !== 'row')],
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
};
