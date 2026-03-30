interface HeroData {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
  alignment?: 'left' | 'center' | 'right';
}

interface HeroContentProps {
  contentValue: string;
}

export function HeroContent({ contentValue }: HeroContentProps) {
  const data: HeroData = JSON.parse(contentValue || '{}');

  return (
    <section
      className="relative py-20 px-6 bg-cover bg-center min-h-[400px] flex items-center"
      style={data.backgroundImage ? { backgroundImage: `url(${data.backgroundImage})` } : { backgroundColor: '#1a1a2e' }}
    >
      {data.backgroundImage && <div className="absolute inset-0 bg-black/40" />}
      <div className={`relative z-10 max-w-4xl mx-auto text-${data.alignment || 'center'}`}>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {data.title || 'Hero Title'}
        </h1>
        {data.subtitle && (
          <p className="text-xl text-white/80 mb-8">{data.subtitle}</p>
        )}
        {data.buttonText && (
          <a
            href={data.buttonLink || '#'}
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {data.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}
