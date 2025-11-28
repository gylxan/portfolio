import { render, screen, waitFor } from '@testing-library/react';
import Layout, { LayoutProps } from 'components/layout/layout';
import React from 'react';
import * as hooks from 'hooks/useSanityImage';
import type { ImageLoader } from 'next/image';
import * as nextRouter from 'next/router';
import { mockSiteConfig } from 'constants/mock';
import { routerConfig } from '__mocks__/next/router';
import ReactDOM from 'react-dom'
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';


vi.mock('next-sanity')
vi.mock('use-intl')

vi.mock('hooks/useSanityImage');

const useSanityMock = vi.spyOn(hooks, 'default').mockReturnValue(null);

describe('<Layout />', () => {
  const originalProcessEnv = process.env;

  const props: LayoutProps = {
    siteConfig: mockSiteConfig,
    slug: '/',
  };
  const childText ="I am a test child"
  const mockChild = <span>{childText}</span>;
  const useRouterMock = vi.spyOn(nextRouter, 'useRouter');

  beforeEach(() => {
    useRouterMock.mockReturnValue(routerConfig);
  });

  afterEach(() => {
    process.env = originalProcessEnv;
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should render', async () => {
    const { container } = render(<Layout {...props}>{mockChild}</Layout>);

    expect(screen.getByRole('main').children[0]).toHaveClass(
      'container mx-auto max-w-(--breakpoint-lg) px-4 md:px-8',
    );
    expect(screen.getByText(childText)).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render in full height', () => {
    render(
      <Layout {...props} fullHeight>
        {mockChild}
      </Layout>,
    );

    expect(screen.getByRole('main').children[0]).toHaveClass(
      'container mx-auto px-4 flex h-full flex-col justify-center',
    );
  });

  it('should render with given className', () => {
    render(
      <Layout {...props} className="MyClass">
        {mockChild}
      </Layout>,
    );

    expect(screen.getByRole('main').children[0]).toHaveClass('MyClass');
  });

  it('should render without keywords, when not specified', () => {
    const { container } = render(
      <Layout {...props} siteConfig={{ ...props.siteConfig, keywords: [] }}>
        {mockChild}
      </Layout>,
    );

    expect(
      container.querySelector('meta[name="keywords"]'),
    ).not.toBeInTheDocument();
  });
});
