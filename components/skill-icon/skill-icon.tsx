import React from 'react';
import Image from 'next/image';
import type { Skill } from 'types/skill';

export type SkillIconProps = Skill;

const SkillIcon = ({ url, name }: SkillIconProps) => {
  const image = (
    <Image
      sizes="32px"
      className="w-12 text-primary transition-all duration-300 hover:scale-125"
      src={`https://cdn.simpleicons.org/${name.toLowerCase()}/ABAFB9FF`}
      alt={`Icon of skill ${name}`}
      data-testid="skill-icon"
      priority
    />
  );

  return url ? (
    <a href={url} aria-label={`Link to slug ${name}`}>
      {image}
    </a>
  ) : (
    image
  );
};

export default SkillIcon;
