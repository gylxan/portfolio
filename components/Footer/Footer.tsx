import Link from '../Link/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faGithub,
  faFacebookSquare,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons'

const Footer = () => (
  <footer className="flex h-16 grow items-center justify-between px-4">
    <div className="flex gap-4">
      <Link href="https://linkedin.com/in/guido-lange-1217a71b8/" target="_blank">
        <FontAwesomeIcon icon={faLinkedin} size="lg"/>
      </Link>
      <Link href="https://github.com/gylxan" target="_blank">
        <FontAwesomeIcon icon={faGithub} size="lg"/>
      </Link>
      <Link href="https://open.spotify.com/user/gerynix?si=2c87a1e95b83421e" target="_blank">
        <FontAwesomeIcon icon={faSpotify} size="lg"/>
      </Link>
    </div>
    <div data-testid="location-and-year">Berlin@{new Date().getFullYear()}</div>
  </footer>
)

export default Footer
