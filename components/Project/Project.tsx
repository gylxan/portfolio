import React from 'react';
import { useInView } from 'react-intersection-observer';
import Link from '../Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

import styles from './Project.module.css';
import animationStyles from '../../styles/animations.module.css';
import clsx from 'clsx';

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

  const hasLink = githubUrl || previewUrl;

  return (
    <div
      key={name}
      ref={ref}
      className={className}
      style={{ animationDelay: `${delay}ms` }}
    >
      {imageUrl && (
        <img className={styles.image} src={imageUrl} alt="background-image" />
      )}
      <span className="text-secondary">
        {isPrivate ? 'Private' : 'Work'} Project
      </span>
      <h3 className="text-xl font-bold">
        {hasLink ? (
          <Link
            href={previewUrl || githubUrl}
            underlined={false}
            target="_blank"
          >
            {name}
          </Link>
        ) : (
          name
        )}
      </h3>
      <p className={styles.description}>{description}</p>
      <div className="mt-auto flex flex-wrap gap-1">
        {slugs.map((slug) => (
          <span
            key={slug}
            className="rounded-2xl bg-secondary p-1 pr-3 pl-3 text-xs"
          >
            {slug}
          </span>
        ))}
      </div>
      <div
        className={clsx(['flex', 'gap-4', !githubUrl && !previewUrl && 'h-6'])}
      >
        {githubUrl && (
          <Link href={githubUrl} target="_blank">
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </Link>
        )}
        {previewUrl && (
          <Link href={previewUrl} target="_blank">
            <FontAwesomeIcon icon={faExternalLink} size="lg" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Project;
