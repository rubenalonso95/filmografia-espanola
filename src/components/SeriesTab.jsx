import { useState, useMemo } from 'react';
import { series } from '../data/series';
import MediaCard from './MediaCard';
import FilterBar from './FilterBar';
import PlatformFilter, { matchesPlatform } from './PlatformFilter';

export default function SeriesTab({ watched, onToggleWatched }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [platform, setPlatform] = useState(null);

  const watchedCount = useMemo(
    () => series.filter(s => watched.has(s.id)).length,
    [watched]
  );

  const filtered = useMemo(() => {
    let result = [...series];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.director.toLowerCase().includes(q) ||
        s.actors.some(a => a.toLowerCase().includes(q)) ||
        s.genre.some(g => g.toLowerCase().includes(q)) ||
        (s.platform && s.platform.toLowerCase().includes(q))
      );
    }

    if (platform) result = result.filter(s => matchesPlatform(s, platform));
    if (filter === 'watched') result = result.filter(s => watched.has(s.id));
    if (filter === 'unwatched') result = result.filter(s => !watched.has(s.id));

    return result;
  }, [search, filter, platform, watched]);

  const progress = Math.round((watchedCount / series.length) * 100);

  return (
    <div className="animate-fade-in">
      {/* Progress bar */}
      <div className="mb-6 p-4 bg-[#12121a] rounded-xl border border-[#1e1e2e]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">
            <span className="text-white font-semibold">{watchedCount}</span> de{' '}
            <span className="text-white font-semibold">{series.length}</span> series vistas
          </span>
          <span className="text-sm font-bold text-red-400">{progress}%</span>
        </div>
        <div className="w-full bg-[#1e1e2e] rounded-full h-2">
          <div
            className="bg-gradient-to-r from-red-600 to-red-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <FilterBar
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
        total={series.length}
        watched={watchedCount}
      />

      <PlatformFilter items={series} selected={platform} onSelect={setPlatform} />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-600">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">No se encontraron series</p>
        </div>
      ) : (
        <>
          {(platform || filter !== 'all' || search) && (
            <p className="text-xs text-slate-600 mb-4">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(s => (
              <MediaCard
                key={s.id}
                item={s}
                watched={watched}
                onToggleWatched={onToggleWatched}
                type="series"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
