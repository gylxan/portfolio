import pageContent from './pageContent';

export default {
  name: 'column',
  type: 'object',
  title: 'Column',
  description: 'A column with content',
  fields: [
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Content',
      of: [...pageContent.filter(({ type }) => type !== 'column')],
    },
    {
      name: 'space',
      type: 'number',
      title: 'Choose a space between the rows',
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
    {
      name: 'alignment',
      type: 'string',
      title: 'Choose an alignment for content',
      initialValue: 'left',
      options: {
        list: [
          { title: 'left', value: 'start' },
          { title: 'center', value: 'center' },
          { title: 'right', value: 'end' },
        ],
      },
    },
  ],
};
