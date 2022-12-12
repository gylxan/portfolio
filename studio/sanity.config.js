import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas/schema';
import { codeInput } from '@sanity/code-input';

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio',
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  basePath: '/studio',

  plugins: [deskTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
  form: {
    images: {
      directUploads: true
    }
  }
});
