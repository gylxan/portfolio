import EndlessScrollingItem, {
  EndlessLoadingItemProps,
} from 'components/endless-scrolling-item/endless-scrolling-item';
import { render, screen } from '@testing-library/react';
import { InViewHookResponse, useInView } from 'react-intersection-observer';

jest.mock('react-intersection-observer', () => {
  const actual = jest.requireActual('react-intersection-observer');
  return {
    ...actual,
    useInView: jest.fn().mockReturnValue({
      ref: jest.fn(),
      inView: true,
    }),
  };
});

const mockUseInView = useInView as jest.MockedFunction<typeof useInView>;

describe('<EndlessScrollingItem />', () => {
  const props: EndlessLoadingItemProps = {
    onLoad: jest.fn(),
    enabled: true,
  };

  const text = 'My child';
  const children = <div>{text}</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    render(<EndlessScrollingItem {...props}>{children}</EndlessScrollingItem>);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  describe('onLoad', () => {
    const onLoad = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterAll(() => {
      jest.resetAllMocks();
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
