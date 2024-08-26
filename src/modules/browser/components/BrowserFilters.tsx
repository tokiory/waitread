import { Badge } from "@/components/ui/badge";
import { clsx } from "clsx";
import type { ChangeEventHandler, FC } from "react";
import { useFilterContext } from "../hooks/useFilterContext";
import { Input } from "@/components/ui/input";
import type { LinkList } from "@/modules/browser/types/list.types";

interface ReadFiltersProps {
  className?: string;
}

export const BrowserFilters: FC<ReadFiltersProps> = ({ className }) => {
  const { filters, toggleTag, updateFilters } = useFilterContext();

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFilters({ query: e.target.value });
  }

  const { tags } = filters;
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <Input value={filters.query} onChange={handleQueryChange} placeholder="Search..." className="w-full" />

      {tags.length > 0 && (
        <div className="flex">
          {/* <p className="text-sm font-medium">Current tags:</p> */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <Badge className="cursor-pointer" onClick={() => toggleTag(tag)} key={`${idx}-${tag}`}>{tag}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
