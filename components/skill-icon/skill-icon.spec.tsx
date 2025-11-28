import SkillIcon, { SkillIconProps } from 'components/skill-icon/skill-icon';
import { render, screen } from '@testing-library/react';
import useSanityImage from '../../hooks/useSanityImage';
import { describe, expect, it, vi } from 'vitest';

vi.mock('hooks/useSanityImage');
vi.mock('next-sanity');
vi.mock('use-intl');

const mockUseSanityImage = vi.mocked(useSanityImage);

describe('<SkillIcon />', () => {
  mockUseSanityImage.mockReturnValue({
    src: 'https://domain.image.com',
    loader: vi.fn().mockReturnValue('https://domain.image.com?w=123'),
    width: 123,
    height: 123,
  });
  const props: SkillIconProps = {
    name: 'javascript',
    image: {
      asset: {
        _ref: '123',
        metadata: {
          lqid: '12324',
        },
      },
    },
  };

  it('should render', () => {
    render(<SkillIcon {...props} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should render as link', () => {
    render(<SkillIcon {...props} url="https://domain.image.com" />);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link').children.length).toBe(1);
  });
});
