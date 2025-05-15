import { Project } from "@/types/project";

export const mockProjects: Project[] = [
  {
    title: "Dev Match",
    description:
      "A platform to connect developers looking to build and collaborate on side projects.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Prisma ORM", "React.js"],
    roles_needed: ["Frontend", "Backend"],
    commitment_level: "Part-time",
    creator: {
      name: "Blake Roses",
      bio: "Full-stack dev passionate about building tools that connect people.",
      github_url: "https://github.com/rosesblake",
      portfolio_url: "https://blakeroses.dev",
      stack: ["React", "Node.js", "TypeScript"],
    },
  },
  {
    title: "Crypto Tracker",
    description: "Real-time portfolio tracking app with alerts and charts.",
    stack: ["React", "Node.js", "MongoDB"],
    roles_needed: ["Frontend"],
    commitment_level: "Full-time",
    creator: {
      name: "Jamie Lee",
      bio: "Frontend engineer focused on data viz and clean UI.",
      github_url: "https://github.com/jamielee",
      portfolio_url: "https://jamielee.dev",
      stack: ["React", "Tailwind", "D3.js"],
    },
  },
  {
    title: "SoundSync",
    description:
      "A collaborative online DAW that lets musicians jam remotely in real time.",
    stack: ["WebRTC", "React", "Elixir"],
    roles_needed: ["Backend", "Fullstack"],
    commitment_level: "Weekend-only",
    creator: {
      name: "Alex Kwon",
      bio: "Musician turned engineer building music tech.",
      github_url: "https://github.com/alexkwon",
      portfolio_url: "https://alexkwon.dev",
      stack: ["Elixir", "Phoenix", "TypeScript"],
    },
  },
  {
    title: "GreenVote",
    description:
      "A civic tech tool to visualize how local politicians vote on climate-related bills.",
    stack: ["Vue", "Go", "PostgreSQL"],
    roles_needed: ["Frontend", "Designer"],
    commitment_level: "10 hrs/week",
    creator: {
      name: "Maria Chen",
      bio: "Civic hacker with a passion for climate data transparency.",
      github_url: "https://github.com/mariachen",
      portfolio_url: "https://mariachen.dev",
      stack: ["Go", "Vue", "Django"],
    },
  },
  {
    title: "PixelPals",
    description:
      "A gamified accountability app where you raise a pet by completing daily goals.",
    stack: ["Flutter", "Firebase"],
    roles_needed: ["Product", "Frontend"],
    commitment_level: "Light",
    creator: {
      name: "Dev Patel",
      bio: "Mobile dev who loves building wholesome tools that help people grow.",
      github_url: "https://github.com/devpatel",
      portfolio_url: "https://devpatel.dev",
      stack: ["Flutter", "Dart", "Firebase"],
    },
  },
];
