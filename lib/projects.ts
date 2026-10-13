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
    url: "https://recipe-db-assignment-kc38yg8h8-mat-4c83.vercel.app/dashboard",
    repositoryUrl: "https://github.com/Miirten/recipe-db-assignment.git",
    technologies: ["Next.js", "Auth.js", "PostgreSQL"],
  },
  {
    id: "data-analysis",
    title: "Data Analysis Project",
    description:
      "An exploratory data-analysis project using Python and Pandas to clean and summarize a dataset.",
    url: "https://colab.research.google.com/drive/11orHjzFJ227E5tjJWCD1yJeicPzAZkSZ",
    technologies: ["Python", "Pandas"],
  },
  {
    id: "react",
    title: "React Tutorial Lessons",
    description:
      "A list of my completed React tutorial lessons.",
    url: "https://react-lessons-lpif.vercel.app/",
    repositoryUrl: "https://github.com/Miirten/React-Lessons.git",
    technologies: ["React"],
  },
];