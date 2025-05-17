import { Project } from "@/types/project";
import api from "@/lib/api";
import { notFound } from "next/navigation";
import { ClientProjectView } from "@/components/projects/ClientProjectView"; // NEW

type Props = {
  params: { slug: string };
};

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project: Project | null = await api.projects.getBySlug(slug);
  if (!project) return notFound();

  return <ClientProjectView project={project} />;
}
