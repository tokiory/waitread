import {
  createContext,
  useMemo,
  useState,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import type { LinkList } from "@/modules/browser/types/list.types";

interface InitialFilters {
  tags: string[];
  query: string;
  isReadOnClick: boolean;
  isFocusMode: boolean;
  isFavoriteVisible: boolean;
}

export const INITIAL_FILTERS: InitialFilters = Object.freeze({
  tags: [] as string[],
  query: "" as string,
  isReadOnClick: false,
  isFocusMode: false,
  isFavoriteVisible: false,
});

interface BrowserFilterContextState {
  links: LinkList;
  filters: typeof INITIAL_FILTERS;
  setFilters: Dispatch<SetStateAction<typeof INITIAL_FILTERS>>;
}

export const BrowserFilterContext = createContext<BrowserFilterContextState>({
  links: [] as LinkList,
  filters: INITIAL_FILTERS,
  setFilters: () => {},
});

interface BrowserFilterProviderProps {
  links: LinkList;
}

export const BrowserFilterProvider: FC<
  PropsWithChildren<BrowserFilterProviderProps>
> = ({ children, links }) => {
  const [filters, setFilters] =
    useState<typeof INITIAL_FILTERS>(INITIAL_FILTERS);

  const contextState = useMemo(
    () => ({
      links,
      filters,
      setFilters,
    }),
    [links, filters]
  );

  return (
    <BrowserFilterContext.Provider value={contextState}>
      {children}
    </BrowserFilterContext.Provider>
  );
};
