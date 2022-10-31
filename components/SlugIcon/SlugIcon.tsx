import simpleIcons from 'simple-icons';
import { useState } from 'react';
import { isTooDark } from '../../utils/color';

interface Props {
  name: string;
  url?: string;
}

function getBrighterColor(hexColor: string, alternativeColor: string) {
  const c = hexColor.substring(1); // strip #
  const rgb = parseInt(c, 16); // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff; // extract red
  const g = (rgb >> 8) & 0xff; // extract green
  const b = (rgb >> 0) & 0xff; // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  // Return new color if to dark, else return the original
  return luma < 40 ? alternativeColor : hexColor;
}

const SlugIcon = ({ name, url }: Props) => {
  const [isHovered, setHovered] = useState(false);
  const image = simpleIcons[name.toLowerCase()];
  if (!image) {
    return null;
  }
  const hexColor = `#${image.hex}`;

  const svg = (
    <div>
      <svg
        key={image.title}
        viewBox="0 0 24 24"
        role="img"
        className={`w-12 transition-all duration-300 hover:scale-125`}
        aria-label={`${image.title} slug`}
        fill={
          isHovered
            ? isTooDark(hexColor, 40)
              ? 'var(--tertiary)'
              : hexColor
            : 'var(--secondary)'
        }
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
