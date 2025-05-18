export interface Creator {
  id: number;
  name: string;
  slug: string;
  bio: string;
  github_url?: string;
  portfolio_url?: string;
  stack?: string[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  stack: string[];
  roles_needed: string[];
  commitment_level: string;
  github_repo?: string;
  figma_url?: string;
  creator: Creator;
}

export interface Application {
  id: number;
  project_id: number;
  user_id: number;
  status: "pending" | "accepted" | "rejected";
  applied_at: string;
  project?: Project;
}
