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
      of: [...pageContent],
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
      initialValue: 'start',
      options: {
        list: [
          { title: 'left', value: 'start' },
          { title: 'center', value: 'center' },
          { title: 'right', value: 'end' },
        ],
      },
    },
    {
      name: 'rowSwitchSize',
      type: 'string',
      title: 'Change to row, starting from size. \'never\' when always be a column.',
      initialValue: 'never',
      options: {
        list: [
          { title: 'never', value: 'never' },
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra large', value: 'xl' },
        ],
      },
    },
  ],
  preview: {
    select: {
      space: 'space',
      alignment: 'alignment',
      content: 'content',
      rowSwitchSize: 'rowSwitchSize',
    },
    prepare: ({
      space,
      alignment,
      content,
      rowSwitchSize,
    }: {
      space: string;
      alignment: string;
      rowSwitchSize: string;
      content: { _type: string }[];
    }) => {
      const contentTypes = content?.map(({ _type }) => _type) ?? [];
      return {
        title: `Column (space: ${space}, alignment: ${
          alignment ?? 'start'
        }, row switch size: ${rowSwitchSize})`,
        subtitle:
          contentTypes.length > 3
            ? `${contentTypes.slice(0, 3).join(', ')}...`
            : contentTypes.join(', '),
      };
    },
  },
};
