import type { HTMLProps } from 'react';

type TileProps = HTMLProps<HTMLDivElement>;

const Tile = (props: TileProps) => {
  return (
    <div
      {...props}
      className="bg-gray-400 hover:bg-gray-600 dark:text-gray-100 rounded p-4 transition-colors hover:cursor-pointer"
    />
  );
};

export default Tile;
