import type { PortableTextMarkComponentProps } from '@portabletext/react';
import DefaultLink from 'components/link/link';
import type { TypedObject } from '@sanity/types';

interface LinkValue extends TypedObject {
  blank: boolean;
  href: string;
  label: string;
}

export type LinkProps = PortableTextMarkComponentProps<LinkValue>;

const Link = ({ value, children }: LinkProps) => {
  if (!value) {
    return <>{children}</>;
  }

  return (
    <DefaultLink
      href={value?.href ?? ''}
      target={value?.blank ? '_blank' : '_self'}
      aria-label={value?.label}
    >
      {children}
    </DefaultLink>
  );
};

export default Link;
