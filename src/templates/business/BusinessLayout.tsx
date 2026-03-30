import type { TemplateLayoutProps } from '../types';

export function BusinessLayout({ areas }: TemplateLayoutProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Outfit', 'Segoe UI', sans-serif",
        background: '#fafbfc',
      }}
    >
      {/* Hero - full bleed */}
      {areas['hero-area']}

      {/* Main content section */}
      <section className="relative">
        {/* Subtle diagonal accent */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
          }}
        />

        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-8 py-20">
          {areas['main-content']}
        </div>
      </section>

      {/* Three column section with accent border */}
      {(areas['left-column'] || areas['center-content'] || areas['right-column']) && (
        <section className="relative bg-white border-t border-gray-100">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-20">
            {/* Section accent line */}
            <div className="flex items-center gap-3 mb-14">
              <div className="w-10 h-1 rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#6366f1]" />
              <div className="w-2 h-1 rounded-full bg-[#6366f1]/30" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-12 lg:gap-16">
              <div>{areas['left-column']}</div>
              <div>{areas['center-content']}</div>
              <div>{areas['right-column']}</div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        }}
      >
        {/* Geometric mesh overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Gradient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #6366f1, #0ea5e9, transparent)',
          }}
        />

        <div className="relative max-w-[1240px] mx-auto px-6 lg:px-8 py-16 text-gray-400">
          {areas['footer-content']}
        </div>
      </footer>
    </div>
  );
}
