import { Rule } from 'sanity';

export default {
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
      initialValue: false
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Short description for the project',
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
      name: "backgroundImage",
      type: "image",
      title: "Background image",
      description: "Background image for the project. Should be in aspect ratio 4:3."
    }
  ],
};
