import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('<ProgressBar />', () => {
  const props = {
    progress: 65,
  };

  it('should render', () => {
    render(<ProgressBar {...props} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar').getAttribute('aria-valuenow'),
    ).toStrictEqual(`${props.progress}`);
    expect(document.querySelector('.progress')).toHaveStyle(
      `width: ${props.progress}%`,
    );
  });

  it('should delay the visibility, when given', () => {
    const delay = 300;
    render(<ProgressBar {...props} delay={delay} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar').getAttribute('aria-valuenow'),
    ).toStrictEqual(`${props.progress}`);
    expect(document.querySelector('.progress')).toHaveStyle(
      `transition-delay: ${delay}ms`,
    );
  });
});
