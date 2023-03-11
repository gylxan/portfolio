import { getBlurDataUrl } from 'utils/sanity';
import type { SanityImage } from 'types/image';
import { blurImageUrl } from 'constants/image';

describe('Sanity utils', () => {
  describe('getBlurDataUrl', () => {
    const image = {
      asset: {
        metadata: {
          lqip: '1234',
        },
      },
    } as unknown as SanityImage;

    it('should return the lqip from the asset metadata', () => {
      expect(getBlurDataUrl(image)).toBe(image.asset.metadata.lqip);
    });

    it('should return blurImageUrl, when image is null', () => {
      expect(getBlurDataUrl(null)).toBe(blurImageUrl);
    });

    it('should return blurImageUrl, when asset is undefined or null', () => {
      expect(
        getBlurDataUrl({ ...image, asset: null } as unknown as SanityImage),
      ).toBe(blurImageUrl);
    });

    it('should return blurImageUrl, when metadata is undefined or null', () => {
      expect(
        getBlurDataUrl({ ...image, asset: { ...image.asset, metadata: null } }),
      ).toBe(blurImageUrl);
    });
  });
});
