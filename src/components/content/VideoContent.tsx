interface VideoData {
  url: string;
  title?: string;
  type?: 'youtube' | 'vimeo' | 'direct';
}

interface VideoContentProps {
  contentValue: string;
}

function getEmbedUrl(url: string, type?: string): string {
  if (type === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }
  if (type === 'vimeo' || url.includes('vimeo.com')) {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : url;
  }
  return url;
}

export function VideoContent({ contentValue }: VideoContentProps) {
  const data: VideoData = JSON.parse(contentValue || '{}');

  if (data.type === 'direct') {
    return (
      <div className="py-4">
        {data.title && <h3 className="text-xl font-bold mb-2">{data.title}</h3>}
        <video controls className="w-full rounded-lg">
          <source src={data.url} />
        </video>
      </div>
    );
  }

  return (
    <div className="py-4">
      {data.title && <h3 className="text-xl font-bold mb-2">{data.title}</h3>}
      <div className="aspect-video">
        <iframe
          src={getEmbedUrl(data.url, data.type)}
          className="w-full h-full rounded-lg"
          allowFullScreen
          title={data.title || 'Video'}
        />
      </div>
    </div>
  );
}
