import { BrowserLinkList } from "./BrowserLinkList.tsx";
import type { FC } from "react";
import { BrowserLinkControlProvider } from "@/modules/browser/context/BrowserLinkControlContext.tsx";
import { BrowserFilters } from "./BrowserFilters.tsx";
import { BrowserFilterProvider } from "@/modules/browser/context/BrowserFilterContext.tsx";
import { BrowserProgress } from "./BrowserProgress.tsx";
import type { LinkList } from "@/modules/browser/types/list.types";

interface BrowserProps {
  className?: string;
  links: LinkList;
}

const BrowserInternal: FC<BrowserProps> = ({ className }) => {
  return (
    <div className={className}>
      <BrowserProgress />
      <BrowserFilters className="mt-4" />
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
