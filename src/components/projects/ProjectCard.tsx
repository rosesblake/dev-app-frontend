import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { TagRow } from "@/components/shared/TagRow";
import Link from "next/link";
import { Project } from "@/types/project";

export default function ProjectCard({
  slug,
  title,
  description,
  stack,
  roles_needed,
  commitment_level,
  creator,
}: Project) {
  return (
    <Link href={`/projects/${slug}`}>
      <Card className="hover:shadow-md hover:scale-[1.01] transition-transform cursor-pointer h-full flex flex-col justify-between">
        <div className="flex flex-col gap-4 flex-1 px-6 pt-2 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription className="text-xs whitespace-nowrap">
              {creator.name}
            </CardDescription>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          <div className="grid gap-2 text-xs">
            <TagRow label="Stack" items={stack} detailsPage={false} />
            <TagRow label="Roles" items={roles_needed} detailsPage={false} />
          </div>
        </div>

        <CardFooter className="justify-end px-5 pb-2 pt-0">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
            <span className="uppercase">Commitment:</span>
            <span className="bg-muted text-foreground px-2 py-0.5 rounded-full">
              {commitment_level}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
