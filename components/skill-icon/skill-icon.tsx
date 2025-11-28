import React from 'react';
import Image from 'next/image';
import type { Skill } from 'types/skill';
import { useTranslations } from 'use-intl';
import useSanityImage from '../../hooks/useSanityImage';
import { getBlurDataUrl } from '../../utils/sanity';

export type SkillIconProps = Skill;

const SkillIcon = ({ url, name, image }: SkillIconProps) => {
  const imageProps = useSanityImage(image);
  const t = useTranslations('skill');
  const iconImage = imageProps && (
    <Image
      width={48}
      height={48}
      sizes="48px"
      className="w-12 text-primary transition-all duration-300 hover:scale-125"
      src={imageProps.src}
      loader={imageProps.loader}
      alt={`${t('icon_alt')} ${name}`}
      data-testid="skill-icon"
      blurDataURL={getBlurDataUrl(image)}
      placeholder="blur"
    />
  );

  return url ? (
    <a
      href={url}
      aria-label={`${t('link_label')} ${name}`}
      className="inline-flex"
    >
      {iconImage}
    </a>
  ) : (
    iconImage
  );
};

export default SkillIcon;
