import Link from '../Link/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { Routes } from '../../constants/routes'

const Header = () => (
  <header className="flex h-16 w-full grow items-center justify-between gap-4 px-4 text-center">
    <Link
      href={Routes.Home}
      data-testid="header-home"
      className="w-10 rounded-full bg-secondary p-2 text-white hover:text-white"
      underlined={false}
      coloredHover={false}
    >
      GL
    </Link>

    <div className="flex items-center gap-4">
      <Link href={Routes.About} underlined={false}>
        About
      </Link>
      <Link href={Routes.Projects} underlined={false}>
        Projects
      </Link>
      {/*<FontAwesomeIcon icon={faCircleHalfStroke} />*/}
    </div>
  </header>
)

export default Header
