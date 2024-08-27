export interface LinkListItem {
  name: string;
  title: string;
  url: string;
  tags: string[];
  status?: string;
  topic?: string;
  favorite?: boolean;
}

export type LinkList = LinkListItem[];

export interface LinkState {
  read: boolean;
  favorite: boolean;
}

export type LinkStateMap = Map<string, LinkState>;
