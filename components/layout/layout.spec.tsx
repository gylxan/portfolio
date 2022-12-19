import { render, screen } from '@testing-library/react';
import Layout from 'components/layout/layout';
import React from 'react';
import * as hooks from 'hooks/useSanityImage';
import { ImageLoader } from 'next/image';
import * as nextRouter from 'next/router';

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

  const props = {
    description: 'My description',
  };
  const mockChild = <span data-testid="test-child">I am test child</span>;
  const useRouterMock = jest.spyOn(nextRouter, 'useRouter');

  beforeEach(() => {
    process.env.NEXT_PUBLIC_URL = 'https://example.com';
    process.env.NEXT_PUBLIC_NAME = 'My name';
    useRouterMock.mockReturnValue({
      pathname: '/',
    } as nextRouter.NextRouter);
  });

  afterEach(() => {
    process.env = originalProcessEnv;
  });

  it('should render', () => {
    const { container } = render(<Layout {...props}>{mockChild}</Layout>);

    expect(container.querySelector('div')).toHaveClass(
      'container mx-auto px-4 mt-4 max-w-screen-lg',
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(
      container
        .querySelector('meta[property="og:url"]')
        ?.getAttribute('content'),
    ).toBe(process.env.NEXT_PUBLIC_URL);
    expect(
      container
        .querySelector('meta[property="og:type"]')
        ?.getAttribute('content'),
    ).toBe('website');
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
    ).toBe(`${title} | ${process.env.NEXT_PUBLIC_NAME}`);
  });

  it('should render with pathname from next router', () => {
    const path = '/path';
    useRouterMock.mockReturnValue({
      pathname: path,
    } as nextRouter.NextRouter);
    const { container } = render(<Layout {...props}>{mockChild}</Layout>);

    expect(
      container.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe(process.env.NEXT_PUBLIC_URL + path);
  });

  it('should render with title from props and process.env', () => {
    const title = 'My-Title';
    const { container } = render(
      <Layout {...props} title={title}>
        {mockChild}
      </Layout>,
    );

    expect(container.querySelector('title')).toHaveTextContent(title);
  });

  it('should render in full height', () => {
    const { container } = render(
      <Layout {...props} fullHeight>
        {mockChild}
      </Layout>,
    );

    expect(container.querySelector('div')).toHaveClass(
      'container mx-auto px-4 flex h-full flex-col justify-center',
    );
  });

  it('should render with given className', () => {
    const { container } = render(
      <Layout {...props} className="MyClass">
        {mockChild}
      </Layout>,
    );

    expect(container.querySelector('div')).toHaveClass('MyClass');
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
    ).toBe(process.env.NEXT_PUBLIC_URL + slug);
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
});