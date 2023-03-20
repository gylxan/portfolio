import { pageContentTypes } from '../../constants/page';
import { getShortenedJoinedList } from '../../utils/array';
import { defineType } from 'sanity';

const spaces: Record<number, { title: string; value: number }> = {
  10: { title: '10', value: 10 },
  8: { title: '8', value: 8 },
  6: { title: '6', value: 6 },
  4: { title: '4', value: 4 },
  2: { title: '2', value: 2 },
  0: { title: '0', value: 0 },
};

const alignments: Record<string, { title: string; value: string }> = {
  start: { title: 'left', value: 'start' },
  center: { title: 'center', value: 'center' },
  end: { title: 'right', value: 'end' },
};

const rowSwitchSizes: Record<string, { title: string; value: string }> = {
  never: { title: 'never', value: 'never' },
  sm: { title: 'Small', value: 'sm' },
  md: { title: 'Medium', value: 'md' },
  lg: { title: 'Large', value: 'lg' },
  xl: { title: 'Extra large', value: 'xl' },
};
export default defineType({
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
      of: [...pageContentTypes],
    },
    {
      name: 'space',
      type: 'number',
      title: 'Choose a space between the rows',
      initialValue: 2,
      options: {
        list: Object.values(spaces),
      },
    },
    {
      name: 'alignment',
      type: 'string',
      title: 'Choose an alignment for content',
      initialValue: 'start',
      options: {
        list: Object.values(alignments),
      },
    },
    {
      name: 'rowSwitchSize',
      type: 'string',
      title:
        "Change to row, starting from size. 'never' when always be a column.",
      initialValue: 'never',
      options: {
        list: Object.values(rowSwitchSizes),
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
      space: number;
      alignment: string;
      rowSwitchSize: string;
      content: { _type: string }[];
    }) => {
      const contentTypes = content?.map(({ _type }) => _type) ?? [];
      return {
        title: `Column (space: ${spaces[space]?.title}, alignment: ${
          alignments[alignment]?.title ?? 'left'
        }, row switch size: ${rowSwitchSizes[rowSwitchSize].title})`,
        subtitle: getShortenedJoinedList(contentTypes),
      };
    },
  },
});
