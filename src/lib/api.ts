const DATABASE_URL = process.env.DATABASE_URL || "http://localhost:8000";

const api = {
  projects: {
    list: async () => {
      const res = await fetch(`${DATABASE_URL}/projects/`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  },
};

export default api;
