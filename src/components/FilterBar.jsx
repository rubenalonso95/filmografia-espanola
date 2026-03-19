export default function FilterBar({ search, onSearch, filter, onFilter, total, watched }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Buscar por título, director o actor..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-[#12121a] border border-[#1e1e2e] rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 transition-colors"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onFilter('all')}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border
            ${filter === 'all' ? 'bg-red-600 text-white border-red-600' : 'bg-[#12121a] text-slate-400 border-[#1e1e2e] hover:border-red-500/30'}`}
        >
          Todas ({total})
        </button>
        <button
          onClick={() => onFilter('unwatched')}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border
            ${filter === 'unwatched' ? 'bg-red-600 text-white border-red-600' : 'bg-[#12121a] text-slate-400 border-[#1e1e2e] hover:border-red-500/30'}`}
        >
          Pendientes ({total - watched})
        </button>
        <button
          onClick={() => onFilter('watched')}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border
            ${filter === 'watched' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-[#12121a] text-slate-400 border-[#1e1e2e] hover:border-emerald-500/30'}`}
        >
          Vistas ({watched})
        </button>
      </div>
    </div>
  );
}
