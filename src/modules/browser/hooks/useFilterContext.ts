import { LINKS } from "@/modules/browser/data/links";
import { useContext, useMemo, useState } from "react";
import { BrowserFilterContext, INITIAL_FILTERS } from "@/modules/browser/context/BrowserFilterContext";

export const useFilterContext = () => {
  const [filters, setFilters] = useContext(BrowserFilterContext);

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const readlist = useMemo(() => {
    const { tags, query } = filters;
    return LINKS
    .filter((link) => link.title.toLowerCase().includes(query.toLowerCase()) || link.name.toLowerCase().includes(query.toLowerCase()))
    .filter((link) => [...tags].every(tag => link.tags.includes(tag)))
  }, [filters, LINKS]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({...prev, ...newFilters}));
  }

  const toggleTag = (tag: string) => {
    let tags: string[]

    if (filters.tags.includes(tag)) {
      tags = filters.tags.filter(filterTag => filterTag != tag)
    } else {
      tags = [...filters.tags, tag]
    }

    updateFilters({ tags });
  }

  return {
    readlist,
    toggleTag,
    updateFilters,
    filters,
    clearFilters,
  }
}