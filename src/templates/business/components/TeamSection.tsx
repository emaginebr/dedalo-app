interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
}

interface TeamData {
  title?: string;
  members: TeamMember[];
}

interface TeamSectionProps {
  contentValue: string;
}

export function TeamSection({ contentValue }: TeamSectionProps) {
  const data: TeamData = JSON.parse(contentValue || '{"members":[]}');

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.members.map((member, i) => (
          <div key={i} className="group text-center">
            {/* Avatar with gradient ring */}
            <div className="relative w-36 h-36 mx-auto mb-6">
              {/* Gradient ring */}
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110 blur-md"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                }}
              />
              <div className="absolute inset-[3px] rounded-full bg-white z-0" />
              <div
                className="absolute inset-[3px] rounded-full overflow-hidden z-10 bg-gradient-to-br from-[#e2e8f0] to-[#cbd5e1]"
                style={{
                  background: member.photo ? undefined : `linear-gradient(135deg, #0ea5e9, #6366f1)`,
                }}
              >
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span
                      className="text-4xl font-light text-white/90"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <h4
              className="text-lg font-semibold text-[#0f172a] mb-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {member.name}
            </h4>
            <p
              className="text-sm font-medium bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] bg-clip-text text-transparent mb-3"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {member.role}
            </p>
            {member.bio && (
              <p className="text-[#64748b] text-sm leading-relaxed max-w-[240px] mx-auto">
                {member.bio}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
