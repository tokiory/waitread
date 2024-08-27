import { BrowserLinkItem } from "./BrowserLinkItem.tsx";
import { useState, type FC } from "react";
import { clsx } from "clsx";
import { useLinkControl } from "@/modules/browser/hooks/useLinkControl";
import {
  DEFAULT_TOPIC,
  useFilterContext,
} from "@/modules/browser/hooks/useFilterContext.ts";
import { BrowserLinkTopic } from "./BrowserLinkTopic.tsx";

interface ReadListProps {
  className?: string;
}

export const BrowserLinkList: FC<ReadListProps> = ({ className }) => {
  const { updateLink, hasRead } = useLinkControl();
  const { topicsMap, specificTopicLinks, toggleTag } = useFilterContext();
  const [hiddenTopics, setHiddenTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    if (hiddenTopics.includes(topic)) {
      setHiddenTopics(() => hiddenTopics.filter((t) => t !== topic));
    } else {
      setHiddenTopics(() => [...hiddenTopics, topic]);
    }
  };

  const handleTagClick = (tag: string) => {
    toggleTag(tag);
  };

  return (
    <div className={className}>
      <ul className="flex flex-col gap-2">
        {topicsMap.get(DEFAULT_TOPIC)!.map((item, idx) => (
          <BrowserLinkItem
            onChange={(link, read) => updateLink(link, { read })}
            onTagClick={handleTagClick}
            key={`${item.url}-${idx}`}
            item={item}
            checked={hasRead(item.url)}
          />
        ))}
      </ul>
      {specificTopicLinks.map(([topic, links]) => (
        <BrowserLinkTopic
          folded={hiddenTopics.includes(topic)}
          onToggle={toggleTopic}
          name={topic}
        >
          <ul className="flex mt-4 flex-col gap-2">
            {links.map((item, idx) => (
              <BrowserLinkItem
                onChange={(link, read) => updateLink(link, { read })}
                onTagClick={handleTagClick}
                key={`${item.url}-${idx}`}
                item={item}
                checked={hasRead(item.url)}
              />
            ))}
          </ul>
        </BrowserLinkTopic>
      ))}
    </div>
  );
};
