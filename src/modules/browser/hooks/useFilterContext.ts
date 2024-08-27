import { useContext, useMemo } from "react";
import {
  BrowserFilterContext,
  INITIAL_FILTERS,
} from "@/modules/browser/context/BrowserFilterContext";

export const DEFAULT_TOPIC = "other";

export const useFilterContext = () => {
  const { filters, setFilters, links } = useContext(BrowserFilterContext);

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const readlist = useMemo(() => {
    const { tags, query } = filters;
    return links
      .filter(
        (link) =>
          link.title.toLowerCase().includes(query.toLowerCase()) ||
          link.name.toLowerCase().includes(query.toLowerCase())
      )
      .filter((link) => [...tags].every((tag) => link.tags.includes(tag)));
  }, [filters, links]);

  const topicsMap = useMemo(() => {
    const topicsLinksMap = new Map<string, LinkListItem[]>();

    readlist.forEach((link) => {
      const topic = link?.topic || DEFAULT_TOPIC;
      const topicLinks = topicsLinksMap.get(topic);

      if (topicLinks) {
        topicLinks.push(link);
      } else {
        topicsLinksMap.set(topic, [link]);
      }
    });

    return topicsLinksMap;
  }, [readlist, DEFAULT_TOPIC]);

  const specificTopicLinks = useMemo(() => {
    return [...topicsMap.entries()].filter(
      ([topic]) => topic !== DEFAULT_TOPIC
    );
  }, [topicsMap, DEFAULT_TOPIC]);

  const topics = useMemo(() => {
    return [...topicsMap.keys()];
  }, [topicsMap]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const toggleTag = (tag: string) => {
    let tags: string[];

    if (filters.tags.includes(tag)) {
      tags = filters.tags.filter((filterTag) => filterTag != tag);
    } else {
      tags = [...filters.tags, tag];
    }

    updateFilters({ tags });
  };

  return {
    readlist,
    toggleTag,
    updateFilters,
    filters,
    clearFilters,
    topicsMap,
    specificTopicLinks,
    topics,
  };
};
