import {
  siReact,
  siTypescript,
  siJavascript,
  siNextdotjs,
  siJest,
  siVercel,
  siSass,
  siCapacitor,
  siRedux,
  siCypress,
  siWebdriverio,
  siWebstorm,
  siGit, siIonic, siTailwindcss,
} from 'simple-icons/icons'
import { ICloud } from 'react-icon-cloud'

export const icons = [
  siReact,
  siTypescript,
  siJavascript,
  siNextdotjs,
  siJest,
  siVercel,
  siSass,
  siCapacitor,
  siRedux,
  siCypress,
  siWebdriverio,
  siWebstorm,
  siGit,
  siIonic,
  siTailwindcss
]

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
}
