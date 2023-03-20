import { defineType } from 'sanity';

export default defineType({
  name: 'experiences',
  type: 'object',
  title: 'Experiences',
  fields: [
    {
      title: 'Companies',
      name: 'companies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'experience' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      company0: 'companies.0.company', // <- projects.0 is a reference to project, and the preview component will automatically resolve the reference and return the name
      company1: 'companies.1.company',
      company2: 'companies.2.company',
      companies: 'companies',
    },
    prepare: ({
      company0,
      company1,
      company2,
      companies,
    }: {
      company0: string;
      company1: string;
      company2: string;
      companies: Record<number, string>;
    }) => {
      const firstCompanies = [company0, company1, company2].filter(Boolean);
      const subtitle =
        firstCompanies.length > 0 ? firstCompanies.join(', ') : '';
      const otherCompaniesQuantity = Object.keys(companies).length - 3;
      const hasMoreCompanies = otherCompaniesQuantity > 0;
      return {
        title: 'Companies',
        subtitle: hasMoreCompanies
          ? `${subtitle} + ${otherCompaniesQuantity} more`
          : subtitle,
      };
    },
  },
});
