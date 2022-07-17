import React from 'react';
import { Cloud, ICloud, renderSimpleIcon } from 'react-icon-cloud';
import simpleIcons from 'simple-icons';

interface TagCloudProps {
  tags: string[];
}

export const cloudProps: Omit<ICloud, 'children'> = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  },
  // https://www.goat1000.com/tagcanvas-options.php
  options: {
    clickToFront: 500,
    imageScale: 2,
    initial: [0.1, -0.1],
    outlineColour: 'transparent',
    reverse: true,
    tooltip: 'native',
    tooltipDelay: 0,
    wheelZoom: false,
  },
};

const TagCloud: React.FC<TagCloudProps> = ({ tags }) => {
  const icons = tags
    .map((tag) => {
      if (!simpleIcons[tag.toLowerCase()]) {
        console.warn(`Icon for slug ${tag} doesn't exist`);
      }
      return simpleIcons[tag.toLowerCase()];
    })
    .filter(Boolean);

  const tagIcons = icons.map((icon) =>
    renderSimpleIcon({
      icon,
      size: 80,
      aProps: {
        href: undefined,
        target: undefined,
        rel: undefined,
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
      },
    }),
  );

  return (
    <Cloud id="tag-cloud" {...cloudProps}>
      {tagIcons}
    </Cloud>
  );
};

export default TagCloud;
