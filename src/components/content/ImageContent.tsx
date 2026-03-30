interface ImageData {
  src: string;
  alt?: string;
  caption?: string;
  width?: string;
  link?: string;
}

interface ImageContentProps {
  contentValue: string;
}

export function ImageContent({ contentValue }: ImageContentProps) {
  const data: ImageData = JSON.parse(contentValue || '{}');

  const img = (
    <figure className="py-4">
      <img
        src={data.src}
        alt={data.alt || ''}
        className="rounded-lg w-full object-cover"
        style={data.width ? { maxWidth: data.width } : undefined}
      />
      {data.caption && (
        <figcaption className="text-sm text-gray-500 mt-2 text-center">{data.caption}</figcaption>
      )}
    </figure>
  );

  if (data.link) {
    return <a href={data.link} target="_blank" rel="noopener noreferrer">{img}</a>;
  }

  return img;
}
