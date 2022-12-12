import post from './post.js';
import category from './category.js';
import page from './page.js';
import company from './experience.js';
import skills from './objects/skills.js';
import richtextEditor from './objects/richtextEditor.jsx';
import customImage from './objects/customImage.js';

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [
  post,
  category,
  page,
  company,
  skills,
  richtextEditor,
  customImage,
];
