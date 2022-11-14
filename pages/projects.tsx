import Page from '../components/Page/Page';
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';
import Project, { ProjectProps } from '../components/Project/Project';
import { parseJSON } from '../utils/json';
import { GetStaticProps } from 'next';

interface Props {
  projects: ProjectProps[];
}
const Projects = ({ projects }: Props) => {
  return (
    <Page title="Projects">
      <AnimatedTitle title="Projects" />
      <div className="container mt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Project key={project.name} {...project} />
          ))}
        </div>
      </div>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      projects: parseJSON<ProjectProps[]>(process.env.NEXT_PUBLIC_PROJECTS, []),
    },
  };
};

export default Projects;
