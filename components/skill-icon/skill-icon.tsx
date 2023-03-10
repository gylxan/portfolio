import React from 'react';
import Image from 'next/image';
import type { Skill } from 'types/skill';
import { blurImageUrl } from 'constants/image';

export type SkillIconProps = Skill;

const SkillIcon = ({ url, name }: SkillIconProps) => {
  const skillIconLoader = ({ src }: { src: string }) => {
    return src;
  };
  const image = (
    <Image
      loader={skillIconLoader}
      width={48}
      height={48}
      sizes="48px"
      className="w-12 text-primary transition-all duration-300 hover:scale-125"
      src={`https://cdn.simpleicons.org/${name.toLowerCase()}/ABAFB9FF`}
      alt={`Icon of skill ${name}`}
      data-testid="skill-icon"
      blurDataURL={blurImageUrl}
      placeholder="blur"
    />
  );

  return url ? (
    <a href={url} aria-label={`Link to skill ${name}`}>
      {image}
    </a>
  ) : (
    image
  );
};

export default SkillIcon;
