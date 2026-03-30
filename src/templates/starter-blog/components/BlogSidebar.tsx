interface SidebarWidget {
  title: string;
  content: string;
  type: 'text' | 'links' | 'tags';
  items?: { label: string; url?: string }[];
}

interface BlogSidebarData {
  widgets: SidebarWidget[];
}

interface BlogSidebarProps {
  contentValue: string;
}

export function BlogSidebar({ contentValue }: BlogSidebarProps) {
  const data: BlogSidebarData = JSON.parse(contentValue || '{"widgets":[]}');

  return (
    <aside className="space-y-10">
      {data.widgets.map((widget, i) => (
        <div key={i}>
          {/* Widget title with editorial styling */}
          <h4
            className="text-xs tracking-[0.25em] uppercase text-[#9a8b73] mb-4 pb-3 border-b border-[#e0d6c8]"
            style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
          >
            {widget.title}
          </h4>

          {widget.type === 'text' && (
            <p
              className="text-[#6b6156] text-[14px] leading-relaxed italic"
              style={{ fontFamily: "'Libre Baskerville', 'Georgia', serif" }}
            >
              {widget.content}
            </p>
          )}

          {widget.type === 'links' && (
            <ul className="space-y-3">
              {widget.items?.map((item, j) => (
                <li key={j}>
                  <a
                    href={item.url || '#'}
                    className="group flex items-center gap-3 text-[14px] text-[#4a4139] hover:text-[#c9a96e] transition-colors duration-300"
                    style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4c5a9] group-hover:bg-[#c9a96e] transition-colors flex-shrink-0" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {widget.type === 'tags' && (
            <div className="flex flex-wrap gap-2">
              {widget.items?.map((item, j) => (
                <span
                  key={j}
                  className="border border-[#d4c5a9] text-[#7a6e5e] px-3 py-1 text-[11px] tracking-[0.1em] uppercase hover:bg-[#c9a96e] hover:text-white hover:border-[#c9a96e] transition-all duration-300 cursor-default"
                  style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                >
                  {item.label}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}
