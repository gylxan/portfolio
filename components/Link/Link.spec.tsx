import { render, screen } from '@testing-library/react'
import Link from './Link'

describe('<Link />', () => {
  it('should render', () => {
    render(<Link href="https://google.com">test</Link>)

    expect(screen.getByRole('link')).toBeInTheDocument()
    const classNames = screen.getByRole('link').className.split(' ')
    expect(classNames).toContain('underline')
    expect(classNames).toContain('hover:text-secondary')
  })

  it('should apply given className', () => {
    const className = 'MyClass'

    render(
      <Link href="https://google.com" className={className}>
        test
      </Link>,
    )

    expect(screen.getByRole('link').className).toContain(className)
  })

  it('should not apply underline class, when underline is false', () => {
    render(
      <Link href="https://google.com" underlined={false}>
        test
      </Link>,
    )

    expect(screen.getByRole('link').className.split(' ')).not.toContain(
      'underline',
    )
  })

  it('should not apply hover text secondary class, when coloredHover is false', () => {
    render(
      <Link href="https://google.com" coloredHover={false}>
        test
      </Link>,
    )

    expect(screen.getByRole('link').className.split(' ')).not.toContain(
      'hover:text-secondary',
    )
  })
})
