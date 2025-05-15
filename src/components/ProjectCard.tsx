"use client";

import { Card } from "@/components/ui/card";
import { Project } from "@/types/project";

export default function ProjectCard({
  title,
  description,
  stack,
  roles_needed,
  commitment_level,
  creator,
}: Project) {
  return (
    <Card className="p-5 rounded-xl border border-border bg-card hover:shadow-md transition space-y-4 cursor-pointer">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {[
          ...stack.slice(0, 3),
          ...roles_needed.slice(0, 2),
          commitment_level,
        ].map((tag, i) => (
          <span
            key={i}
            className="bg-muted px-2 py-0.5 rounded-full text-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="text-xs text-muted-foreground pt-2">
        by <span className="text-foreground font-medium">{creator.name}</span>
      </div>
    </Card>
  );
}
