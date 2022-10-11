import React from 'react';
import { useInView } from 'react-intersection-observer';
import Link from '../Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

import styles from './Project.module.css';
import animationStyles from '../../styles/animations.module.css';
import clsx from 'clsx';
import Image from 'next/image';

export interface ProjectProps {
  name: string;
  description: string;
  private: boolean;
  previewUrl?: string;
  githubUrl?: string;
  slugs: string[];
  imageUrl?: string;
  delay?: number;
}

const Project: React.FC<ProjectProps> = ({
  name,
  description,
  private: isPrivate,
  previewUrl,
  githubUrl,
  slugs,
  imageUrl,
  delay = 0,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  const className = clsx([
    styles.project,
    animationStyles.animatedFadeInUp,
    inView && animationStyles.fadeInUp,
    !imageUrl && 'shadow-[0px_0px_0px_1px_rgba(255,255,255)_inset]',
  ]);

  const url = githubUrl || previewUrl;

  return (
    <div
      key={name}
      ref={ref}
      className={className}
      style={{ animationDelay: `${delay}ms` }}
    >
      {imageUrl && (
        <div className={styles.image}>
          <Image src={imageUrl} alt="background-image" layout="fill" />
        </div>
      )}
      <span className="text-secondary">
        {isPrivate ? 'Private' : 'Work'} Project
      </span>
      <h2 className="text-xl font-bold">
        {url ? (
          <Link href={url} underlined={false} target="_blank">
            {name}
          </Link>
        ) : (
          name
        )}
      </h2>
      <p className={styles.description}>{description}</p>
      <div className="mt-auto flex flex-wrap gap-1 text-tertiary">
        {slugs.map((slug) => (
          <span
            key={slug}
            className="rounded-2xl bg-secondary p-1 pr-3 pl-3 font-mono text-xs"
          >
            {slug}
          </span>
        ))}
      </div>
      <div
        className={clsx(['flex', 'gap-4', !githubUrl && !previewUrl && 'h-6'])}
      >
        {githubUrl && (
          <Link
            href={githubUrl}
            target="_blank"
            underlined={false}
            aria-label={`Link to Github repository of ${name}`}
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </Link>
        )}
        {previewUrl && (
          <Link href={previewUrl} target="_blank" underlined={false} aria-label={`Link to a Preview of ${name}`}>
            <FontAwesomeIcon icon={faExternalLink} size="lg" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Project;
