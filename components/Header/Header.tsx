import Link from '../Link/Link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import {Routes} from '../../constants/routes'
import {Theme} from '../../constants/theme'
import {useTheme} from 'next-themes'
import {useEffect, useState} from 'react'
import Image from 'next/image'

const Header = () => {
  const { theme, setTheme, systemTheme } = useTheme()
  const [darkTheme, setDarkTheme] = useState(false)

  useEffect(() => {
    setDarkTheme(systemTheme === Theme.Dark || theme === Theme.Dark)
  }, [systemTheme])

  function toggleTheme() {
    setTheme(darkTheme ? Theme.Light : Theme.Dark)
    setDarkTheme(!darkTheme)
  }

  return (
    <header className="flex h-16 w-full grow items-center justify-between gap-4 px-4 text-center">
      <Link
        href={Routes.Home}
        data-testid="logo"
        className="w-10 h-10 p-2 text-white hover:text-white relative "
        underlined={false}
        coloredHover={false}
      >
        <Image src="/icons/icon-72x72.png" alt="logo" layout="fill" />
      </Link>

      <div className="flex items-center gap-4">
        <Link href={Routes.About} underlined={false}>
          About
        </Link>
        <Link href={Routes.Projects} underlined={false}>
          Projects
        </Link>
        <FontAwesomeIcon
          id="theme-switch-icon"
          className="cursor-pointer"
          icon={darkTheme ? faSun : faMoon}
          onClick={toggleTheme}
          data-testid="theme-switch"
          size="lg"
        />
      </div>
    </header>
  )
}

export default Header
