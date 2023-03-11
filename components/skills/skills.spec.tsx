import type { SkillsProps } from 'components/skills/skills';
import { render, screen } from '@testing-library/react';
import { Skills } from 'components';
import { mockSkills } from 'constants/mock';

describe('<Skills />', () => {
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
