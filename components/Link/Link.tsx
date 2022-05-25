import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLAnchorElement> {
  underlined?: boolean
  coloredHover?: boolean
}
const Link = ({
  className,
  underlined = true,
  coloredHover = true,
  ...props
}: Props) => (
  <a
    {...props}
    className={
      'hover:underline ' +
      (underlined ? ' underline' : '') +
      (coloredHover ? ' hover:text-secondary' : '') +
      (className ? ` ${className}` : '')
    }
  />
)

export default Link
