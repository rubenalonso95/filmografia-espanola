import { useState, useCallback } from 'react';

const STORAGE_KEY = 'filmografia-espanola-watched';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveToStorage(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // ignore
  }
}

export function useWatched() {
  const [watched, setWatched] = useState(() => loadFromStorage());

  const toggleWatched = useCallback((id) => {
    setWatched(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveToStorage(next);
      return next;
    });
  }, []);

  return { watched, toggleWatched };
}
