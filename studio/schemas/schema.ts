import post from './post';
import category from './category';
import page from './page';
import company from './experience';
import skills from './objects/skills';
import richtextEditor from './objects/richtextEditor';
import customImage from './objects/customImage';

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
