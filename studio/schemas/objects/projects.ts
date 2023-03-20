import { defineType } from 'sanity';

export default defineType({
  name: 'projects',
  type: 'object',
  title: 'Projects',
  fields: [
    {
      title: 'Projects',
      name: 'projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      project0: 'projects.0.name', // <- projects.0 is a reference to project, and the preview component will automatically resolve the reference and return the name
      project1: 'projects.1.name',
      project2: 'projects.2.name',
      projects: 'projects',
    },
    prepare: ({
      project0,
      project1,
      project2,
      projects,
    }: {
      project0: string;
      project1: string;
      project2: string;
      projects: Record<number, string>;
    }) => {
      const projects2 = [project0, project1, project2].filter(Boolean);
      const subtitle = projects2.length > 0 ? projects2.join(', ') : '';
      const otherProjectsQuantity = Object.keys(projects).length - 3;
      const hasMoreProjects = otherProjectsQuantity > 0;
      return {
        title: 'Projects',
        subtitle: hasMoreProjects
          ? `${subtitle} + ${otherProjectsQuantity} more`
          : subtitle,
      };
    },
  },
});
