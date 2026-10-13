export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  url: string;
  repositoryUrl?: string;
  technologies: string[];
};

export const projects: PortfolioProject[] = [
  {
    id: "recipe-book",
    title: "Recipe Book",
    description:
      "A full-stack application for creating, viewing, editing, and deleting personal recipes.",
    url: "https://your-deployed-recipe-app.vercel.app",
    repositoryUrl: "https://github.com/your-username/recipe-book",
    technologies: ["Next.js", "Auth.js", "PostgreSQL"],
  },
  {
    id: "data-analysis",
    title: "Data Analysis Project",
    description:
      "An exploratory data-analysis project using Python and Pandas to clean and summarize a dataset.",
    url: "https://your-hosted-analysis-url",
    technologies: ["Python", "Pandas", "Jupyter"],
  },
  {
    id: "electronics",
    title: "Electronics / Mesh Network",
    description:
      "A hardware or networking project demonstrating my interest in electronics and mesh networking.",
    url: "https://your-hosted-project-url",
    technologies: ["Electronics", "Networking"],
  },
];