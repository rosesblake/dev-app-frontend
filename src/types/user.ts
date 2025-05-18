export interface User {
  id: number;
  name: string;
  email: string;
  slug: string;
  role: string[];
  bio: string | null;
  github_url?: string | null;
  portfolio_url?: string | null;
  stack: string[];
  created_at: string;
}
