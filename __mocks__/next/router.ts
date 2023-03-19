import { NextRouter } from 'next/router';

export const routerConfig: NextRouter = {
  asPath: '/test',
  basePath: '',
  pathname: '/[[...slug]]',
  route: '/[[...slug]]',
  locale: 'en',
  query: {
    slug: ['test'],
  },
  isLocaleDomain: false,
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
} as unknown as NextRouter;
export const useRouter = jest.fn().mockReturnValue(routerConfig);
