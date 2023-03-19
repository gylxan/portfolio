import { useInView } from 'react-intersection-observer';
import { Badge, Link } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import Image from 'next/image';
import { blurImageUrl } from 'constants/image';
import type { Project as IProject } from 'types/project';
import styles from 'components/project/project.module.css';
import useSanityImage from 'hooks/useSanityImage';
import { useTranslations } from 'use-intl';

export type ProjectProps = IProject;

const Project = ({
  name,
  description,
  private: isPrivate,
  previewUrl,
  githubUrl,
  keywords,
  backgroundImage,
}: ProjectProps) => {
  const t = useTranslations('project');
  const imageProps = useSanityImage(backgroundImage);
  const { ref, inView } = useInView({ triggerOnce: true, delay: 300 });

  const className = clsx(styles.project, inView && 'animate-fade-in-up');

  const url = githubUrl || previewUrl;
  return (
    <div key={name} ref={ref} className={className} data-testid="project">
      {imageProps && (
        <div className={styles.imageContainer}>
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            blurDataURL={blurImageUrl}
            alt={`${t('background_image_of')} ${name}`}
            className={styles.image}
            placeholder="blur"
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
            {t(`${isPrivate ? 'private' : 'work'}_project`)}
          </span>
          <h2 className="text-xl">
            {url ? (
              <Link
                href={url}
                underlined={false}
                target="_blank"
                aria-label={`${t('preview_or_project')} ${name}`}
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
              aria-label={`${t('github_repo_of')} ${name}`}
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </Link>
          )}
          {previewUrl && (
            <Link
              href={previewUrl}
              target="_blank"
              underlined={false}
              aria-label={`${t('preview_of')} ${name}`}
            >
              <FontAwesomeIcon icon={faExternalLink} size="lg" />
            </Link>
          )}
        </div>
      </div>
      <p className={styles.description}>{description}</p>
      <div className="mt-auto flex flex-wrap gap-1">
        {keywords?.map((keyword) => (
          <Badge key={keyword}>{keyword}</Badge>
        ))}
      </div>
    </div>
  );
};

export default Project;
