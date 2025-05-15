"use client";

import ProjectCard from "@/components/ProjectCard";
import { mockProjects } from "@/lib/mockProjects";

export default function ProjectsList() {
  return (
    <main className="min-h-screen w-full bg-background px-6 py-16">
      <section className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Explore Projects
          </h1>
          <p className="text-muted-foreground text-sm">
            Find real dev collabs based on stack, roles, and vibe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
}
