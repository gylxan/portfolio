import React, { HTMLProps } from 'react'

type TileProps = HTMLProps<HTMLDivElement>

const Tile = (props: TileProps) => {
  return (
    <div
      {...props}
      className="rounded bg-gray-400 p-4 hover:bg-gray-600 dark:text-gray-100 transition-colors hover:cursor-pointer"
    />
  )
}

export default Tile
