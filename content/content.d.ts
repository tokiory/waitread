interface LinkListItem {
  name: string;
  title: string;
  url: string;
  tags: string[];
  status?: string;
}

// Specify the file extension you want to import
declare module '#/articles.yaml' {
  const value: LinkListItem[]; // Add type definitions here if desired
  export default value;
}