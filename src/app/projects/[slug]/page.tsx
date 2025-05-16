import { Project } from "@/types/project";
import api from "@/lib/api";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TagRow } from "@/components/TagRow";

export const dynamic = "force-dynamic";

type Props = {
  params: { slug: string };
};

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project: Project | null = await api.projects.getBySlug(slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 pt-32 pb-16">
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
            <TagRow label="Stack" items={project.stack} />
            <TagRow label="Roles" items={project.roles_needed} />
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

        <div className="flex justify-center gap-4 pt-2">
          <Button size="sm">Apply</Button>
          <Button size="sm" variant="outline">
            Message
          </Button>
        </div>
      </div>
    </main>
  );
}
