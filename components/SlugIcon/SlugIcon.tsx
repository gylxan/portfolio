import simpleIcons from 'simple-icons';
import { useState } from 'react';

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
  console.log(image);

  const svg = (
    <div>
      <svg
        key={image.title}
        viewBox="0 0 24 24"
        role="img"
        className={`w-12 transition-all duration-300 hover:scale-125`}
        aria-label={`${image.title} slug`}
        fill={isHovered ? `#${image.hex}` : 'var(--secondary)'}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <path d={image.path} />
      </svg>
    </div>
  );
  return url ? <a href={url}>{svg}</a> : svg;
};

export default SlugIcon;
