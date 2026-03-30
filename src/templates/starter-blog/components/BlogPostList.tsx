interface BlogPost {
  title: string;
  excerpt: string;
  date?: string;
  image?: string;
  link?: string;
}

interface BlogPostListData {
  title?: string;
  posts: BlogPost[];
}

interface BlogPostListProps {
  contentValue: string;
}

export function BlogPostList({ contentValue }: BlogPostListProps) {
  const data: BlogPostListData = JSON.parse(contentValue || '{"posts":[]}');

  return (
    <div className="py-4">
      {data.title && (
        <div className="mb-10">
          <h2
            className="text-3xl tracking-tight mb-3"
            style={{ fontFamily: "'Libre Baskerville', 'Georgia', serif" }}
          >
            {data.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#c9a96e]" />
        </div>
      )}

      <div className="space-y-0">
        {data.posts.map((post, i) => (
          <article
            key={i}
            className="group grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 py-10 border-b border-[#e8e0d4] last:border-b-0"
          >
            {/* Image with editorial crop */}
            {post.image && (
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[200px] object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col justify-center">
              {post.date && (
                <p
                  className="text-xs tracking-[0.2em] uppercase text-[#b09870] mb-3"
                  style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                >
                  {post.date}
                </p>
              )}
              <h3
                className="text-2xl leading-snug mb-3 tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', 'Georgia', serif" }}
              >
                {post.link ? (
                  <a
                    href={post.link}
                    className="text-[#2a2520] hover:text-[#c9a96e] transition-colors duration-300"
                  >
                    {post.title}
                  </a>
                ) : (
                  post.title
                )}
              </h3>
              <p
                className="text-[#6b6156] leading-relaxed text-[15px]"
                style={{ fontFamily: "'Helvetica Neue', 'Arial', sans-serif" }}
              >
                {post.excerpt}
              </p>
              {post.link && (
                <a
                  href={post.link}
                  className="inline-flex items-center gap-2 mt-5 text-xs tracking-[0.15em] uppercase text-[#c9a96e] hover:text-[#2a2520] transition-colors duration-300 group/link"
                  style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                >
                  Continuar lendo
                  <span className="inline-block w-4 h-px bg-current group-hover/link:w-8 transition-all duration-300" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
