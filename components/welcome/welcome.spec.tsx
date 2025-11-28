import type { WelcomeProps } from 'components/welcome/welcome';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Welcome } from 'components';
import useSanityImage from 'hooks/useSanityImage';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('hooks/useSanityImage');
vi.mock('next-sanity');
vi.mock('use-intl');
vi.mock('next/router');

const mockUseSanityImage = vi.mocked(useSanityImage);

describe('<Welcome />', () => {
  const props: WelcomeProps = {
    introduction: 'Hi, I am',
    name: 'The user',
    buttonText: 'Click here',
    link: {
      _type: 'slug',
      current: '/about',
    },
    profileImage: {
      asset: { _ref: 'ref' },
    },
    description: {
      _type: 'block',
      children: [],
    },
  };

  beforeEach(() => {
    mockUseSanityImage.mockReset().mockReturnValue({
      src: 'https://domain.com/image',
      loader: vi.fn().mockReturnValue('https://domain.image.com?w=10'),
      width: 10,
      height: 10,
    });
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should render', async () => {
    render(<Welcome {...props} />);

    expect(screen.getByText(props.introduction)).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText(props.buttonText)).toBeInTheDocument();
    expect(screen.getByText(props.buttonText).tagName).toBe('A');
    expect(screen.getByText(props.buttonText).getAttribute('href')).toBe(
      props.link.current,
    );
    expect(screen.getAllByRole('link').length).toBe(2);
  });

  it('should not render link for profile image, when useSanityImage returns null', () => {
    mockUseSanityImage.mockReturnValue(null);
    render(<Welcome {...props} />);

    expect(screen.getAllByRole('link').length).toBe(1);
    expect(screen.getByRole('link').textContent).toBe(props.buttonText);
  });
});
