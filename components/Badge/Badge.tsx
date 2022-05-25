import { HTMLProps } from 'react'

type BadgeProps = HTMLProps<HTMLSpanElement>

const Badge = (props: BadgeProps) => (
  <span
    {...props}
    data-testid="badge"
    className="bg-indigo-600 text-white rounded px-4 py-1 font-bold uppercase"
  />
)

export default Badge
