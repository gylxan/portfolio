import { ProjectProps } from 'components/project/project';
import Project from 'components/project/project';
import React from 'react';
import Loader from 'components/loader/loader';

export interface ProjectsProps {
  projects?: ProjectProps[];
}
const Projects = ({ projects }: ProjectsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects?.map((project) => (
        <Project key={project.name} {...project} />
      ))}
      <Loader />
    </div>
  );
};

export default Projects;
