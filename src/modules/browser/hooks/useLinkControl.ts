import { useContext } from "react";
import { BrowserContext } from "@/modules/browser/context/BrowserContext";
import { LINK_STATE_MAP_KEY } from "@/modules/browser/context/BrowserContext";

interface LinkState {
  read: boolean;
  favorite: boolean;
}

const DEFAULT_LINK_STATE: LinkState = {
  read: false,
  favorite: false,
}

export const useLinkControl = () => {
  const [linkStateMap, setLinkStateMap] = useContext(BrowserContext);

  const updateLink = (link: string, state: Partial<LinkState>) => {
    const oldState = linkStateMap.get(link) || DEFAULT_LINK_STATE;
    const linkStates = structuredClone(linkStateMap).set(link, {...oldState, ...state});
    const serializedLinkStates = JSON.stringify(Array.from(linkStates.entries()));
    localStorage.setItem(LINK_STATE_MAP_KEY, serializedLinkStates);
    setLinkStateMap(() => linkStates);
  }

  const clearHistory = () => {
    localStorage.removeItem(LINK_STATE_MAP_KEY);
    setLinkStateMap(new Map());
  }

  const hasRead = (link: string) => {
    return linkStateMap.get(link)?.read;
  }

  const getAllRead = () => {
    return Array.from(linkStateMap.entries()).filter(([_, state]) => state.read);
  }

	return {
    linkStateMap,
    updateLink,
    hasRead,
    getAllRead,
    clearHistory
	};
}