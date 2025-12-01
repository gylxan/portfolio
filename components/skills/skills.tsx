import { SkillIcon } from 'components';
import { SkillIconProps } from 'components/skill-icon/skill-icon';

export interface SkillsProps {
  title: string;
  skills?: SkillIconProps[];
}

const Skills = ({ title, skills }: SkillsProps) => {
  return (
    <div className="flex flex-col gap-4" data-testid="skills">
      <h2 className="text-xl">{title}</h2>
      <div className="flex flex-row flex-wrap gap-6">
        {skills?.map((skill) => (
          <SkillIcon key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
};
export default Skills;
