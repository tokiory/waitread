import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import type { FC, PropsWithChildren } from "react";

interface BrowserLinkCategoryProps {
  className?: string;
  name: string;
  folded?: boolean;
  onToggle?: (topic: string) => void;
}

export const BrowserLinkTopic: FC<
  PropsWithChildren<BrowserLinkCategoryProps>
> = ({ children, name, folded, onToggle }) => {
  const title = name[0].toUpperCase() + name.slice(1);
  return (
    <div>
      <h1
        onClick={() => onToggle?.(name)}
        className="flex justify-between items-center text-xl font-medium mt-6 select-none cursor-pointer"
      >
        {title}
        <Icon
          icon="tabler:chevron-down"
          className={clsx(
            "w-4 h-4 transition-transform",
            folded && "rotate-180"
          )}
        />
      </h1>
      <Separator className="mt-2" />
      {!folded && children}
    </div>
  );
};
