import { render, screen } from '@testing-library/react';
import Page from './Page';
import React from 'react';

jest.mock(
  'next/head',
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children,
);

describe('<Page />', () => {
  const originalProcessEnv = process.env;

  const props = {
    description: 'My description',
  };
  const mockChild = <span data-testid="test-child">I am test child</span>;

  afterEach(() => {
    process.env = originalProcessEnv;
  });

  it('should render', () => {
    const { container } = render(<Page {...props}>{mockChild}</Page>);

    expect(container.querySelector('div')).toHaveClass(
      'container mx-auto px-4 mt-20',
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('should render with title from process env', () => {
    process.env.NEXT_PUBLIC_NAME = 'MyPortfolio';
    const { container } = render(<Page {...props}>{mockChild}</Page>);

    expect(container.querySelector('title')).toHaveTextContent(
      process.env.NEXT_PUBLIC_NAME,
    );
  });

  it('should render with title from props and process.env', () => {
    process.env.NEXT_PUBLIC_NAME = 'MyPortfolio';
    const { container } = render(
      <Page {...props} title="My-Title">
        {mockChild}
      </Page>,
    );

    expect(container.querySelector('title')).toHaveTextContent(
      `${process.env.NEXT_PUBLIC_NAME} - My-Title`,
    );
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
});
