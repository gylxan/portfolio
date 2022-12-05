import {
  PortableText as PortableTextComponent,
  PortableTextMarkComponentProps,
  PortableTextProps,
} from '@portabletext/react';
import SanityImage from './types/SanityImage';
import Code from './types/Code';
import Link from './marks/Link';

const components = {
  types: {
    image: SanityImage,
    code: Code,
  },
  marks: {
    alignLeft: (props: PortableTextMarkComponentProps) => (
      <span className="flex justify-start">{props.children}</span>
    ),
    alignCenter: (props: PortableTextMarkComponentProps) => (
      <span className="flex justify-center">{props.children}</span>
    ),
    alignRight: (props: PortableTextMarkComponentProps) => (
      <span className="flex justify-end">{props.children}</span>
    ),
    link: Link,
  },
};

const PortableText = (props: PortableTextProps) => {
  return <PortableTextComponent components={components} {...props}  />;
};

export default PortableText;
