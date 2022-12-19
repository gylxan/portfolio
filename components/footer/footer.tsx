import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faSpotify,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'components';
import { SiteConfig, SocialMedia } from 'types/siteConfig';

interface FooterProps {
  siteConfig: SiteConfig;
}

const iconMap: Record<SocialMedia, IconDefinition> = {
  github: faGithub,
  spotify: faSpotify,
  linkedin: faLinkedin,
};

const Footer = ({ siteConfig }: FooterProps) => {
  const { copyright, social } = siteConfig;
  return (
    <footer className="flex grow flex-col items-center justify-between gap-4 py-5 px-4 sm:flex-row md:px-8">
      <div className="flex gap-4">
        {social.map(({ url, media }) => {
          if (!iconMap[media]) {
            console.warn(
              `No defined icon for social ${media}. Add definition to iconMap to show icon.`,
            );
            return null;
          }
          return (
            <Link
              key={media}
              href={url}
              target="_blank"
              underlined={false}
              aria-label={`Link to ${media} account`}
            >
              <FontAwesomeIcon icon={iconMap[media]} size="lg" />
            </Link>
          );
        })}
      </div>
      {copyright && (
        <div data-testid="copyright" className="text-sm">
          © {copyright}
        </div>
      )}
    </footer>
  );
};

export default Footer;
