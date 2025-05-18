export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface ApplicationCreate {
  project_id: number;
  status?: ApplicationStatus;
}

export interface ApplicationRead extends ApplicationCreate {
  id: number;
  user_id: number;
  applied_at: string;
}
