import { getShortenedJoinedList } from '../../utils/array';
import { pageContentTypes } from '../../constants/page';
import { defineType } from 'sanity';

const spaces = [
  { title: '10', value: 10 },
  { title: '8', value: 8 },
  { title: '6', value: 6 },
  { title: '4', value: 4 },
  { title: '2', value: 2 },
  { title: '0', value: 0 },
];
export default defineType({
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
      of: [...pageContentTypes],
    },
    {
      name: 'space',
      type: 'number',
      title: 'Choose a space between the columns',
      initialValue: 2,
      options: {
        list: spaces,
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
      space: number;
      content: { _type: string }[];
    }) => {
      const contentTypes = content.map(({ _type }) => _type) ?? [];
      return {
        title: `Row (space: ${
          spaces.find(({ value }) => value === space)?.title
        })`,
        subtitle: getShortenedJoinedList(contentTypes),
      };
    },
  },
});
