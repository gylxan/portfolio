import { renderHook } from '@testing-library/react';
import useSanityImage from 'hooks/useSanityImage';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { useNextSanityImage } from 'next-sanity-image';

jest.mock('next-sanity-image', () => ({
  useNextSanityImage: jest.fn(),
}));

const useNextSanityImageMock = useNextSanityImage as jest.Mock;

describe('useSanityImage', () => {
  const imageProps = { src: '/image-src' };

  beforeEach(() => {
    useNextSanityImageMock.mockReturnValue(imageProps);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return imageProps', () => {
    const { result } = renderHook(() =>
      useSanityImage({ asset: { _ref: '1234' } }),
    );

    expect(result.current).toBe(imageProps);
  });

  it('should return null, when no image is provided', () => {
    const { result } = renderHook(() => useSanityImage(null));

    expect(result.current).toBeNull();
  });

  it('should return null, when image does not contain asset', () => {
    const { result } = renderHook(() =>
      useSanityImage({
        hotspot: { x: 1, y: 1, height: 10, width: 10 },
      } as SanityImageObject),
    );

    expect(result.current).toBeNull();
  });
});
