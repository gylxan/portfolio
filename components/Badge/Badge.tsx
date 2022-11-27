import type { HTMLProps } from 'react';

type BadgeProps = HTMLProps<HTMLSpanElement>;

const Badge = (props: BadgeProps) => (
  <span
    {...props}
    data-testid="badge"
    className="rounded-2xl bg-secondary p-1 px-3 font-mono text-xs text-background"
  />
);

export default Badge;
