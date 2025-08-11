import { useState, useCallback } from 'react';

export interface Comment {
  id: string;
  comment: string;
  author: string;
  date: string;
  rating?: number;
}

export function useExpandableComments() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleRow = useCallback((id: string) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const expandAll = useCallback(() => {
    setExpanded({});
  }, []);

  const collapseAll = useCallback(() => {
    setExpanded({});
  }, []);

  return {
    expanded,
    toggleRow,
    expandAll,
    collapseAll
  };
}
