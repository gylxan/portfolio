import EndlessScrollingItem, {
  EndlessScrollingItemProps,
} from 'components/endless-scrolling-item/endless-scrolling-item';
import { render, screen } from '@testing-library/react';
import { InViewHookResponse, useInView } from 'react-intersection-observer';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react-intersection-observer', async (importOriginal) => {
  return {
    ...(await importOriginal()),
    useInView: vi.fn().mockReturnValue({
      ref: vi.fn(),
      inView: true,
    }),
  };
});

const mockUseInView = vi.mocked(useInView);

describe('<EndlessScrollingItem />', () => {
  const props: EndlessScrollingItemProps = {
    onLoad: vi.fn(),
    enabled: true,
  };

  const text = 'My child';
  const children = <div>{text}</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it('renders', () => {
    render(<EndlessScrollingItem {...props}>{children}</EndlessScrollingItem>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  describe('onLoad', () => {
    const onLoad = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
    });

    afterAll(() => {
      vi.resetAllMocks();
    });

    it('triggers onLoad, when element in view and enabled', () => {
      render(
        <EndlessScrollingItem {...props} onLoad={onLoad}>
          {children}
        </EndlessScrollingItem>,
      );

      expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it('does not trigger onLoad, when element not view and enabled', () => {
      mockUseInView.mockReturnValue({
        inView: false,
      } as InViewHookResponse);

      render(
        <EndlessScrollingItem {...props} onLoad={onLoad}>
          {children}
        </EndlessScrollingItem>,
      );

      expect(onLoad).toHaveBeenCalledTimes(0);
    });

    it('does not trigger onLoad, when element in view and disabled', () => {
      render(
        <EndlessScrollingItem {...props} enabled={false} onLoad={onLoad}>
          {children}
        </EndlessScrollingItem>,
      );

      expect(onLoad).toHaveBeenCalledTimes(0);
    });
  });
});
