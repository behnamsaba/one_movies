import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import TrailerModal from './TrailerModal';
import ProviderBadges from './ProviderBadges';

const Hero = ({ item, trailerKey = null, providers = [], region = 'US' }) => {
  const [open, setOpen] = useState(false);
  if (!item) return null;

  const isTv = item.media_type === 'tv';
  const title = item.title || item.name || item.original_title || item.original_name;
  const overview = item.overview;
  const play = isTv ? 'show' : 'movie';
  const href = `/${play}/${item.id}`;
  const backdrop = item.backdrop_path || item.poster_path;

  return (
    <section className="relative w-full overflow-hidden rounded-lg bg-gray-900 mb-6">
      <div className="relative h-[48vh] sm:h-[56vh] md:h-[64vh]">
        {backdrop && (
          <Image
            src={`https://image.tmdb.org/t/p/w1280${backdrop}`}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-10 text-white max-w-5xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-md">{title}</h1>
          {overview && (
            <p className="mt-3 max-w-2xl text-sm sm:text-base md:text-lg text-gray-200 line-clamp-4">
              {overview}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {trailerKey ? (
              <button
                onClick={() => setOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
              >
                Play Trailer
              </button>
            ) : null}
            <Link href={href} className="bg-white/90 hover:bg-white text-black font-semibold px-4 py-2 rounded">
              More Info
            </Link>
          </div>
          <ProviderBadges providers={providers} region={region} />
        </div>
      </div>

      <TrailerModal open={open} onClose={() => setOpen(false)} youtubeKey={trailerKey} />
    </section>
  );
};

export default Hero;

