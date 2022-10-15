import Link from '../Link/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer className="flex h-16 grow items-center justify-between px-4">
    <div className="flex gap-4">
      {process.env.NEXT_PUBLIC_LINKEDIN_URL && (
        <Link
          href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
          target="_blank"
          underlined={false}
          aria-label="Link to LinkedIn account"
        >
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </Link>
      )}
      {process.env.NEXT_PUBLIC_GITHUB_URL && (
        <Link
          href={process.env.NEXT_PUBLIC_GITHUB_URL}
          target="_blank"
          underlined={false}
          aria-label="Link to Github account"
        >
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </Link>
      )}
      {process.env.NEXT_PUBLIC_SPOTIFY_URL && (
        <Link
          href={process.env.NEXT_PUBLIC_SPOTIFY_URL}
          target="_blank"
          underlined={false}
          aria-label="Link to Spotify account"
        >
          <FontAwesomeIcon icon={faSpotify} size="lg" />
        </Link>
      )}
    </div>
    <div data-testid="location-and-year">Berlin@{new Date().getFullYear()}</div>
  </footer>
);

export default Footer;
