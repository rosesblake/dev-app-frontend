"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";
import { useProjectStore } from "@/lib/stores/projectStore";
import { Spinner } from "../ui/Spinner";
import { useModalStore } from "@/lib/stores/modalStore";
import CreateProjectForm from "./CreateProjectForm";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import LoginPage from "@/app/login/page";

export default function MyProjectsList() {
  const { projects, loading, error, fetchProjects } = useProjectStore();
  const { openModal } = useModalStore();
  const { currentUser } = useAuthStore();

  useEffect(() => {
    try {
      fetchProjects();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleModalChoice = () => {
    return currentUser
      ? openModal(<CreateProjectForm />)
      : openModal(
          <LoginPage
            isModal
            onSuccess={() => openModal(<CreateProjectForm />)}
          />
        );
  };

  const myProjects = currentUser
    ? projects.filter((p) => p.creator.id === currentUser.id)
    : [];

  return (
    <main className="w-full bg-background px-6 py-32 relative">
      <section className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">My Projects</h1>
          <p className="text-muted-foreground text-sm">
            Manage the projects you've created.
          </p>
        </div>

        {loading && <Spinner centered />}
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-visible">
          {myProjects.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -1, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="overflow-visible h-full"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
