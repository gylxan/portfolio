import { NextRouter } from 'next/router';
import { vi } from 'vitest';

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
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
} as unknown as NextRouter;

export const useRouter = vi.fn().mockReturnValue(routerConfig);
