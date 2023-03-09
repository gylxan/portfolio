import post from './post';
import category from './category';
import page from './page';
import company from './experience';
import project from './project';
import siteConfig from './siteConfig';
import customImage from './objects/customImage';
import richtextEditor from './objects/richtextEditor';
import row from './objects/row';
import skills from './objects/skills';
import column from './objects/column';
import experiences from './objects/experiences';
import projects from './objects/projects';
import welcome from './objects/welcome';

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [
  post,
  category,
  page,
  company,
  skills,
  richtextEditor,
  customImage,
  siteConfig,
  project,
  row,
  column,
  experiences,
  projects,
  welcome,
];
