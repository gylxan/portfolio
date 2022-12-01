// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

import post from './post.js';
import category from './category.js';
import page from './page.js';
import company from './experience.js';
import skills from './objects/skills.js';
import richtextEditor from './objects/richtextEditor.jsx';
import customImage from "./objects/customImage.js";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    post,
    category,
    page,
    company,
    skills,
    richtextEditor,
    customImage
  ]),
});
