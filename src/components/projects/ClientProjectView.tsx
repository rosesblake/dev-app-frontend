"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TagRow } from "@/components/shared/TagRow";
import { Project } from "@/types/project";
import { ApplicationCreate, ApplicationRead } from "@/types/application";
import api from "@/lib/api";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import ApplicantsList from "./ApplicantsList";

export function ClientProjectView({ project }: { project: Project }) {
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const { currentUser } = useAuthStore();
  const [showButtons, setShowButtons] = useState<Boolean | null>(null);
  const [applications, setApplications] = useState<ApplicationRead[]>([]);

  useEffect(() => {
    setLoading(true);
    if (!currentUser) {
      setLoading(false);
      return;
    }
    const check = async () => {
      try {
        const projectApps = await api.applications.getProjectApps(project.id);
        setApplications(projectApps);

        const userApps = await api.users.applications(currentUser.id);
        setHasApplied(userApps.some((app) => app.project.id === project.id));
        setShowButtons(project.creator.id === currentUser?.id);
      } catch (err) {
        console.error("Error checking applications", err);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, [currentUser, project.id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: ApplicationCreate = {
      project_id: project.id,
      status: "pending",
    };
    await api.applications.apply(data);
    setHasApplied(true);
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-background px-6 pt-24 pb-8">
      <section className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-5xl font-bold text-foreground mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {project.description}
        </p>
      </section>

      <section className="max-w-4xl mx-auto space-y-8">
        {(project.github_repo || project.figma_url) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.github_repo && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  GitHub
                </p>
                <a
                  href={project.github_repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 hover:opacity-80"
                >
                  View Repository →
                </a>
              </div>
            )}
            {project.figma_url && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Figma
                </p>
                <a
                  href={project.figma_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 hover:opacity-80"
                >
                  View Design →
                </a>
              </div>
            )}
          </div>
        )}
        <div className="space-y-6">
          <TagRow label="Stack" items={project.stack} detailsPage />
          <TagRow label="Roles" items={project.roles_needed} detailsPage />
        </div>
        <div className="flex justify-end mt-2">
          <p className="text-xs text-muted-foreground italic">
            Commitment: {project.commitment_level}
          </p>
        </div>
        <Card className="bg-muted/50">
          <CardContent className="px-6 py-2 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Creator
            </p>
            <p className="text-base font-medium text-foreground">
              {project.creator.name}
            </p>
            {project.creator.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.creator.bio}
              </p>
            )}
            {(project.creator.github_url || project.creator.portfolio_url) && (
              <div className="flex flex-wrap gap-4 text-sm pt-2">
                {project.creator.github_url && (
                  <a
                    href={project.creator.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:opacity-80"
                  >
                    GitHub →
                  </a>
                )}
                {project.creator.portfolio_url && (
                  <a
                    href={project.creator.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4 hover:opacity-80"
                  >
                    Portfolio →
                  </a>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        {!showButtons && (
          <div className="flex justify-center gap-4 pt-6">
            {hasApplied ? (
              <Button disabled size="lg" className="rounded-full px-8">
                Applied
              </Button>
            ) : (
              <Button
                onClick={handleApply}
                size="lg"
                className="rounded-full px-8 shadow-md hover:shadow-lg transition"
              >
                Apply
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-muted-foreground/40 text-muted-foreground hover:border-foreground hover:text-foreground transition"
            >
              Message
            </Button>
          </div>
        )}
        {showButtons && <ApplicantsList applications={applications} />}
      </section>
    </main>
  );
}
