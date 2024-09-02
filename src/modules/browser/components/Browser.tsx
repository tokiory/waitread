import { BrowserLinkList } from "./BrowserLinkList.tsx";
import { type FC, useEffect } from "react";
import { BrowserLinkControlProvider } from "@/modules/browser/context/BrowserLinkControlContext.tsx";
import { BrowserFilters } from "./BrowserFilters.tsx";
import { BrowserFilterProvider } from "@/modules/browser/context/BrowserFilterContext.tsx";
import { BrowserProgress } from "./BrowserProgress.tsx";
import type { LinkList } from "@/modules/browser/types/list.types";
import { useFilterContext } from "@/modules/browser/hooks/useFilterContext.ts";
import { Separator } from "@/components/ui/separator.tsx";

interface BrowserProps {
  className?: string;
  links: LinkList;
}

const BrowserInternal: FC<BrowserProps> = ({ className }) => {
  const {
    filters: { isFocusMode },
    updateFilters,
  } = useFilterContext();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params);
    updateFilters({ query: params.get("q") || "" });
  }, [updateFilters]);

  return (
    <div className={className}>
      <BrowserFilters />
      {!isFocusMode && <BrowserProgress />}

      <Separator className="mt-4" />

      <BrowserLinkList className="mt-6" />
    </div>
  );
};

export const Browser: FC<BrowserProps> = ({ className, links }) => {
  return (
    <BrowserLinkControlProvider>
      <BrowserFilterProvider links={links}>
        <BrowserInternal links={links} className={className} />
      </BrowserFilterProvider>
    </BrowserLinkControlProvider>
  );
};
