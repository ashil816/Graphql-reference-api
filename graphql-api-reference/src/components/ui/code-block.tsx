import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  language: string;
}

export async function CodeBlock({ code, language }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark', // Or any other theme you prefer
  });

  return (
    <div
      className="bg-[#161B22] p-4 rounded-md overflow-x-auto text-sm mb-4 border border-border"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default CodeBlock;
