import type {SanitySiteConfig, SiteConfig, TranslationNamespace} from 'types/siteConfig';
import type { SanityAltImage, SanityImage } from 'types/image';
import { Project } from 'types/project';
import { SanityFile } from 'types/file';
import {Post} from "types/post";

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

export const mockTranslationNamespaces: TranslationNamespace[]= [
  {
    namespace: "blog",
    translations: [{
      key: "title",
      value: "Title"
    },
      {
        key: "other-translation",
        value: "Other translation"
      },
    ]
  },
  {
    namespace: "welcome",
    translations: [{
      key: "image",
      value: "This is an image"
    },
      {
        key: "other-translation",
        value: "Other translation"
      },
    ]
  }
]

export const mockSiteConfig: SanitySiteConfig = {
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
  translations: mockTranslationNamespaces
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

export const mockPosts: Post[] = [
  {
    _id: '1',
    title: 'Post 1',
    description: 'Description for post 1',
    _createdAt: '2022-10-22',
    slug: { _type: 'slug', current: 'post1' },
    estimatedReadingTime: 12345,
    mainImage: {
      asset: {
        _ref: '123',
        metadata: {
          lqid: '12324',
        },
      },
    },
    categories: [
      {
        name: 'Category 1',
        description: 'Description for category 1',
      },
    ],
    content: {
      _type: 'block',
      children: [],
    },
  },
  {
    _id: '2',
    title: 'Post 2',
    description: 'Description for post 2',
    _createdAt: '2022-10-22',
    slug: { _type: 'slug', current: 'post-2' },
    estimatedReadingTime: 12345,
    mainImage: {
      asset: {
        _ref: '234',
        metadata: {
          lqid: '4343211',
        },
      },
    },
    categories: [
      {
        name: 'Category 2',
        description: 'Description for category 2',
      },
      {
        name: 'Category 3',
        description: 'Description for category 3',
      },
    ],
    content: {
      _type: 'block',
      children: [],
    },
  },
];



