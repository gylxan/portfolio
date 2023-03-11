import link from './link';

export default [
  { type: 'skills' },
  { type: 'customImage' },
  { type: 'row' },
  { type: 'column' },
  { type: 'experiences' },
  { type: 'projects' },
  { type: 'welcome' },
  {
    type: 'block',
    marks: {
      annotations: [link],
    },
  },
];
