import Link from 'next/link';
import MediaList from './MediaList';
import { useRef, useCallback, useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

// Horizontal scroll row using the existing MediaList item card
const Row = ({ title, items = [], viewAllHref }) => {
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const scrollByAmount = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(300, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }, []);

  const updateScrollPosition = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft <= 0);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollPosition();
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateScrollPosition();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => updateScrollPosition();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateScrollPosition, items]);

  if (!items || items.length === 0) return null;
  return (
    <section className="mb-6">
      <div className="flex items-baseline justify-between px-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm text-sky-200 hover:text-white">View all</Link>
        )}
      </div>
      <div className="relative mt-3 px-4">
        {/* Left arrow */}
        {!atStart && (
        <button
          type="button"
          aria-label="Scroll left"
          className="hidden sm:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => scrollByAmount(-1)}
        >
          <AiOutlineLeft size={20} />
        </button>
        )}

        {/* Left edge fade */}
        {!atStart && (
          <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900/80 to-transparent" />
        )}

        {/* Scroll container */}
        <div ref={scrollRef} onScroll={updateScrollPosition} className="overflow-x-auto pb-3 h-scrollbar scroll-smooth">
          <div className="flex gap-4 snap-x snap-mandatory">
            {items.map((it) => (
              <div key={`${it.id}-${it.media_type || it.title || it.name}`} className="snap-start shrink-0">
                <MediaList
                  id={it.id}
                  name={it.name}
                  title={it.title}
                  release_date={it.release_date}
                  first_air_date={it.first_air_date}
                  poster_path={it.poster_path}
                  vote_average={it.vote_average}
                  original_language={it.original_language}
                  overview={it.overview}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        {!atEnd && (
        <button
          type="button"
          aria-label="Scroll right"
          className="hidden sm:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => scrollByAmount(1)}
        >
          <AiOutlineRight size={20} />
        </button>
        )}

        {/* Right edge fade */}
        {!atEnd && (
          <div aria-hidden className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900/80 to-transparent" />
        )}
      </div>
    </section>
  );
};

export default Row;
