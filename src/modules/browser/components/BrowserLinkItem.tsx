import type { LinkListItem } from "@/modules/browser/types/list.types";
import { Checkbox } from "../../../components/ui/checkbox";
import { Badge } from "../../../components/ui/badge";
import { type FC } from "react";
import { useFilterContext } from "../hooks/useFilterContext";

interface ReadItemProps {
  item: LinkListItem;
  checked?: boolean;
  onChange: (link: string, checked: boolean) => void;
  onTagClick: (tag: string) => void;
}

export const BrowserLinkItem: FC<ReadItemProps> = ({
  item,
  onChange,
  onTagClick,
  checked,
}) => {
  const {
    filters: { isFocusMode, isReadOnClick },
  } = useFilterContext();

  const handleChange = (checked: boolean) => {
    onChange(item.url, checked);
  };

  const handleLinkClick = () => {
    if (isReadOnClick) {
      handleChange(!checked);
    }
  };

  return (
    <li className="flex flex-col md:flex-row md:justify-between md:items-center border-b px-1 py-3 sm:px-2 md:p-0 md:border-none gap-2">
      <div className="flex gap-2 items-start">
        <Checkbox
          onCheckedChange={handleChange}
          className="mt-1"
          checked={checked}
        />
        <a
          target="_blank"
          className="flex flex-col sm:block transition-all hover:underline"
          onClick={handleLinkClick}
          href={item.url}
        >
          <span className="font-medium shrink-0">{item.name}</span>
          <span className="hidden sm:inline-block">:&nbsp;</span>
          <span>{item.title}</span>
        </a>
      </div>
      {!isFocusMode && (
        <div className="flex ml-6 gap-2">
          {item.tags.map((tag, idx) => (
            <Badge
              onClick={() => onTagClick(tag)}
              key={`${tag}-${idx}`}
              className="w-fit cursor-pointer"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </li>
  );
};
