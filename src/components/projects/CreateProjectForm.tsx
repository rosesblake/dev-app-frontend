"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModalStore } from "@/lib/stores/modalStore";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import api from "@/lib/api";
import { useUiStore } from "@/lib/stores/useUiStore";
import { useProjectStore } from "@/lib/stores/projectStore";
import { stackOptions, roleOptions, commitmentLevels } from "@/lib/constants";

export default function CreateProjectForm() {
  const closeModal = useModalStore((s) => s.closeModal);
  const { setLoading } = useUiStore();
  const { fetchProjects } = useProjectStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    stack: [] as string[],
    roles_needed: [] as string[],
    commitment_level: "",
    figma_url: "",
    github_repo: "",
  });
  const [error, setError] = useState("");

  const updateField = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleValueInArray = <K extends "stack" | "roles_needed">(
    key: K,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.projects.create(form);
      await fetchProjects();
      closeModal();
    } catch (e: any) {
      console.error(e);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Project title"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="What is this project about?"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label>Stack</Label>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto border rounded-md p-2">
            {stackOptions.map((tech) => (
              <Button
                key={tech}
                type="button"
                variant={form.stack.includes(tech) ? "default" : "outline"}
                onClick={() => toggleValueInArray("stack", tech)}
                className="text-xs"
              >
                {tech}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Roles Needed</Label>
          <div className="flex flex-wrap gap-2">
            {roleOptions.map((role) => (
              <Button
                key={role}
                type="button"
                variant={
                  form.roles_needed.includes(role) ? "default" : "outline"
                }
                onClick={() => toggleValueInArray("roles_needed", role)}
                className="text-xs"
              >
                {role}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Commitment Level</Label>
          <Select
            value={form.commitment_level}
            onValueChange={(val) => updateField("commitment_level", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {commitmentLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="figma">Figma URL</Label>
          <Input
            id="figma"
            value={form.figma_url}
            onChange={(e) => updateField("figma_url", e.target.value)}
            placeholder="https://..."
            type="url"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="repo">GitHub Repo</Label>
          <Input
            id="repo"
            value={form.github_repo}
            onChange={(e) => updateField("github_repo", e.target.value)}
            placeholder="https://..."
            type="url"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <DialogFooter className="mt-4">
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </DialogFooter>
    </form>
  );
}
