import type { WelcomeProps } from 'components/welcome/welcome';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { Welcome } from 'components';
import useSanityImage from 'hooks/useSanityImage';

jest.mock('hooks/useSanityImage');

const mockUseSanityImage = useSanityImage as jest.MockedFunction<
  typeof useSanityImage
>;

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
    mockUseSanityImage.mockReturnValue({
      src: 'https://domain.com/image',
      loader: jest.fn(),
      width: 10,
      height: 10,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render', async () => {
    await act(() => {
      render(<Welcome {...props} />);
    });

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
    act(() => {
      render(<Welcome {...props} />);
    });

    expect(screen.getAllByRole('link').length).toBe(1);
    expect(screen.getByRole('link').textContent).toBe(props.buttonText);
  });
});
