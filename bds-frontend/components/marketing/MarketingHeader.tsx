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
      src="/images/TBDS GRAPHIC.jpg"
      alt="Boston Drone School"
      width={176}
      height={123}
      sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 176px"
      priority
      quality={90}
      className="h-auto w-28 object-contain transition group-hover:opacity-90 sm:w-32 md:w-40 lg:w-44"
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
      <div className="mx-auto flex h-16 sm:h-20 md:h-24 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {brandBlock}

        <nav className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.22em] text-gray-600 lg:flex">
          {navLinks.map((link) => {
            const active = isCurrent(pathname, link.href);
            if (link.emphasis === "primary") {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border-2 border-gray-900 bg-white px-6 py-2.5 text-xs font-bold tracking-wider text-gray-900 transition hover:bg-gray-900 hover:text-white"
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
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-900 text-gray-900 lg:hidden active:bg-gray-100 touch-manipulation"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <ToggleIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-black/10 bg-white lg:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 text-base uppercase tracking-wider text-gray-700">
            {navLinks.map((link) => {
              const active = isCurrent(pathname, link.href);
              if (link.emphasis === "primary") {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-gray-900 bg-white px-6 py-3 text-sm font-semibold tracking-wider text-gray-900 transition active:bg-gray-900 active:text-white touch-manipulation"
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
                  className={`block min-h-[48px] py-3 px-2 text-base transition-colors active:text-gray-900 touch-manipulation ${active ? "text-gray-900 font-semibold" : ""}`}
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
