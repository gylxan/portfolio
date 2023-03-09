import React from 'react';
import type { ContentBlock } from 'types/page';
import type { SanityAltImage } from 'types/image';
import SanityImage from 'components/portable-text/types/sanityImage';
import Experiences, {
  ExperiencesProps,
} from 'components/experiences/experiences';
import Welcome, { WelcomeProps } from 'components/welcome/welcome';
import Skills, { SkillsProps } from 'components/skills/skills';
import Row, { RowProps } from 'components/row/row';
import Column, { ColumnProps } from 'components/column/column';
import PortableText, {
  PortableTextProps,
} from 'components/portable-text/portable-text';
import Projects, { ProjectsProps } from 'components/projects/projects';

interface DocumentCreatorProps {
  _type: string;

  content?: ContentBlock[];
}

type DocumentCreatorType = DocumentCreatorProps &
  (
    | SkillsProps
    | ExperiencesProps
    | WelcomeProps
    | ProjectsProps
    | ColumnProps
    | RowProps
    | SanityAltImage
    | PortableTextProps
  );

const map = {
  skills: Skills,
  experiences: Experiences,
  welcome: Welcome,
  projects: Projects,
  customImage: (props: SanityAltImage) => (
    <SanityImage
      value={props}
      index={1}
      isInline={false}
      renderNode={() => null}
    />
  ),
  block: (props: PortableTextProps & DocumentCreatorProps) => (
    <PortableText value={props} />
  ),
  row: ({ space, content }: RowProps & DocumentCreatorProps) => (
    <Row space={space}>
      {content?.map((contentBlock: ContentBlock) => (
        <DocumentCreator key={contentBlock._key} {...contentBlock} />
      ))}
    </Row>
  ),
  column: ({
    space,
    content,
    alignment,
  }: ColumnProps & DocumentCreatorProps) => {
    return (
      <Column space={space} alignment={alignment}>
        {content?.map((contentBlock: ContentBlock) => (
          <DocumentCreator key={contentBlock._key} {...contentBlock} />
        ))}
      </Column>
    );
  },
};

const DocumentCreator = ({ _type, ...props }: DocumentCreatorType) => {
  const Component = (map as Record<string, React.FC<DocumentCreatorType>>)[
    _type
  ];

  if (!Component) {
    console.warn(`Component for type "${_type}" does not exist`);
    return null;
  }
  return <Component {...props} _type={_type} />;
};

export default DocumentCreator;
