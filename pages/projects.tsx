import { Layout, Project, Title } from 'components';
import type { ProjectProps } from 'components/project/project';
import { parseJSON } from 'utils/json';
import type { GetStaticProps } from 'next';
import client from 'utils/sanity';
import type { SiteConfig } from 'types/siteConfig';
import { configQuery } from 'constants/groq';

interface Props {
  projects: ProjectProps[];
  siteConfig: SiteConfig;
}
const Projects = ({ projects, siteConfig }: Props) => {
  return (
    <Layout title="Projects" siteConfig={siteConfig}>
      <Title>Projects</Title>
      <div className="container mt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Project key={project.name} {...project} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const siteConfig = await client.fetch<SiteConfig>(configQuery);
  return {
    props: {
      projects: parseJSON<ProjectProps[]>(process.env.NEXT_PUBLIC_PROJECTS, []),
      siteConfig,
    },
  };
};

export default Projects;
