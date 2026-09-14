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
    const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: sectionTop, behavior: "smooth" });
  }, [location.hash]);

  const closeMenu = () => setMenuOpen(false);
  const isActive = (section) =>
    section === "home"
      ? location.pathname === "/" && !location.hash
      : location.pathname === "/" && location.hash === `#${section}`;

  const linkClass = (active) =>
    `text-sm font-medium transition ${
      active ? "font-semibold text-blue-600" : "text-gray-600 hover:text-blue-600"
    }`;

  const mobileLinkClass = (active) =>
    `rounded-lg px-3 py-3 transition ${
      active ? "bg-blue-50 text-blue-700" : "hover:bg-blue-50 hover:text-blue-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-sm">
            ✦
          </div>

          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Pregna<span className="text-blue-600">Care</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={() => linkClass(isActive("home"))}>
            Home
          </NavLink>

          <NavLink to="/#about" className={() => linkClass(isActive("about"))}>
            About
          </NavLink>

          <NavLink to="/#services" className={() => linkClass(isActive("services"))}>
            Services
          </NavLink>

          <NavLink to="/#contact" className={() => linkClass(isActive("contact"))}>
            Contact
          </NavLink>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            to="/patient/login"
            className="hidden px-4 py-2 text-sm font-semibold text-gray-700 transition hover:text-blue-600 sm:block"
          >
            Login
          </Link>

          <Link
            to="/patient/signup"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 text-xl text-blue-700 transition hover:bg-blue-50 sm:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-blue-100 bg-white px-6 py-4 sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-semibold text-slate-700">
            <NavLink to="/" end onClick={closeMenu} className={() => mobileLinkClass(isActive("home"))}>Home</NavLink>
            <NavLink to="/#about" onClick={closeMenu} className={() => mobileLinkClass(isActive("about"))}>About</NavLink>
            <NavLink to="/#services" onClick={closeMenu} className={() => mobileLinkClass(isActive("services"))}>Services</NavLink>
            <NavLink to="/#contact" onClick={closeMenu} className={() => mobileLinkClass(isActive("contact"))}>Contact</NavLink>
            <div className="mt-2 flex gap-3 border-t border-slate-100 pt-3">
              <Link to="/patient/login" onClick={closeMenu} className="flex-1 rounded-lg px-4 py-2.5 text-center text-slate-700 hover:bg-slate-50">Login</Link>
              <Link to="/patient/signup" onClick={closeMenu} className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-white hover:bg-blue-700">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;