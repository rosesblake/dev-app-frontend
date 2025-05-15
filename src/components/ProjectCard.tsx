"use client";

import { Card } from "@/components/ui/card";
import { Project } from "@/types/project";
import { TagRow } from "@/components/TagRow";

export default function ProjectCard({
  title,
  description,
  stack,
  roles_needed,
  commitment_level,
  creator,
}: Project) {
  return (
    <Card className="h-full flex flex-col justify-between p-4 rounded-lg border border-border bg-card hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {creator.name}
        </span>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">
        {description}
      </p>

      <div className="grid gap-[6px] text-[11px]">
        <TagRow label="Stack" items={stack} />
        <TagRow label="Roles" items={roles_needed} />
      </div>

      <div className="flex justify-end pt-1">
        <span className="bg-muted text-foreground px-2 py-0.5 rounded-full text-[10px] font-medium">
          {commitment_level}
        </span>
      </div>
    </Card>
  );
}
