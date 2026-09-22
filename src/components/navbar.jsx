import React from "react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.getElementById(location.hash.slice(1));
    if (!section) return;

    const navbarHeight = 76;
    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top: sectionTop, behavior: "smooth" });
  }, [location.hash]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (section) =>
    section === "home"
      ? location.pathname === "/" && !location.hash
      : location.pathname === "/" && location.hash === `#${section}`;

  const linkClass = (active) =>
    `relative text-sm font-medium transition ${
      active
        ? "font-semibold text-[#2563EB] after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[#2563EB]"
        : "text-[#64748B] hover:text-[#2563EB]"
    }`;

  const mobileLinkClass = (active) =>
    `px-3 py-3 transition ${
      active
        ? "bg-blue-50 text-[#2563EB]"
        : "hover:bg-blue-50 hover:text-[#2563EB]"
    }`;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-xl font-bold text-white shadow-sm">
            ✦
          </div>

          <span className="font-serif text-2xl font-bold tracking-tight text-[#0F172A]">
            Pregna<span className="text-[#2563EB]">Care</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={() => linkClass(isActive("home"))}>
            Home
          </NavLink>

          <NavLink
            to="/#about"
            className={() => linkClass(isActive("about"))}
          >
            About
          </NavLink>

          <NavLink
            to="/#services"
            className={() => linkClass(isActive("services"))}
          >
            Services
          </NavLink>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            to="/patient/login"
            className="hidden px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-[#2563EB] sm:block"
          >
            Login
          </Link>

          <Link
            to="/patient/signup"
            className="rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-xl text-[#2563EB] transition hover:bg-blue-50 sm:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-semibold text-slate-700">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={() => mobileLinkClass(isActive("home"))}
            >
              Home
            </NavLink>

            <NavLink
              to="/#about"
              onClick={closeMenu}
              className={() => mobileLinkClass(isActive("about"))}
            >
              About
            </NavLink>

            <NavLink
              to="/#services"
              onClick={closeMenu}
              className={() => mobileLinkClass(isActive("services"))}
            >
              Services
            </NavLink>

            <div className="mt-2 flex gap-3 border-t border-slate-200 pt-3">
              <Link
                to="/patient/login"
                onClick={closeMenu}
                className="flex-1 rounded-lg px-4 py-2.5 text-center text-slate-700 transition hover:bg-blue-50 hover:text-[#2563EB]"
              >
                Login
              </Link>

              <Link
                to="/patient/signup"
                onClick={closeMenu}
                className="flex-1 rounded-lg bg-[#2563EB] px-4 py-2.5 text-center text-white transition hover:bg-[#1D4ED8]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
