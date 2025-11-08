"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
  isExternal?: boolean;
  emphasis?: "primary";
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Procurement", href: "/procurement" },
  { label: "Advocacy", href: "/drone-advocacy-group" },
  { label: "Services", href: "/services" },
  { label: "Mission", href: "/mission" },
  { label: "Engagements", href: "/engagements" },
  { label: "Inquiry", href: "/inquiry" },
  { label: "Exam", href: "/exam" },
  { label: "Portal", href: "/portal", emphasis: "primary" },
];

const brandBlock = (
  <Link href="/" className="group flex items-center gap-3 text-left">
    <Image
      src="/images/boston-drone-school-logo.svg"
      alt="Boston Drone School"
      width={600}
      height={280}
      sizes="140px"
      priority
      className="h-auto w-28 object-contain transition group-hover:opacity-90 sm:w-32"
    />
  </Link>
);

const ToggleIcon = ({ open }: { open: boolean }) => (
  <span className="flex flex-col items-center justify-center gap-[6px]">
    <span
      className={`block h-[2px] w-6 bg-gray-900 transition-transform duration-200 ${
        open ? "translate-y-[7px] rotate-45" : ""
      }`}
    />
    <span
      className={`block h-[2px] w-6 bg-gray-900 transition-opacity duration-150 ${open ? "opacity-0" : "opacity-100"}`}
    />
    <span
      className={`block h-[2px] w-6 bg-gray-900 transition-transform duration-200 ${
        open ? "-translate-y-[7px] -rotate-45" : ""
      }`}
    />
  </span>
);

const isCurrent = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export function MarketingHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-premium sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        {brandBlock}

        <nav className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.22em] text-gray-600 lg:flex">
          {navLinks.map((link) => {
            const active = isCurrent(pathname, link.href);
            if (link.emphasis === "primary") {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-gray-900 px-6 py-2 text-[0.62rem] font-semibold tracking-[0.32em] text-gray-900 transition hover:bg-gray-900 hover:text-white"
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item transition-colors hover:text-gray-900 ${active ? "text-gray-900" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-900 text-gray-900 lg:hidden"
          aria-label="Toggle navigation"
        >
          <ToggleIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-black/10 bg-white lg:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-sm uppercase tracking-[0.2em] text-gray-700">
            {navLinks.map((link) => {
              const active = isCurrent(pathname, link.href);
              if (link.emphasis === "primary") {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center justify-center rounded-full border border-gray-900 px-6 py-2 text-[0.68rem] font-semibold tracking-[0.32em] text-gray-900 transition hover:bg-gray-900 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-1 transition-colors hover:text-gray-900 ${active ? "text-gray-900" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export default MarketingHeader;
