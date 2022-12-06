import { act, render, screen } from '@testing-library/react';
import SanityImage, { ImageProps } from 'components/portable-text/types/sanityImage';
import * as hooks from 'hooks/useSanityImage';

jest.mock('hooks/useSanityImage');

describe('<SanityImage />', () => {
  const value = {
    alt: 'alt',
    asset: {
      _ref: '123',
      metadata: {
        lqip: '1234',
      },
    },
  };

  const props: ImageProps = {
    index: 0,
    isInline: false,
    value,
    renderNode: jest.fn(),
  };

  const imageProps = {
    loader: jest.fn(),
    src: 'http://url/image.png',
    width: 123,
    height: 123,
  };

  const useSanityMock = jest.spyOn(hooks, 'default');

  beforeEach(() => {
    useSanityMock.mockReturnValue(imageProps);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render', async () => {
    await act(() => {
      render(<SanityImage {...props} />);
    });

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('alt')).toBe(value.alt);
    expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy');
  });

  it('should render null, when imageProps are null', async () => {
    useSanityMock.mockReturnValue(null);
    await act(() => {
      render(<SanityImage {...props} />);
    });

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render with default values', async () => {
    await act(() => {
      render(
        <SanityImage
          {...props}
          value={{ ...value, alt: '', asset: { ...value.asset, metadata: {} } }}
        />,
      );
    });

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('alt')).toBe(' ');
    expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy');
  });
});
