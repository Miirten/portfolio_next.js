"use client";

import Link from "next/link";
import { useState } from "react";
import { projects } from "@/lib/projects";

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const project = projects[currentIndex];
  const totalProjects = projects.length;

  function showPreviousProject() {
    setCurrentIndex((current) =>
      current === 0 ? totalProjects - 1 : current - 1
    );
  }

  function showNextProject() {
    setCurrentIndex((current) =>
      current === totalProjects - 1 ? 0 : current + 1
    );
  }

  if (totalProjects === 0) {
    return (
      <p className="text-slate-400">
        Projects are coming soon.
      </p>
    );
  }

  return (
    <section
      aria-label="Hosted projects"
      className="mt-10"
    >
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={showPreviousProject}
          aria-label="Previous project"
          className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          <span aria-hidden="true">←</span>
          <span className="sr-only">Previous project</span>
        </button>

        <p
          aria-live="polite"
          aria-atomic="true"
          className="text-sm text-slate-400"
        >
          {currentIndex + 1} of {totalProjects}
        </p>

        <button
          type="button"
          onClick={showNextProject}
          aria-label="Next project"
          className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300 transition-colors hover:border-cyan-400 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          <span aria-hidden="true">→</span>
          <span className="sr-only">Next project</span>
        </button>
      </div>

      <article
        key={project.id}
        className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-8"
      >
        <h3 className="text-2xl font-bold">
          {project.title}
        </h3>

        <p className="mt-4 leading-7 text-slate-400">
          {project.description}
        </p>

        <ul
          aria-label="Technologies used"
          className="mt-6 flex flex-wrap gap-2"
        >
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded bg-slate-800 px-3 py-1 text-xs text-cyan-300"
            >
              {technology}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
          >
            View project
            <span className="sr-only"> (opens in a new tab)</span>
          </a>

          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-600 px-5 py-3 font-semibold transition-colors hover:border-cyan-400 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              View code
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </article>

      <ul
        aria-label="Select a project"
        className="mt-6 flex justify-center gap-2"
      >
        {projects.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show project ${index + 1}: ${item.title}`}
              aria-current={index === currentIndex}
              className={`h-3 w-3 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${
                index === currentIndex
                  ? "bg-cyan-400"
                  : "bg-slate-700 hover:bg-slate-500"
              }`}
            >
              <span className="sr-only">
                {item.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}