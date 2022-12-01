import { PortableTextTypeComponentProps } from '@portabletext/react';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';

interface CodeValue {
  language: string;
  code: string;
}

export type CodeProps = PortableTextTypeComponentProps<CodeValue>;

const Code = ({ value }: CodeProps) => {
  return (
    <SyntaxHighlighter
      language={value.language}
      style={vs2015}
      customStyle={{ margin: '1rem 0' }}
    >
      {value?.code}
    </SyntaxHighlighter>
  );
};

export default Code;
