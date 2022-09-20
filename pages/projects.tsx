import type { NextPage } from 'next';
import Page from '../components/Page/Page';
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';
import { ConfigKey, Format, getConfig } from '../utils/config';
import Project, { ProjectProps } from '../components/Project/Project';

interface ProjectsProps {
  projects: ProjectProps[];
}

const Projects: NextPage<ProjectsProps> = ({ projects }) => {
  return (
    <Page title="Projects" description="Private and work-related projects">
      <AnimatedTitle title="Projects" />
      <div className="container mt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Project key={project.name} {...project} delay={index * 100} />
          ))}
        </div>
      </div>
    </Page>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      projects: getConfig(ConfigKey.PROJECTS, [], Format.JSON),
    },
  };
};

export default Projects;
