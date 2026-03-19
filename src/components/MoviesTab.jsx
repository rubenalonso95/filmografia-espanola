import { useState, useMemo } from 'react';
import { movies } from '../data/movies';
import MediaCard from './MediaCard';
import FilterBar from './FilterBar';
import PlatformFilter, { matchesPlatform } from './PlatformFilter';

export default function MoviesTab({ watched, onToggleWatched }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [platform, setPlatform] = useState(null);

  const watchedCount = useMemo(
    () => movies.filter(m => watched.has(m.id)).length,
    [watched]
  );

  const filtered = useMemo(() => {
    let result = [...movies];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.actors.some(a => a.toLowerCase().includes(q)) ||
        m.genre.some(g => g.toLowerCase().includes(q))
      );
    }

    if (platform) result = result.filter(m => matchesPlatform(m, platform));
    if (filter === 'watched') result = result.filter(m => watched.has(m.id));
    if (filter === 'unwatched') result = result.filter(m => !watched.has(m.id));

    return result;
  }, [search, filter, platform, watched]);

  const progress = Math.round((watchedCount / movies.length) * 100);

  return (
    <div className="animate-fade-in">
      {/* Progress bar */}
      <div className="mb-6 p-4 bg-[#12121a] rounded-xl border border-[#1e1e2e]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">
            <span className="text-white font-semibold">{watchedCount}</span> de{' '}
            <span className="text-white font-semibold">{movies.length}</span> películas vistas
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
        total={movies.length}
        watched={watchedCount}
      />

      <PlatformFilter items={movies} selected={platform} onSelect={setPlatform} />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-600">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          <p className="text-sm">No se encontraron películas</p>
        </div>
      ) : (
        <>
          {(platform || filter !== 'all' || search) && (
            <p className="text-xs text-slate-600 mb-4">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(movie => (
              <MediaCard
                key={movie.id}
                item={movie}
                watched={watched}
                onToggleWatched={onToggleWatched}
                type="movie"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
