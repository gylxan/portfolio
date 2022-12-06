import { useState } from 'react';
import { isTooDark } from 'utils/color';

export interface Slug {
  name: string;
  url?: string;
}

export interface SlugExtended extends Slug {
  path: string;
  hex: string;
  title: string;
}
export type SlugIconProps = SlugExtended;

const SlugIcon = ({ url, path, hex, title }: SlugIconProps) => {
  const [isHovered, setHovered] = useState(false);
  if (!path) {
    return null;
  }

  const hexColor = `#${hex}`;
  const color = isHovered
    ? isTooDark(hexColor, 40)
      ? 'var(--tertiary)'
      : hexColor
    : 'var(--primary)';

  const svg = (
    <svg
      key={title}
      viewBox="0 0 24 24"
      role="img"
      className="w-12 transition-all duration-300 hover:scale-125"
      fill={color}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <path d={path} />
    </svg>
  );
  return url ? (
    <a href={url} aria-label={`Link to slug ${title}`}>
      {svg}
    </a>
  ) : (
    svg
  );
};

export default SlugIcon;
