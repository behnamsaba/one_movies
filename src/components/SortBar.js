import { useMemo } from 'react';

const SortBar = ({ value, onChange, options }) => {
  const opts = useMemo(
    () => options || [
      { value: 'popularity.desc', label: 'Popularity' },
      { value: 'vote_average.desc', label: 'Rating' },
      { value: 'date.desc', label: 'Release Date' },
      { value: 'title.asc', label: 'Title (A-Z)' },
    ],
    [options]
  );
  return (
    <div className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg p-3 mx-4 mt-4">
      <span className="text-sm text-zinc-300">Sort by</span>
      <select
        className="bg-gray-800 text-white px-3 py-2 rounded border border-gray-700"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {opts.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SortBar;

