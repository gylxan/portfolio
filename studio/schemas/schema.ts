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
import posts from './objects/posts';
import column from './objects/column';
import experiences from './objects/experiences';
import projects from './objects/projects';
import translation from './translation';
import welcome from './objects/welcome';
import { getLocalizedObject } from '../utils/schema';

// Then we give our schema to the builder and provide the result to Sanity
export const schemaTypes = [
  category,
  company,
  customImage,
  column,
  experiences,
  page,
  post,
  posts,
  project,
  projects,
  richtextEditor,
  row,
  siteConfig,
  skills,
  translation,
  welcome,
  getLocalizedObject('text'),
  getLocalizedObject('string'),
];
