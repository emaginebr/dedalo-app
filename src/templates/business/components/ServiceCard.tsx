interface Service {
  title: string;
  description: string;
  icon?: string;
  link?: string;
}

interface ServiceCardData {
  title?: string;
  services: Service[];
}

interface ServiceCardProps {
  contentValue: string;
}

export function ServiceCard({ contentValue }: ServiceCardProps) {
  const data: ServiceCardData = JSON.parse(contentValue || '{"services":[]}');

  return (
    <div className="py-4">
      {data.title && (
        <div className="text-center mb-14">
          <h2
            className="text-4xl font-semibold text-[#0f172a] tracking-tight mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {data.title}
          </h2>
          <div className="mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#6366f1]" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.services.map((service, i) => (
          <div
            key={i}
            className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent hover:shadow-[0_8px_40px_-12px_rgba(99,102,241,0.15)] transition-all duration-500"
          >
            {/* Hover gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0ea5e9]/10 to-[#6366f1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />

            {/* Icon */}
            {service.icon && (
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0ea5e9]/10 to-[#6366f1]/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
            )}

            {/* Number accent */}
            {!service.icon && (
              <div
                className="text-5xl font-bold mb-6 bg-gradient-to-br from-[#0ea5e9]/15 to-[#6366f1]/15 bg-clip-text text-transparent"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            )}

            <h3
              className="text-xl font-semibold text-[#0f172a] mb-3 group-hover:text-[#6366f1] transition-colors duration-300"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {service.title}
            </h3>

            <p className="text-[#64748b] leading-relaxed text-[15px] mb-4">
              {service.description}
            </p>

            {service.link && (
              <a
                href={service.link}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#6366f1] hover:text-[#0ea5e9] transition-colors duration-300 group/link"
              >
                Saiba mais
                <svg
                  className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
