export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

export type GithubRepository = {
  id: number;
  index: number;
  name: string;
  full_name: string;
  archived: boolean;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  created_at: string; // ISO8601 format
  updated_at: string; // ISO8601 format
}

export type GithubSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepository[];
}
