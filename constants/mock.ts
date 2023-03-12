import type { SiteConfig } from 'types/siteConfig';
import type { SanityAltImage, SanityImage } from 'types/image';
import { Project } from 'types/project';
import { SanityFile } from 'types/file';

export const mockSanityImage: SanityImage = {
  asset: {
    _ref: 'ref123',
  },
};

export const mockSanityAltImage: SanityAltImage = {
  ...mockSanityImage,
  alt: 'My alt value',
};

export const mockSanityFile: SanityFile = {
  asset: {
    _createdAt: '2023-03-11T14:13:52Z',
    _id: 'file-e5cea496b5343aecf7021f9625749e9be7f49d21-pdf',
    _rev: 'i49QvTuSpEZVuFsrZdxnje',
    _type: 'sanity.fileAsset',
    _updatedAt: '2023-03-11T14:13:52Z',
    assetId: 'e5cea496b5343aecf7021f9625749e9be7f49d21',
    extension: 'pdf',
    mimeType: 'application/pdf',
    originalFilename: 'test.pdf',
    path: 'files/22awa/production/12341.pdf',
    sha1hash: 'e5cea496b5343aecf7021f9625749e9be7f49d21',
    size: 4624343,
    uploadId: 'dllIfiyagtq9S3nyOqkp7PVoS3v9XeoC',
    url: 'https://cdn.sanity.io/files/22awa/production/test.pdf',
    metadata: {},
  },
};

export const mockSiteConfig: SiteConfig = {
  description: 'Site description',
  keywords: ['React', 'Next.js', 'Javascript'],
  title: 'My site',
  copyright: '(c) by me',
  url: 'https://mysite.com',
  menuLinks: [
    {
      title: 'Link 1',
      slug: { _type: 'slug', current: 'https://link1.com' },
    },
    {
      title: 'Link 2',
      slug: { _type: 'slug', current: 'https://link2.com' },
    },
    {
      title: 'Link 3',
      slug: { _type: 'slug', current: 'https://link3.com' },
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
  resume: mockSanityFile,
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
