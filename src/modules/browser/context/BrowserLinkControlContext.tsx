import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import type {
  LinkState,
  LinkStateMap,
} from "@/modules/browser/types/list.types";

type BrowserLinkControlContextState = [
  LinkStateMap,
  Dispatch<SetStateAction<LinkStateMap>>
];

export const LINK_STATE_MAP_KEY = "link-state-map";

export const BrowserLinkControlContext = createContext<BrowserLinkControlContextState>([
  new Map(),
  () => {},
]);

export const BrowserLinkControlProvider: FC<PropsWithChildren> = ({ children }) => {
  const contextState = useState<LinkStateMap>(() => new Map());
  const [_linkStateMap, setLinkStateMap] = contextState;

  useEffect(() => {
    const cachedCheckList = localStorage.getItem(LINK_STATE_MAP_KEY);

    if (!cachedCheckList) {
      return;
    }

    try {
      const valuePairs = JSON.parse(cachedCheckList);
      const cachedStatesMap = new Map<string, LinkState>(valuePairs);
      setLinkStateMap(cachedStatesMap);
    } catch {
      const error = new Error("Failed to parse check list from local storage");
      console.error(error);
    }
  }, [LINK_STATE_MAP_KEY]);

  return (
    <BrowserLinkControlContext.Provider
      value={contextState}
    >
      {children}
    </BrowserLinkControlContext.Provider>
  );
};
