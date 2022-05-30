import Link from '../Link/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { Routes } from '../../constants/routes'
import { Theme } from '../../constants/theme'
import { useTheme } from 'next-themes'

const Header = () => {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)
  }

  return (
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
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={theme === Theme.Light ? faMoon : faSun}
          onClick={toggleTheme}
          data-testid="theme-switch"
          size="lg"
        />
      </div>
    </header>
  )
}

export default Header
