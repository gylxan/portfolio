import { defineType, Rule } from 'sanity';
import richtextEditor from './richtextEditor';

export default defineType({
  name: 'welcome',
  type: 'object',
  title: 'Welcome',
  fields: [
    {
      title: 'Profile Image',
      name: 'profileImage',
      type: 'image',
      validation: (rule: Rule) => rule.required(),
    },
    {
      title: 'Introduction',
      name: 'introduction',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      ...richtextEditor,
      title: 'Description',
      name: 'description',
      description: 'A short description about yourself',
      validation: (rule: Rule) => rule.required(),
    },
    {
      title: 'Button text',
      description: 'Text for the button',
      name: 'buttonText',
      type: 'string',
      validation: (rule: Rule) => rule.required(),
    },
    {
      title: 'Link',
      description: 'Link for the button and image',
      name: 'link',
      type: 'slug',
    }
  ],
  preview: {
    select: {
      introduction: 'introduction',
      name: 'name',
    },
    prepare: ({
      introduction,
      name,
    }: {
      introduction: string;
      name: string;
    }) => {
      return {
        title: `${introduction} ${name}`,
      };
    },
  },
});
