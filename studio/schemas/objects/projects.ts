import { defineType } from 'sanity';

const projectTypes = [
  {
    title: 'All projects',
    value: 'all-projects',
  },
  {
    title: 'Private projects',
    value: 'private-projects',
  },
  {
    title: 'Work projects',
    value: 'work-projects',
  },
];
export default defineType({
  name: 'projects',
  type: 'object',
  title: 'Projects',
  fields: [
    {
      title: 'Project type',
      name: 'projectType',
      type: 'string',
      description: 'Project types to show',
      options: {
        list: projectTypes,
      },
      initialValue: 'all-projects',
    },
  ],
  preview: {
    select: {
      projectType: 'projectType',
    },
    prepare: ({ projectType }: { projectType: string }) => {
      return {
        title: 'Projects',
        subtitle: `${
          projectTypes.find(({ value }) => value === projectType)?.title ??
          'All projects'
        }`,
      };
    },
  },
});
