import type { TemplateLayoutProps } from '../types';

export function StarterBlogLayout({ areas }: TemplateLayoutProps) {
  return (
    <div className="min-h-screen bg-[#faf8f5]" style={{ fontFamily: "'Libre Baskerville', 'Georgia', serif" }}>
      {/* Hero area - full bleed */}
      {areas['hero-area']}

      {/* Editorial content grid */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16">
        {/* Decorative rule */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />
          <div className="w-2 h-2 rotate-45 border border-[#c9a96e]" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />
        </div>

        <div className="flex gap-12 lg:gap-16">
          {/* Main content - editorial style */}
          <main className="flex-1 min-w-0">
            {areas['main-content']}
          </main>

          {/* Sidebar - refined vertical line separator */}
          <aside className="w-[320px] flex-shrink-0 hidden lg:block relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4c5a9]/40 to-transparent" />
            <div className="pl-8">
              {areas['sidebar']}
            </div>
          </aside>
        </div>
      </div>

      {/* Footer - dark editorial */}
      <footer
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1a1712 0%, #0f0d0a 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/30 to-transparent" />
          </div>
          <div className="text-[#a09078]">
            {areas['footer-content']}
          </div>
        </div>
      </footer>
    </div>
  );
}
