import { useEffect, useMemo, useState } from 'react';
import externalApi from '@/api/externalApi';

const Chip = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
      active
        ? 'bg-sky-600 text-white border-sky-600'
        : 'bg-gray-800 text-zinc-200 border-gray-700 hover:bg-gray-700'
    }`}
  >
    {children}
  </button>
);

// type: 'movie' | 'tv'
const FilterBar = ({ type = 'movie', value, onChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = type === 'tv' ? await externalApi.getTvGenres() : await externalApi.getGenres();
        if (!mounted) return;
        const list = res.genres || res; // our getGenres returns object with genres
        setGenres(list || []);
      } catch (e) {}
    })();
    return () => { mounted = false; };
  }, [type]);

  const selected = value?.genres || [];
  const minRating = value?.minRating ?? 0;

  const toggle = (id) => {
    const exists = selected.includes(id);
    const next = exists ? selected.filter((g) => g !== id) : [...selected, id];
    onChange?.({ genres: next, minRating });
  };
  const changeRating = (r) => onChange?.({ genres: selected, minRating: r });
  const clear = () => onChange?.({ genres: [], minRating: 0 });

  const topGenres = useMemo(() => genres.slice(0, 12), [genres]);

  return (
    <div className="mx-4 mt-4 bg-gray-900 border border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium">Filters</h3>
        <button type="button" onClick={clear} className="text-sm text-sky-300 hover:underline">Clear</button>
      </div>
      <div>
        <div className="text-zinc-300 text-sm mb-2">Genres</div>
        <div className="flex flex-wrap gap-2">
          {topGenres.map((g) => (
            <Chip key={g.id} active={selected.includes(g.id)} onClick={() => toggle(g.id)}>
              {g.name}
            </Chip>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-zinc-300 text-sm">Minimum rating</span>
          <span className="text-white text-sm font-medium">{minRating.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          step={0.5}
          value={minRating}
          onChange={(e) => changeRating(parseFloat(e.target.value))}
          className="w-full mt-2 accent-sky-500"
        />
      </div>
    </div>
  );
};

export default FilterBar;

