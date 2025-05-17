"use client";

import { Button } from "@/components/ui/button";
import { TagRow } from "@/components/TagRow";
import { useApplyModal } from "@/lib/stores/useApplyModal";
import { Project } from "@/types/project";

export function ClientProjectView({ project }: { project: Project }) {
  const { openModal } = useApplyModal();

  const handleOpenModal = () => {
    console.log("you clicked");
    openModal(project.id);
  };

  return (
    <main className="min-h-screen max-h-screen flex items-center justify-center bg-background px-4 pt-32 pb-16">
      <div className="w-full max-w-4xl bg-card border border-border rounded-2xl shadow-lg p-10 space-y-10">
        <section className="space-y-4 text-center border-b border-border pb-8">
          <h1 className="text-4xl font-bold text-foreground">
            {project.title}
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </section>

        {(project.github_repo || project.figma_url) && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm px-6">
            {project.github_repo && (
              <div>
                <h2 className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  GitHub
                </h2>
                <a
                  href={project.github_repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  View Repository →
                </a>
              </div>
            )}
            {project.figma_url && (
              <div>
                <h2 className="text-xs font-medium text-muted-foreground uppercase mb-1">
                  Figma
                </h2>
                <a
                  href={project.figma_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  View Design →
                </a>
              </div>
            )}
          </section>
        )}

        <section className="space-y-6 text-sm px-6">
          <div className="space-y-4">
            <TagRow label="Stack" items={project.stack} detailsPage={true} />
            <TagRow
              label="Roles"
              items={project.roles_needed}
              detailsPage={true}
            />
          </div>
          <div className="flex justify-end">
            <p className="text-xs text-muted-foreground italic">
              Commitment: {project.commitment_level}
            </p>
          </div>
        </section>

        <section className="rounded-lg bg-muted/50 p-6 space-y-4 text-sm">
          <div className="space-y-1">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase">
              Creator
            </h2>
            <p className="font-medium text-foreground text-base">
              {project.creator.name}
            </p>
            {project.creator.bio && (
              <p className="text-xs text-muted-foreground leading-snug">
                {project.creator.bio}
              </p>
            )}
          </div>

          {(project.creator.github_url || project.creator.portfolio_url) && (
            <div className="flex flex-wrap gap-4 text-xs">
              {project.creator.github_url && (
                <a
                  href={project.creator.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  GitHub →
                </a>
              )}
              {project.creator.portfolio_url && (
                <a
                  href={project.creator.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Portfolio →
                </a>
              )}
            </div>
          )}
        </section>

        <div className="flex justify-center gap-4 pt-6">
          <Button
            onClick={handleOpenModal}
            size="sm"
            className="cursor-pointer rounded-full px-6 py-2 text-sm font-medium shadow-md hover:shadow-lg transition"
          >
            Apply
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer rounded-full px-6 py-2 text-sm font-medium border-muted-foreground/40 text-muted-foreground hover:border-foreground hover:text-foreground transition"
          >
            Message
          </Button>
        </div>
      </div>
    </main>
  );
}
