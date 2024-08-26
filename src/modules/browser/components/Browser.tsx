import { BrowserLinkList } from "./BrowserLinkList.tsx";
import type { FC } from "react";
import { BrowserProvider } from "@/modules/browser/context/BrowserContext.tsx";
import { BrowserFilters } from "./BrowserFilters.tsx";
import { BrowserFilterProvider } from "@/modules/browser/context/BrowserFilterContext.tsx";
import { BrowserProgress } from "./BrowserProgress.tsx";

interface BrowserProps {
  className?: string;
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

export const Browser: FC<BrowserProps> = ({ className }) => {
  return (
    <BrowserProvider>
      <BrowserFilterProvider>
        <BrowserInternal className={className} />
      </BrowserFilterProvider>
    </BrowserProvider>
  );
};
