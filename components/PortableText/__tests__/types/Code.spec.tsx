import { render } from '@testing-library/react';
import Code, { CodeProps } from '../../types/Code';

describe('<Code />', () => {
  const value = {
    language: 'sh',
    code: 'npm run test',
  };

  const props: CodeProps = {
    index: 0,
    isInline: false,
    value,
    renderNode: jest.fn(),
  };

  it('should render', () => {
    render(<Code {...props} />);

    expect(document.querySelector('pre')).toBeInTheDocument();
    expect(document.querySelector('code')).toBeInTheDocument();
  });
});
