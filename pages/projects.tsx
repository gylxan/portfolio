import Project, { ProjectProps } from '../components/Project/Project';
import { parseJSON } from '../utils/json';
import Title from '../components/Title/Title';

const Projects = () => {
  return (
    <>
      <Title title="Projects" animatedTitle={true}/>
      <div className="container mt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {parseJSON<ProjectProps[]>(process.env.NEXT_PUBLIC_PROJECTS, []).map(
            (project, index) => (
              <Project key={project.name} {...project} delay={index * 100} />
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
