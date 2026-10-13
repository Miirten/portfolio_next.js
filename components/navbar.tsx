import Link from "next/link";
import AccountControls from "@/components/account-controls";
import NavbarWeather from "@/components/navbar-weather";

const navLinks = [
  { href: "/#bio", label: "Bio" },
  { href: "/#projects", label: "Projects" },
  { href: "/articles", label: "Articles" },
  { href: "/#socials", label: "Socials" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 sm:flex-row"
      >
        <Link
          href="/#home"
          className="rounded text-xl font-bold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          Your Name<span className="text-cyan-400">.</span>
        </Link>

        <ul className="flex flex-wrap justify-center gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
<div className="flex flex-col items-center gap-4 lg:flex-row">
  <NavbarWeather />
  <AccountControls />
</div>
      </nav>
    </header>
  );
}