import SkillIcon, {SkillIconProps} from 'components/skill-icon/skill-icon';
import {render, screen} from '@testing-library/react';

describe('<SlugIcon />', () => {
  const props: SkillIconProps = {
    name: 'javascript',
  };

  it('should render', () => {
    render(<SkillIcon {...props} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')?.getAttribute('src')).toMatch(
      encodeURIComponent(`https://cdn.simpleicons.org/${props.name.toLowerCase()}/ABAFB9FF`),
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should render as link', () => {
    render(<SkillIcon {...props} url="https://test-link" />);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link').children.length).toBe(1)
  });
});
