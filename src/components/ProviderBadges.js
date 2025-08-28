import Image from 'next/image';

// Renders watch provider logos (e.g., Netflix, Prime) for a specific region
// Expects an array of provider objects from TMDB watch/providers response
const ProviderBadges = ({ providers = [] }) => {
  if (!providers || providers.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {providers.slice(0, 6).map((p) => (
        <div key={p.provider_id} className="inline-flex items-center gap-2 bg-white/90 rounded px-2 py-1">
          {p.logo_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
              alt={p.provider_name}
              width={24}
              height={24}
              className="object-contain"
              sizes="24px"
            />
          )}
          <span className="text-xs text-gray-800">{p.provider_name}</span>
        </div>
      ))}
    </div>
  );
};

export default ProviderBadges;

