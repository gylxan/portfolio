import { render, screen } from '@testing-library/react';
import SanityImage, {
  ImageProps,
} from 'components/portable-text/types/sanityImage';
import * as hooks from 'hooks/useSanityImage';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

vi.mock('hooks/useSanityImage');
vi.mock('next-sanity');

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
    renderNode: vi.fn(),
  };

  const imageProps = {
    loader: vi.fn().mockReturnValue('https://cdn.sanity.io/image.png?w=123'),
    src: 'https://cdn.sanity.io/image.png',
    width: 123,
    height: 123,
  };

  const useSanityMock = vi.spyOn(hooks, 'default');

  beforeEach(() => {
    useSanityMock.mockReturnValue(imageProps);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('should render', async () => {
    render(<SanityImage {...props} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('alt')).toBe(value.alt);
    expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy');
  });

  it('should render null, when imageProps are null', async () => {
    useSanityMock.mockReturnValue(null);
    render(<SanityImage {...props} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render with default values', async () => {
    render(
      <SanityImage
        {...props}
        value={{ ...value, alt: '', asset: { ...value.asset, metadata: {} } }}
      />,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('alt')).toBe(' ');
    expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy');
  });
});
