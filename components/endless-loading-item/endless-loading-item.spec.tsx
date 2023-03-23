import EndlessLoadingItem, {
  EndlessLoadingItemProps,
} from 'components/endless-loading-item/endless-loading-item';
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

describe('<EndlessLoadingItem />', () => {
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
    render(<EndlessLoadingItem {...props}>{children}</EndlessLoadingItem>);

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
        <EndlessLoadingItem {...props} onLoad={onLoad}>
          {children}
        </EndlessLoadingItem>,
      );

      expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it('does not trigger onLoad, when element not view and enabled', () => {
      mockUseInView.mockReturnValue({
        inView: false,
      } as InViewHookResponse);

      render(
        <EndlessLoadingItem {...props} onLoad={onLoad}>
          {children}
        </EndlessLoadingItem>,
      );

      expect(onLoad).toHaveBeenCalledTimes(0);
    });

    it('does not trigger onLoad, when element in view and disabled', () => {
      render(
        <EndlessLoadingItem {...props} enabled={false} onLoad={onLoad}>
          {children}
        </EndlessLoadingItem>,
      );

      expect(onLoad).toHaveBeenCalledTimes(0);
    });
  });
});
