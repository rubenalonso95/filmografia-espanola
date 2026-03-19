import { useState } from 'react';
import { useWatched } from './hooks/useWatched';
import MoviesTab from './components/MoviesTab';
import SeriesTab from './components/SeriesTab';
import ActorTab from './components/ActorTab';
import { movies } from './data/movies';
import { series } from './data/series';

const TABS = [
  {
    id: 'movies',
    label: 'Películas',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    id: 'series',
    label: 'Series',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'actor',
    label: 'Por Actor',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('movies');
  const { watched, toggleWatched } = useWatched();

  const totalWatched = watched.size;
  const totalItems = movies.length + series.length;
  const totalProgress = Math.round((totalWatched / totalItems) * 100);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#0a0a0f]/95 backdrop-blur border-b border-[#1e1e2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <div>
                <h1 className="text-base font-bold text-white leading-none">Filmografía Española</h1>
                <p className="text-xs text-slate-600 leading-none mt-0.5">Lo mejor del cine y la televisión</p>
              </div>
            </div>

            {/* Global progress */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-slate-500">Progreso total</p>
                <p className="text-xs font-bold text-white">
                  {totalWatched}/{totalItems} · <span className="text-red-400">{totalProgress}%</span>
                </p>
              </div>
              <div className="w-24 bg-[#1e1e2e] rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-red-600 to-red-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 -mb-px">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200
                  ${activeTab === tab.id
                    ? 'border-red-500 text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-700'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'movies' && (
          <MoviesTab watched={watched} onToggleWatched={toggleWatched} />
        )}
        {activeTab === 'series' && (
          <SeriesTab watched={watched} onToggleWatched={toggleWatched} />
        )}
        {activeTab === 'actor' && (
          <ActorTab watched={watched} onToggleWatched={toggleWatched} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e1e2e] py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-slate-700">
            Datos basados en valoraciones de Filmaffinity · {movies.length} películas · {series.length} series
          </p>
        </div>
      </footer>
    </div>
  );
}
