import { useInView } from 'react-intersection-observer';
import { Badge, Link } from '../';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Image from 'next/image';
import { blurImageUrl } from '../../constants/image';
import type { Project as IProject } from '../../types/project';
import styles from './Project.module.css';

export type ProjectProps = IProject;

const Project = ({
  name,
  description,
  private: isPrivate,
  previewUrl,
  githubUrl,
  slugs,
  imageUrl,
}: ProjectProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, delay: 300 });

  const className = clsx(styles.project, inView && 'animate-fade-in-up');

  const url = githubUrl || previewUrl;
  return (
    <div key={name} ref={ref} className={className} data-testid="project">
      {imageUrl && (
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            className={styles.image}
            alt={`Background image of ${name} project`}
            placeholder="blur"
            blurDataURL={blurImageUrl}
            sizes={
              '(min-width: 1555px) 500px, (min-width: 1024px) 400px, (min-width: 768px) 340px, 600px'
            }
            fill
          />
        </div>
      )}
      <div className="flex flex-row justify-between justify-items-start">
        <div>
          <span className="text-secondary">
            {isPrivate ? 'Private' : 'Work'} Project
          </span>
          <h2 className="text-xl">
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
          className={clsx('flex', 'gap-4', !githubUrl && !previewUrl && 'h-6')}
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
