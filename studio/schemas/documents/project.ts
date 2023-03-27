import { defineType, Rule } from 'sanity';

export default defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'Name of the project',
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: 'private',
      type: 'boolean',
      title: 'Private project',
      description: 'Whether the project is private or a work project',
      initialValue: false,
    },
    {
      name: 'description',
      type: 'localeString',
      title: 'Description',
      description: 'Short description for the project',
    },
    {
      name: 'workDate',
      type: 'date',
      title: 'Work date',
      description:
        'Date you worked on this project the last time (Used for sorting)',
      initialValue: () => {
        const date = new Date();
        return `${date.getFullYear()}-${
          date.getMonth() <= 9 ? `0${date.getMonth()}` : date.getMonth()
        }-${date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}`;
      },
    },
    {
      name: 'previewUrl',
      type: 'url',
      title: 'Preview URL',
      description: 'URL to a preview of the project',
    },
    {
      name: 'githubUrl',
      type: 'url',
      title: 'GitHub URL',
      description: 'URL to the GitHub repository of the project',
    },
    {
      name: 'keywords',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Keywords',
      description: 'Technologies and tools used for the project',
      initialValue: [],
    },
    {
      name: 'backgroundImage',
      type: 'image',
      title: 'Background image',
      description:
        'Background image for the project. Should be in aspect ratio 4:3.',
    },
  ],
  options: {
    // show language filter for this document type, regardless of how documentTypes for the plugin is configured
    languageFilter: true,
  },
});
