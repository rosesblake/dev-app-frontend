import { User } from "./user";

export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface ApplicationCreate {
  project_id: number;
  status?: ApplicationStatus;
}

export interface ApplicationRead {
  id: number;
  user_id: number;
  applied_at: string;
  status: "pending" | "accepted" | "rejected";
  project: {
    id: number;
    title: string;
    slug: string;
  };
  user: User;
}
