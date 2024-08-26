import { BrowserLinkItem } from "./BrowserLinkItem.tsx";
import type { FC } from "react";
import { clsx } from "clsx";
import { useLinkControl } from "@/modules/browser/hooks/useLinkControl";
import { useFilterContext } from "@/modules/browser/hooks/useFilterContext.ts";

interface ReadListProps {
  className?: string;
}

export const BrowserLinkList: FC<ReadListProps> = ({ className }) => {
  const { updateLink, hasRead } = useLinkControl();
  const { readlist, toggleTag } = useFilterContext();

  const handleTagClick = (tag: string) => {
    toggleTag(tag)
  }

  return (
    <ul className={clsx("flex flex-col gap-2", className)}>
      {readlist.map((item, idx) => (
        <BrowserLinkItem
          onChange={(link, read) => updateLink(link, { read })}
          onTagClick={handleTagClick}
          key={`${item.url}-${idx}`}
          item={item}
          checked={hasRead(item.url)}
        />
      ))}
    </ul>
  );
};
