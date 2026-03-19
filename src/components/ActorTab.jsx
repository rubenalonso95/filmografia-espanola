import { useState, useMemo } from 'react';
import { movies } from '../data/movies';
import { series } from '../data/series';
import RatingBadge from './RatingBadge';
import PlatformFilter, { matchesPlatform } from './PlatformFilter';

function ActorResultCard({ item, type, watched, onToggleWatched }) {
  const isWatched = watched.has(item.id);

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200
        ${isWatched
          ? 'bg-[#12121a] border-emerald-500/20 opacity-75'
          : 'bg-[#12121a] border-[#1e1e2e] hover:border-red-500/30'
        }`}
    >
      {/* Type icon */}
      <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
        ${type === 'movie' ? 'bg-red-950/40 text-red-400' : 'bg-blue-950/40 text-blue-400'}`}>
        {type === 'movie' ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h4 className={`font-semibold text-sm ${isWatched ? 'text-slate-400' : 'text-white'}`}>
              {item.title}
            </h4>
            <p className="text-xs text-slate-500">
              {item.year} · {item.director}
              {type === 'series' && item.seasons ? ` · ${item.seasons} temporada${item.seasons > 1 ? 's' : ''}` : ''}
            </p>
          </div>
          <RatingBadge rating={item.rating} />
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {item.genre.map(g => (
            <span key={g} className="px-1.5 py-0.5 rounded text-xs bg-[#1e1e2e] text-slate-500 border border-[#2a2a3e]">
              {g}
            </span>
          ))}
        </div>

        <p className="text-xs text-slate-600 line-clamp-1 mb-1">{item.synopsis}</p>
        {item.platform && (
          <div className="flex flex-wrap gap-1 mt-1">
            {item.platform.split(',').map(p => p.trim()).map(p => {
              const color =
                p.startsWith('Netflix') ? 'text-red-400 border-red-900/40' :
                p.startsWith('Prime') ? 'text-cyan-400 border-cyan-900/40' :
                p.startsWith('Movistar') ? 'text-blue-400 border-blue-900/40' :
                p.startsWith('HBO') ? 'text-violet-400 border-violet-900/40' :
                p.startsWith('Filmin') ? 'text-orange-400 border-orange-900/40' :
                'text-slate-500 border-slate-700/40';
              return (
                <span key={p} className={`px-1.5 py-0.5 rounded text-xs border bg-[#1a1a2e] ${color}`}>
                  {p}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Watched toggle */}
      <button
        onClick={() => onToggleWatched(item.id)}
        title={isWatched ? 'Marcar como no vista' : 'Marcar como vista'}
        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 border
          ${isWatched
            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'
            : 'bg-slate-800/60 border-slate-700/50 text-slate-600 hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-400'
          }`}
      >
        {isWatched ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function ActorTab({ watched, onToggleWatched }) {
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [platform, setPlatform] = useState(null);

  const allActors = useMemo(() => {
    const actorSet = new Set();
    [...movies, ...series].forEach(item => item.actors.forEach(a => actorSet.add(a)));
    return Array.from(actorSet).sort();
  }, []);

  const suggestions = useMemo(() => {
    if (!search.trim() || search.length < 2) return [];
    const q = search.toLowerCase();
    return allActors.filter(a => a.toLowerCase().includes(q)).slice(0, 8);
  }, [search, allActors]);

  const results = useMemo(() => {
    if (!submitted) return null;
    const q = submitted.toLowerCase();
    const filmography = [];

    movies.forEach(m => {
      if (m.actors.some(a => a.toLowerCase().includes(q))) {
        filmography.push({ ...m, type: 'movie' });
      }
    });
    series.forEach(s => {
      if (s.actors.some(a => a.toLowerCase().includes(q))) {
        filmography.push({ ...s, type: 'series' });
      }
    });

    return filmography.sort((a, b) => b.rating - a.rating);
  }, [submitted]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) setSubmitted(search.trim());
  };

  const handleSelectSuggestion = (actor) => {
    setSearch(actor);
    setSubmitted(actor);
  };

  const filteredResults = useMemo(() => {
    if (!results) return null;
    if (!platform) return results;
    return results.filter(r => matchesPlatform(r, platform));
  }, [results, platform]);

  const watchedInResults = filteredResults ? filteredResults.filter(r => watched.has(r.id)).length : 0;

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-white mb-1">Buscar por Actor</h2>
        <p className="text-sm text-slate-500">Encuentra toda la filmografía española de tu actor favorito</p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="relative mb-8">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <input
            type="text"
            placeholder="Ej: Javier Bardem, Penélope Cruz, Luis Tosar..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSubmitted(''); }}
            className="w-full pl-12 pr-32 py-4 bg-[#12121a] border border-[#1e1e2e] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 text-sm transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Buscar
          </button>
        </div>

        {/* Autocomplete suggestions */}
        {suggestions.length > 0 && !submitted && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#12121a] border border-[#1e1e2e] rounded-xl overflow-hidden z-10 shadow-2xl">
            {suggestions.map(actor => (
              <button
                key={actor}
                type="button"
                onClick={() => handleSelectSuggestion(actor)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-[#1e1e2e] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {actor}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Results */}
      {results === null && (
        <div className="text-center py-16 text-slate-600">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="text-sm">Escribe el nombre de un actor o actriz</p>
          <p className="text-xs mt-1 text-slate-700">
            Base de datos: {allActors.length} artistas en el catálogo
          </p>
        </div>
      )}

      {results !== null && results.length > 0 && (
        <PlatformFilter items={results} selected={platform} onSelect={setPlatform} />
      )}

      {results !== null && results.length === 0 && (
        <div className="text-center py-16 text-slate-600">
          <p className="text-sm">No se encontraron resultados para "<span className="text-slate-400">{submitted}</span>"</p>
          <p className="text-xs mt-1">Prueba con otro nombre o revisa la ortografía</p>
        </div>
      )}

      {results !== null && results.length > 0 && (
        <div>
          {/* Actor stats */}
          <div className="flex items-center justify-between mb-4 p-4 bg-[#12121a] rounded-xl border border-[#1e1e2e]">
            <div>
              <p className="text-white font-semibold">{submitted}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {results.length} obra{results.length > 1 ? 's' : ''} en el catálogo ·{' '}
                {results.filter(r => r.type === 'movie').length} película{results.filter(r => r.type === 'movie').length !== 1 ? 's' : ''},{' '}
                {results.filter(r => r.type === 'series').length} serie{results.filter(r => r.type === 'series').length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Vistas</p>
              <p className="text-white font-bold">{watchedInResults}/{filteredResults.length}</p>
            </div>
          </div>

          {filteredResults.length === 0 ? (
            <div className="text-center py-10 text-slate-600">
              <p className="text-sm">No hay obras en esta plataforma para {submitted}</p>
            </div>
          ) : (
            <>
              {platform && (
                <p className="text-xs text-slate-600 mb-4">{filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''}</p>
              )}
              <div className="flex flex-col gap-3">
                {filteredResults.map(item => (
                  <ActorResultCard
                    key={item.id}
                    item={item}
                    type={item.type}
                    watched={watched}
                    onToggleWatched={onToggleWatched}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
