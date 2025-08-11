import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const KEY = "robles-favs";

export function useFavorites() {
  const { user } = useAuth();
  const [setId, setSetId] = useState<Set<string>>(new Set());
  const storageKey = user ? `${KEY}:${user.id}` : KEY;

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    setSetId(raw ? new Set(JSON.parse(raw)) : new Set());
  }, [storageKey]);

  const persist = (s: Set<string>) => localStorage.setItem(storageKey, JSON.stringify([...s]));
  const isFavorite = (id: string) => setId.has(id);
  const toggleFavorite = (id: string) => {
    const next = new Set(setId);
    next.has(id) ? next.delete(id) : next.add(id);
    setSetId(next); persist(next);
  };
  return { isFavorite, toggleFavorite, all: [...setId] };
}
