import RatingBadge from './RatingBadge';

export default function MediaCard({ item, watched, onToggleWatched, type = 'movie' }) {
  const isWatched = watched.has(item.id);

  return (
    <div
      className={`relative rounded-xl border transition-all duration-200 overflow-hidden group
        ${isWatched
          ? 'bg-[#12121a] border-emerald-500/30 opacity-80'
          : 'bg-[#12121a] border-[#1e1e2e] hover:border-red-500/40 hover:bg-[#16161f]'
        }`}
    >
      {/* Watched overlay indicator */}
      {isWatched && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400" />
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-base leading-tight truncate ${isWatched ? 'text-slate-400' : 'text-white'}`}>
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {item.year} · {item.director}
              {type === 'series' && item.seasons && ` · ${item.seasons} temporada${item.seasons > 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <RatingBadge rating={item.rating} />
          </div>
        </div>

        {/* Genre tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.genre.map((g) => (
            <span
              key={g}
              className="px-2 py-0.5 rounded-full text-xs bg-[#1e1e2e] text-slate-400 border border-[#2a2a3e]"
            >
              {g}
            </span>
          ))}
          {type === 'series' && item.seasons && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-800/60 text-slate-500 border border-slate-700/40">
              {item.seasons} temp.
            </span>
          )}
        </div>

        {/* Platform */}
        {item.platform && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.platform.split(',').map(p => p.trim()).map(p => {
              const color =
                p.startsWith('Netflix') ? 'bg-red-950/40 text-red-400 border-red-900/40' :
                p.startsWith('Prime') ? 'bg-cyan-950/40 text-cyan-400 border-cyan-900/40' :
                p.startsWith('Movistar') ? 'bg-blue-950/40 text-blue-400 border-blue-900/40' :
                p.startsWith('HBO') ? 'bg-violet-950/40 text-violet-400 border-violet-900/40' :
                p.startsWith('Disney') ? 'bg-indigo-950/40 text-indigo-400 border-indigo-900/40' :
                p.startsWith('Filmin') ? 'bg-orange-950/40 text-orange-400 border-orange-900/40' :
                p.startsWith('RTVE') || p.startsWith('Atres') ? 'bg-green-950/40 text-green-400 border-green-900/40' :
                'bg-slate-800/40 text-slate-500 border-slate-700/40';
              return (
                <span key={p} className={`px-2 py-0.5 rounded-full text-xs border flex items-center gap-1 ${color}`}>
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  {p}
                </span>
              );
            })}
          </div>
        )}

        {/* Synopsis */}
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
          {item.synopsis}
        </p>

        {/* Actors */}
        <div className="mb-4">
          <p className="text-xs text-slate-600 mb-1">Reparto principal</p>
          <div className="flex flex-wrap gap-1">
            {item.actors.slice(0, 4).map((actor) => (
              <span
                key={actor}
                className="px-2 py-0.5 rounded text-xs bg-slate-800/60 text-slate-400 border border-slate-700/50"
              >
                {actor}
              </span>
            ))}
          </div>
        </div>

        {/* Watched button */}
        <button
          onClick={() => onToggleWatched(item.id)}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
            ${isWatched
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
              : 'bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30'
            }`}
        >
          {isWatched ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Vista
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Marcar como vista
            </>
          )}
        </button>
      </div>
    </div>
  );
}
