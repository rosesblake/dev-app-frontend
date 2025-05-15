export interface Creator {
  name: string;
  bio: string;
  github_url?: string;
  portfolio_url?: string;
  stack?: string[];
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  roles_needed: string[];
  commitment_level: string;
  creator: Creator;
}
