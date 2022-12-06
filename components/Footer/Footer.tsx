import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faSpotify, } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'components';

const Footer = () => (
  <footer className="flex grow flex-col items-center justify-between gap-4 py-5 px-4 sm:flex-row md:px-8">
    <div className="flex gap-4">
      {process.env.NEXT_PUBLIC_LINKEDIN_URL && (
        <Link
          href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
          target="_blank"
          underlined={false}
          aria-label="Link to LinkedIn account"
          className="hover:trans"
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
    {process.env.NEXT_PUBLIC_COPYRIGHT && (
      <div data-testid="copyright" className="text-sm">
        {process.env.NEXT_PUBLIC_COPYRIGHT}
      </div>
    )}
  </footer>
);

export default Footer;
