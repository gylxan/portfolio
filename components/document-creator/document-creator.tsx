import React from 'react';
import type { ContentBlock } from 'types/page';
import type { SanityAltImage } from 'types/image';
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
import Projects from 'components/projects/projects';
import PostList from 'components/post-list/post-list';

interface DocumentCreatorProps {
  _type: string;

  content?: ContentBlock[];
}

type DocumentCreatorType = DocumentCreatorProps &
  (
    | SkillsProps
    | ExperiencesProps
    | WelcomeProps
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
  posts: PostList,
  block: (props: PortableTextProps & DocumentCreatorProps) => (
    <PortableText value={props} />
  ),
  row: ({ content, ...props }: RowProps & DocumentCreatorProps) => (
    <Row {...props}>
      {content?.map((contentBlock: ContentBlock) => (
        <DocumentCreator key={contentBlock._key} {...contentBlock} />
      ))}
    </Row>
  ),
  column: ({ content, ...props }: ColumnProps & DocumentCreatorProps) => {
    return (
      <Column {...props}>
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
