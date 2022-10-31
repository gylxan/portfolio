import simpleIcons from 'simple-icons';
import { useState } from 'react';
import { isTooDark } from '../../utils/color';

interface Props {
  name: string;
  url?: string;
}

const SlugIcon = ({ name, url }: Props) => {
  const [isHovered, setHovered] = useState(false);
  const image = simpleIcons[name.toLowerCase()];
  if (!image) {
    return null;
  }
  const hexColor = `#${image.hex}`;
  const color = isHovered
    ? isTooDark(hexColor, 40)
      ? 'var(--primary)'
      : hexColor
    : 'var(--secondary)';

  const svg = (
    <div>
      <svg
        key={image.title}
        viewBox="0 0 24 24"
        role="img"
        className={`w-12 transition-all duration-300 hover:scale-125`}
        fill={color}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <path d={image.path} />
      </svg>
    </div>
  );
  return url ? <a href={url} aria-label={`Link to slug ${image.title}`}>{svg}</a> : svg;
};

export default SlugIcon;
