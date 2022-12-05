import { PortableTextTypeComponentProps } from '@portabletext/react';

interface CodeValue {
  language: string;
  code: string;
}

export type CodeProps = PortableTextTypeComponentProps<CodeValue>;

const Code = ({ value }: CodeProps) => {
  return (
    <pre data-language={value.language} className="bg-primary text-background p-4 text-sm">
      <code>{value?.code}</code>
    </pre>
  );
};

export default Code;
