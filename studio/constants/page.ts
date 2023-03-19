import link from '../schemas/objects/link';

export const pageContentTypes = [
  { type: 'column' },
  { type: 'experiences' },
  { type: 'posts' },
  { type: 'projects' },
  { type: 'row' },
  { type: 'skills' },
  { type: 'welcome' },
  {
    type: 'block',
    marks: {
      annotations: [link],
    },
  },
];
