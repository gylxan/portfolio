import { render, screen } from '@testing-library/react';
import Layout, { LayoutProps } from 'components/layout/layout';
import React from 'react';
import * as hooks from 'hooks/useSanityImage';
import type { ImageLoader } from 'next/image';
import * as nextRouter from 'next/router';
import { mockSiteConfig } from 'constants/mock';
import { routerConfig } from '__mocks__/next/router';

jest.mock(
  'next/head',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children,
);

jest.mock('hooks/useSanityImage');

const useSanityMock = jest.spyOn(hooks, 'default').mockReturnValue(null);

describe('<Layout />', () => {
  const originalProcessEnv = process.env;

  const props: LayoutProps = {
    siteConfig: mockSiteConfig,
    slug: '/',
  };
  const mockChild = <span data-testid="test-child">I am test child</span>;
  const useRouterMock = jest.spyOn(nextRouter, 'useRouter');

  beforeEach(() => {
    useRouterMock.mockReturnValue(routerConfig);
  });

  afterEach(() => {
    process.env = originalProcessEnv;
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    const { container } = render(<Layout {...props}>{mockChild}</Layout>);

    expect(screen.getByRole('main').children[0]).toHaveClass(
      'container mx-auto max-w-screen-lg px-4 md:px-8',
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(
      container
        .querySelector('meta[property="og:url"]')
        ?.getAttribute('content'),
    ).toBe(props.siteConfig.url);
    expect(
      container
        .querySelector('meta[property="og:type"]')
        ?.getAttribute('content'),
    ).toBe('website');
    expect(
      container.querySelector('meta[name="keywords"]')?.getAttribute('content'),
    ).toBe(props.siteConfig.keywords.join(','));

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should render with title', () => {
    const title = 'MyPortfolio';
    const { container } = render(
      <Layout {...props} title={title}>
        {mockChild}
      </Layout>,
    );

    expect(container.querySelector('title')).toHaveTextContent(title);
    expect(
      container
        .querySelector('meta[property="og:title"]')
        ?.getAttribute('content'),
    ).toBe(`${title} | ${props.siteConfig.title}`);
  });

  it('should render with pathname from next router', () => {
    const path = '/path';
    useRouterMock.mockReturnValue({
      pathname: path,
    } as nextRouter.NextRouter);
    const { container } = render(
      <Layout {...props} slug={undefined}>
        {mockChild}
      </Layout>,
    );

    expect(
      container.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe(props.siteConfig.url + path);
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

  it('should render with slug in og:url, when slug is specified', () => {
    const slug = '/post';
    const { container } = render(
      <Layout {...props} slug={slug}>
        {mockChild}
      </Layout>,
    );

    expect(
      container
        .querySelector('meta[property="og:url"]')
        ?.getAttribute('content'),
    ).toBe(`${props.siteConfig.url}${slug}`);
  });

  it('should render with open graph image, when useSanity returns imageProps', () => {
    const imageProps = {
      loader: undefined as unknown as ImageLoader,
      src: 'http://url/image.png',
      width: 123,
      height: 123,
    };
    useSanityMock.mockReturnValue(imageProps);
    const { container } = render(<Layout {...props}>{mockChild}</Layout>);

    expect(
      container
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content'),
    ).toBe(imageProps.src);
  });

  it('should render article data, when specified type is "article"', () => {
    const articleData = { publishedTime: '2022-12-02T08:32:09Z' };
    const { container } = render(
      <Layout {...props} type="article" {...articleData}>
        {mockChild}
      </Layout>,
    );

    expect(
      container
        .querySelector('meta[property="og:type"]')
        ?.getAttribute('content'),
    ).toBe('article');
    expect(
      container
        .querySelector('meta[property="article:published_time"]')
        ?.getAttribute('content'),
    ).toBe(articleData.publishedTime);
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
