import Link from "next/link";
import Navbar from "@/components/navbar";

const projects = [
  {
    title: "Project One",
    description:
      "Describe what this application does, who it helps, and what you built.",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Project Two",
    description:
      "Describe an interesting feature or a problem you solved in this project.",
    technologies: ["ASP.NET Core", "C#", "PostgreSQL"],
  },
  {
    title: "Project Three",
    description:
      "Explain the purpose of this project and what you learned while building it.",
    technologies: ["Python", "Pandas", "Testing"],
  },
];

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/YOUR_USERNAME",
    description: "Explore my code and projects.",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/YOUR_USERNAME",
    description: "Connect with me professionally.",
  },
];

const inputClasses =
  "mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main id="home">
        {/* Hero */}
        <section className="mx-auto flex min-h-[75vh] max-w-6xl flex-col justify-center px-6 py-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Software developer
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
            Hi, I&apos;m Mathew Mansfield.
            <span className="mt-3 block text-slate-400">
              I build useful software.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I enjoy turning ideas into practical applications, learning new
            technologies, and solving problems through code.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/#projects"
              className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              View my projects
            </Link>

            <Link
              href="/#contact"
              className="rounded-lg border border-slate-600 px-6 py-3 font-semibold transition-colors hover:border-cyan-400 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              Contact me
            </Link>
          </div>
        </section>

        {/* Bio */}
        <section
          id="bio"
          aria-labelledby="bio-heading"
          className="portfolio-section border-t border-slate-800"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                A little about me
              </p>
              <h2
                id="bio-heading"
                className="mt-3 text-3xl font-bold sm:text-4xl"
              >
                My bio
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-slate-300">
              <p>
                Write a short introduction about yourself here. Explain what
                interests you about software development and the kinds of
                applications you enjoy building.
              </p>

              <p>
                Add a little about your experience, what you are currently
                learning, and the opportunities you are looking for.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["React", "Next.js", "C#", "SQL", "Python"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-slate-700 px-4 py-1 text-sm text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="portfolio-section border-t border-slate-800 bg-slate-900/40"
        >
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Selected work
            </p>

            <h2
              id="projects-heading"
              className="mt-3 text-3xl font-bold sm:text-4xl"
            >
              My projects
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
                >
                  <h3 className="text-xl font-semibold">{project.title}</h3>

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
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Socials */}
        <section
          id="socials"
          aria-labelledby="socials-heading"
          className="portfolio-section border-t border-slate-800"
        >
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Find me online
            </p>

            <h2
              id="socials-heading"
              className="mt-3 text-3xl font-bold sm:text-4xl"
            >
              Let&apos;s connect
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-800 p-6 transition-colors hover:border-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
                >
                  <h3 className="text-xl font-semibold">
                    {social.name}
                    <span aria-hidden="true" className="ml-2 text-cyan-400">
                      ↗
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </h3>
                  <p className="mt-2 text-slate-400">{social.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="portfolio-section border-t border-slate-800 bg-slate-900/40"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Get in touch
              </p>

              <h2
                id="contact-heading"
                className="mt-3 text-3xl font-bold sm:text-4xl"
              >
                Contact me
              </h2>

              <p className="mt-5 max-w-md leading-7 text-slate-400">
                Have a question, a project idea, or an opportunity? Leave a
                message using the form.
              </p>
            </div>

            <form
              aria-labelledby="contact-heading"
              aria-describedby="contact-note"
              className="space-y-5"
            >
              <fieldset disabled className="space-y-5">
                <legend className="sr-only">Contact details</legend>

                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Your name"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me what you have in mind..."
                    className={`${inputClasses} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-not-allowed rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 opacity-50"
                >
                  Send message
                </button>
              </fieldset>

              <p id="contact-note" className="text-sm text-slate-400">
                This form is a UI preview. Message submission is not connected
                yet.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-400">
        Built with Next.js. Designed by Your Name.
      </footer>
    </div>
  );
}