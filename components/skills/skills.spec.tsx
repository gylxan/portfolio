import type { SkillsProps } from 'components/skills/skills';
import { render, screen } from '@testing-library/react';
import Skills from 'components/skills/skills';
import { mockSkills } from 'constants/mock';
import useSanityImage from '../../hooks/useSanityImage';
import { describe, expect, it, vi } from 'vitest';

vi.mock('hooks/useSanityImage');
vi.mock('next-sanity')
vi.mock('use-intl')
const mockUseSanityImage = vi.mocked(useSanityImage)

describe('<Skills />', () => {
  mockUseSanityImage.mockReturnValue({
    src: 'https://domain.image.com',
    loader: vi.fn().mockReturnValue('https://domain.image.com?w=123'),
    width: 123,
    height: 123,
  });

  const props: SkillsProps = {
    title: 'My skills',
    skills: mockSkills,
  };

  it('should render', () => {
    render(<Skills {...props} />);

    expect(screen.getByRole('heading').textContent).toBe(props.title);
    expect(screen.getAllByRole('img').length).toBe(props.skills?.length);
    expect(screen.getAllByRole('link').length).toBe(
      props.skills?.filter((skill) => Boolean(skill.url)).length,
    );
  });
});
