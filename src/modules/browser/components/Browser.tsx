import { BrowserLinkList } from "./BrowserLinkList.tsx";
import type { FC } from "react";
import { BrowserLinkControlProvider } from "@/modules/browser/context/BrowserLinkControlContext.tsx";
import { BrowserFilters } from "./BrowserFilters.tsx";
import { BrowserFilterProvider } from "@/modules/browser/context/BrowserFilterContext.tsx";
import { BrowserProgress } from "./BrowserProgress.tsx";
import type { LinkList } from "@/modules/browser/types/list.types";
import { useFilterContext } from "@/modules/browser/hooks/useFilterContext.ts";

interface BrowserProps {
  className?: string;
  links: LinkList;
}

const BrowserInternal: FC<BrowserProps> = ({ className }) => {
  const {
    filters: { isFocusMode },
  } = useFilterContext();

  return (
    <div className={className}>
      {!isFocusMode && <BrowserProgress />}
      <BrowserFilters className="mt-4" />

      <div className="mt-4 border-b-2" />

      <BrowserLinkList className="mt-4" />
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
