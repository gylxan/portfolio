import type { SiteConfig } from 'types/siteConfig';
import type { SanityAltImage, SanityImage } from 'types/image';
import { SkillsProps } from 'components/skills/skills';
import { Project } from 'types/project';

export const mockSanityImage: SanityImage = {
  asset: {
    _ref: 'ref123',
  },
};

export const mockSanityAltImage: SanityAltImage = {
  ...mockSanityImage,
  alt: 'My alt value',
};

export const mockSiteConfig: SiteConfig = {
  description: 'Site description',
  keywords: ['React', 'Next.js', 'Javascript'],
  title: 'My site',
  copyright: '(c) by me',
  url: 'https://mysite.com',
  menuLinks: [
    {
      title: 'About',
      slug: { _type: 'slug', current: 'about' },
    },
    {
      title: 'Link 2',
      slug: { _type: 'slug', current: 'link2' },
    },
  ],
  safariTabIcon: mockSanityImage,
  appleTouchIcon: mockSanityImage,
  openGraphImage: mockSanityImage,
  logo: mockSanityAltImage,
  social: [
    {
      media: 'github',
      url: 'https://github.com/testuser',
    },
    {
      media: 'spotify',
      url: 'https://spotify.com/user/1233',
    },
  ],
};

export const mockSkills = [
  {
    name: 'TypeScript',
    url: 'https://typescript.com',
  },
  {
    name: 'JavaScript',
  },
  {
    name: 'React',
    url: 'https://react.com',
  },
];

export const mockProjects: Project[] = [
  {
    name: 'Project name',
    description: 'project description',
    private: false,
    keywords: ['react', 'typescript'],
    githubUrl: 'https://github.com/tester/project',
  },
  {
    name: 'Project name 2',
    description: 'Project description',
    private: true,
    keywords: ['CSS', 'Javascript'],
    previewUrl: 'https://project2.com',
  },
];
