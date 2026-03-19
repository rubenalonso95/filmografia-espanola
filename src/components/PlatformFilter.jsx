const PLATFORMS = [
  { key: 'Netflix',    label: 'Netflix',      active: 'bg-red-600 text-white border-red-600',     inactive: 'text-red-400 border-red-900/40 hover:border-red-500/60' },
  { key: 'Prime',      label: 'Prime Video',  active: 'bg-cyan-600 text-white border-cyan-600',    inactive: 'text-cyan-400 border-cyan-900/40 hover:border-cyan-500/60' },
  { key: 'Movistar',   label: 'Movistar+',    active: 'bg-blue-600 text-white border-blue-600',    inactive: 'text-blue-400 border-blue-900/40 hover:border-blue-500/60' },
  { key: 'HBO',        label: 'HBO Max',       active: 'bg-violet-600 text-white border-violet-600', inactive: 'text-violet-400 border-violet-900/40 hover:border-violet-500/60' },
  { key: 'Disney',     label: 'Disney+',      active: 'bg-indigo-600 text-white border-indigo-600', inactive: 'text-indigo-400 border-indigo-900/40 hover:border-indigo-500/60' },
  { key: 'Filmin',     label: 'Filmin',       active: 'bg-orange-600 text-white border-orange-600', inactive: 'text-orange-400 border-orange-900/40 hover:border-orange-500/60' },
  { key: 'RTVE',       label: 'RTVE Play',    active: 'bg-green-700 text-white border-green-700',  inactive: 'text-green-400 border-green-900/40 hover:border-green-500/60' },
  { key: 'Atresplayer',label: 'Atresplayer',  active: 'bg-emerald-700 text-white border-emerald-700', inactive: 'text-emerald-400 border-emerald-900/40 hover:border-emerald-500/60' },
  { key: 'MUBI',       label: 'MUBI',         active: 'bg-slate-600 text-white border-slate-500',  inactive: 'text-slate-400 border-slate-700/50 hover:border-slate-500/60' },
  { key: 'FlixOlé',    label: 'FlixOlé',      active: 'bg-yellow-600 text-white border-yellow-600', inactive: 'text-yellow-400 border-yellow-900/40 hover:border-yellow-500/60' },
];

export function matchesPlatform(item, platformKey) {
  if (!platformKey) return true;
  if (!item.platform) return false;
  return item.platform.toLowerCase().includes(platformKey.toLowerCase());
}

export default function PlatformFilter({ items, selected, onSelect }) {
  // Only show platforms that exist in the current dataset
  const available = new Set();
  items.forEach(item => {
    if (!item.platform) return;
    PLATFORMS.forEach(p => {
      if (item.platform.includes(p.key)) available.add(p.key);
    });
  });

  const visible = PLATFORMS.filter(p => available.has(p.key));
  if (visible.length === 0) return null;

  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-3.5 h-3.5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
        <span className="text-xs text-slate-600 font-medium uppercase tracking-wider">Plataforma</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150
            ${!selected
              ? 'bg-slate-600 text-white border-slate-600'
              : 'bg-[#12121a] text-slate-400 border-[#1e1e2e] hover:border-slate-500/60'
            }`}
        >
          Todas
        </button>
        {visible.map(p => (
          <button
            key={p.key}
            onClick={() => onSelect(selected === p.key ? null : p.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 bg-[#12121a]
              ${selected === p.key ? p.active : p.inactive}`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
