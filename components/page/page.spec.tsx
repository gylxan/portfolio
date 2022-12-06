import { render, screen } from '@testing-library/react';
import Page from 'components/page/page';
import React from 'react';
import * as hooks from 'hooks/useSanityImage';
import { ImageLoader } from 'next/image';

jest.mock(
  'next/head',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children,
);

jest.mock('hooks/useSanityImage');

const useSanityMock = jest.spyOn(hooks, 'default').mockReturnValue(null);

describe('<Page />', () => {
  const originalProcessEnv = process.env;

  const props = {
    description: 'My description',
  };
  const mockChild = <span data-testid="test-child">I am test child</span>;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_URL = 'https://example.com';
  });
  afterEach(() => {
    process.env = originalProcessEnv;
  });

  it('should render', () => {
    const { container } = render(<Page {...props}>{mockChild}</Page>);

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
        .querySelector('meta[property="og:url"]')
        ?.getAttribute('content'),
    ).toBe(process.env.NEXT_PUBLIC_URL);
  });

  it('should render with title', () => {
    const title = 'MyPortfolio';
    const { container } = render(
      <Page {...props} title={title}>
        {mockChild}
      </Page>,
    );

    expect(container.querySelector('title')).toHaveTextContent(title);
  });

  it('should render with title from props and process.env', () => {
    const title = 'My-Title';
    const { container } = render(
      <Page {...props} title={title}>
        {mockChild}
      </Page>,
    );

    expect(container.querySelector('title')).toHaveTextContent(title);
  });

  it('should render in full height', () => {
    const { container } = render(
      <Page {...props} fullHeight>
        {mockChild}
      </Page>,
    );

    expect(container.querySelector('div')).toHaveClass(
      'container mx-auto px-4 flex h-full flex-col justify-center',
    );
  });

  it('should render with given className', () => {
    const { container } = render(
      <Page {...props} className="MyClass">
        {mockChild}
      </Page>,
    );

    expect(container.querySelector('div')).toHaveClass('MyClass');
  });

  it('should render with slug in og:url, when slug is specified', () => {
    const slug = '/post';
    const { container } = render(
      <Page {...props} slug={slug}>
        {mockChild}
      </Page>,
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
    }
    useSanityMock.mockReturnValue(imageProps);
    const { container } = render(
      <Page {...props} >
        {mockChild}
      </Page>,
    );

    expect(
      container
        .querySelector('meta[property="og:image"]')
        ?.getAttribute('content'),
    ).toBe(imageProps.src);

  });
});
