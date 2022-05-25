import React from 'react'
import {Cloud, renderSimpleIcon,} from 'react-icon-cloud'
import {cloudProps, icons} from '../../constants/tagcloud'

const TagCloud = () => {
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
  )

  return (
    <Cloud id="tag-cloud" {...cloudProps}>
      {tagIcons}
    </Cloud>
  )
}

export default TagCloud
