import React from 'react';
import { useInView } from 'react-intersection-observer';
import Link from '../Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Image from 'next/image';
import Badge from '../Badge/Badge';
import animationStyles from '../../styles/animations.module.css';
import styles from './Project.module.css';

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
    'shadow-[0px_0px_0px_1px_rgba(255,255,255)_inset]',
  ]);

  const url = githubUrl || previewUrl;
  const blurImageUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcum1nPQAG8QKl/SZJzwAAAABJRU5ErkJggg==';

  return (
    <div
      key={name}
      ref={ref}
      className={className}
      style={{ animationDelay: `${delay}ms` }}
      data-testid="project"
    >
      {imageUrl && (
        <div className={styles.image}>
          <Image
            src={imageUrl}
            alt="background-image"
            layout="fill"
            placeholder="blur"
            blurDataURL={blurImageUrl}
          />
        </div>
      )}
      <div className="flex flex-row justify-between justify-items-start">
        <div>
          <span className="text-secondary">
            {isPrivate ? 'Private' : 'Work'} Project
          </span>
          <h2 className="text-xl font-bold">
            {url ? (
              <Link
                href={url}
                underlined={false}
                target="_blank"
                aria-label="Link to the Github repository or preview of the project"
              >
                {name}
              </Link>
            ) : (
              name
            )}
          </h2>
        </div>
        <div
          className={clsx([
            'flex',
            'gap-4',
            !githubUrl && !previewUrl && 'h-6',
          ])}
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
            <Link
              href={previewUrl}
              target="_blank"
              underlined={false}
              aria-label={`Link to a Preview of ${name}`}
            >
              <FontAwesomeIcon icon={faExternalLink} size="lg" />
            </Link>
          )}
        </div>
      </div>
      <p className={styles.description}>{description}</p>
      <div className="mt-auto flex flex-wrap gap-1">
        {slugs.map((slug) => (
          <Badge key={slug}>{slug}</Badge>
        ))}
      </div>
    </div>
  );
};

export default Project;
