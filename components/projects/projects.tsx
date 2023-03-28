import React from 'react';
import {
  paginatedProjectDocumentQuery,
  paginatedProjectOrderQuery,
  projectFields,
  projectPaginatedLimit,
} from 'constants/groq';
import { EndlessLoadingList, Project, ProjectSkeleton } from 'components';

const Projects = () => {
  return (
    <EndlessLoadingList
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      contextKey="project"
      idField="name"
      noEntryAvailableTranslationKey="no_projects_available"
      component={Project}
      skeleton={ProjectSkeleton}
      sortField="workDate"
      documentQuery={paginatedProjectDocumentQuery}
      orderQuery={paginatedProjectOrderQuery}
      fields={projectFields}
      limit={projectPaginatedLimit}
    />
  );
};

export default Projects;
