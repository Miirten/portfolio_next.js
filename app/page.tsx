import Link from "next/link";
import Navbar from "@/components/navbar";
import ContactForm from "@/components/contact-form";
import ProjectCarousel from "@/components/project-carousel";



const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Miirten",
    description: "Explore my code and projects.",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mathew-mansfield-42a0b63aa/?isSelfProfile=true",
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
            Hello, I&apos;m Mathew Mansfield.
            <span className="mt-3 block text-slate-400">
              I am an aspiring software developer.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I enjoy learning how things work, how to apply my knowledge, and 
            solving problems.
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
                My name is Mathew Mansfield. I come from a background of hard work, from serving in 
                the United States Marine Corps as an Air Traffic Controller, to more recently working 
                as a CNC machinist. Hard work and attentiion to detail are important values to me
                that I always strive for. 

                I am now an aspiring software developer, and I am very excited to dive into the industry.
              </p>

              <p>
                I have studied several coding languages, including HTML, CSS, C#, SQL and Python, as 
                well as studying databases, data analytics, and libraries such as React and Pandas, 
                and finally the Next.js framework. 
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

            <ProjectCarousel />

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
        Have a question, a project idea, or an opportunity? Leave a message
        using the form.
      </p>
    </div>

    <ContactForm />
  </div>
</section>
      </main>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-400">
        Built with Next.js. Designed by Mathew Mansfield.
      </footer>
    </div>
  );
}