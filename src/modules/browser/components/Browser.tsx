import { BrowserLinkList } from "./BrowserLinkList.tsx";
import { type FC, useEffect, useState } from "react";
import { BrowserLinkControlProvider } from "@/modules/browser/context/BrowserLinkControlContext.tsx";
import { BrowserFilters } from "./BrowserFilters.tsx";
import { BrowserFilterProvider } from "@/modules/browser/context/BrowserFilterContext.tsx";
import { BrowserProgress } from "./BrowserProgress.tsx";
import { useFilterContext } from "@/modules/browser/hooks/useFilterContext.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { useReadlist } from "@/hooks/useReadlist.ts";
import { BrowserLoader } from "./BrowserLoader.tsx";
import { clsx } from "clsx";

interface BrowserProps {
  className?: string;
}

const BrowserInternal: FC<BrowserProps> = ({ className }) => {
  const {
    filters: { isFocusMode },
    updateFilters,
  } = useFilterContext();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    updateFilters({ query: params.get("q") || "" });
  }, [updateFilters]);

  return (
    <div className={clsx("mb-12", className)}>
      <BrowserFilters />
      {!isFocusMode && <BrowserProgress />}

      <Separator className="mt-4" />

      <BrowserLinkList className="mt-6" />
    </div>
  );
};

export const Browser: FC<BrowserProps> = ({ className }) => {
  const readlist = useReadlist();
  return (
    <BrowserLinkControlProvider>
      <BrowserFilterProvider links={readlist}>
        {readlist.length ? (
          <BrowserInternal className={className} />
        ) : (
          <BrowserLoader />
        )}
      </BrowserFilterProvider>
    </BrowserLinkControlProvider>
  );
};
