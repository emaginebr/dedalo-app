interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface GalleryData {
  title?: string;
  columns?: number;
  images: GalleryImage[];
}

interface GalleryContentProps {
  contentValue: string;
}

export function GalleryContent({ contentValue }: GalleryContentProps) {
  const data: GalleryData = JSON.parse(contentValue || '{"images":[]}');
  const cols = data.columns || 3;

  return (
    <div className="py-6">
      {data.title && <h3 className="text-2xl font-bold mb-4">{data.title}</h3>}
      <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {data.images.map((img, i) => (
          <figure key={i} className="overflow-hidden rounded-lg">
            <img src={img.src} alt={img.alt || ''} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
            {img.caption && <figcaption className="text-sm text-gray-500 mt-1 px-1">{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}
