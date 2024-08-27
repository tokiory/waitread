import { Badge } from "@/components/ui/badge";
import { clsx } from "clsx";
import type { ChangeEventHandler, FC } from "react";
import { useFilterContext } from "../hooks/useFilterContext";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Icon } from "@iconify/react";

interface ReadFiltersProps {
  className?: string;
}

export const BrowserFilters: FC<ReadFiltersProps> = ({ className }) => {
  const { filters, toggleTag, updateFilters, clearFilters } =
    useFilterContext();

  const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateFilters({ query: e.target.value });
  };

  const handleToggler = (field: string, status: boolean) => {
    updateFilters({ [field]: status });
  };

  const handleFocusMode = (status: boolean) => {
    clearFilters();
    updateFilters({ isFocusMode: !filters.isFocusMode });
  };

  const { tags, isFocusMode, isReadOnClick, isFavoriteVisible } = filters;
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      <div className="flex flex-col items-start md:flex-row md:justify-start gap-2">
        {!isFocusMode && (
          <Input
            value={filters.query}
            onChange={handleQueryChange}
            placeholder="Search..."
            className="w-full"
          />
        )}
        <div className="flex shrink-0 gap-2">
          <Toggle
            className="flex gap-2"
            variant="outline"
            onPressedChange={handleFocusMode}
            pressed={isFocusMode}
          >
            <Icon icon="tabler:loader" />
            <span>Focus</span>
          </Toggle>
          <Toggle
            className="flex gap-2"
            variant="outline"
            onPressedChange={(status) => handleToggler("isReadOnClick", status)}
            pressed={isReadOnClick}
          >
            <Icon icon="tabler:checks" />
            <span>Read on link click</span>
          </Toggle>
          <Toggle
            className={clsx(
              "flex gap-2",
              isFavoriteVisible && "!text-yellow-600"
            )}
            variant="outline"
            onPressedChange={(status) =>
              handleToggler("isFavoriteVisible", status)
            }
            pressed={isFavoriteVisible}
          >
            <Icon icon="tabler:star" />
            <span>Author Favorites</span>
          </Toggle>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium">Tags:</p>
          {tags.map((tag, idx) => (
            <Badge
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
              key={`${idx}-${tag}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
