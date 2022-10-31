import SlugIcon from './SlugIcon';
import { act, fireEvent, render, screen } from '@testing-library/react';
import simpleIconMocks from '../../__mocks__/simple-icons';

jest.mock('simple-icons');

describe('<SlugIcon />', () => {
  const props = {
    name: 'javascript',
  };

  it('should render', () => {
    render(<SlugIcon {...props} />);

    expect(screen.queryByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('fill')).toStrictEqual(
      'var(--secondary)',
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should render as link', () => {
    render(<SlugIcon {...props} url="https://test-link" />);

    expect(screen.queryByRole('link')).toBeInTheDocument();
  });

  it('should show simple icon color on hover', () => {
    render(<SlugIcon {...props} />);

    act(() => {
      fireEvent.mouseOver(screen.getByRole('img'));
    });

    expect(screen.getByRole('img').getAttribute('fill')).toStrictEqual(
      `#${simpleIconMocks[props.name].hex}`,
    );

    act(() => {
      fireEvent.mouseOut(screen.getByRole('img'));
    });

    expect(screen.getByRole('img').getAttribute('fill')).toStrictEqual(
      'var(--secondary)',
    );
  });

  it('should show primary color on hover, when Icon color is too dark', () => {
    render(<SlugIcon {...props} name="cypress" />);

    act(() => {
      fireEvent.mouseOver(screen.getByRole('img'));
    });

    expect(screen.getByRole('img').getAttribute('fill')).toStrictEqual(
      'var(--primary)',
    );

    act(() => {
      fireEvent.mouseOut(screen.getByRole('img'));
    });

    expect(screen.getByRole('img').getAttribute('fill')).toStrictEqual(
      'var(--secondary)',
    );
  });

  it('should render nothing, when simple icon can not be found', () => {
    render(<SlugIcon {...props} name="somethingtotallyrandom" />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
