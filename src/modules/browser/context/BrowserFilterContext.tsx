import { createContext, useState, type Dispatch, type FC, type PropsWithChildren, type SetStateAction } from "react";

export const INITIAL_FILTERS = Object.freeze({
  tags: [] as string[],
  query: "" as string,
});

type BrowserFilterContextState = [
  typeof INITIAL_FILTERS,
  Dispatch<SetStateAction<typeof INITIAL_FILTERS>>
]

export const BrowserFilterContext = createContext<BrowserFilterContextState>([
  INITIAL_FILTERS,
  () => {},
])

export const BrowserFilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const contextState = useState(INITIAL_FILTERS);

  return (
    <BrowserFilterContext.Provider value={contextState}>
      {children}
    </BrowserFilterContext.Provider>
  )
};