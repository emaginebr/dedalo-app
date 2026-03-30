interface TextData {
  text: string;
  format?: 'plain' | 'html' | 'markdown';
}

interface TextContentProps {
  contentValue: string;
}

export function TextContent({ contentValue }: TextContentProps) {
  const data: TextData = JSON.parse(contentValue || '{}');

  if (data.format === 'html') {
    return (
      <div
        className="prose prose-lg max-w-none py-4"
        dangerouslySetInnerHTML={{ __html: data.text || '' }}
      />
    );
  }

  return (
    <div className="prose prose-lg max-w-none py-4">
      {(data.text || '').split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}
