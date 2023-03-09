import {
  PortableText as PortableTextComponent,
  PortableTextMarkComponentProps,
  PortableTextProps as IPortableTextProps,
  PortableTextReactComponents,
} from '@portabletext/react';
import SanityImage from 'components/portable-text/types/sanityImage';
import Code from 'components/portable-text/types/code';
import Link from 'components/portable-text/marks/link';
import { Title } from 'components';

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: SanityImage,
    customImage: SanityImage,
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
  block: {
    h1: (props) => {
      return <Title>{(props.children as string[]).join('')}</Title>;
    },
  },
};
export type PortableTextProps = IPortableTextProps;
const PortableText = (props: PortableTextProps) => {
  return <PortableTextComponent components={components} {...props} />;
};

export default PortableText;
