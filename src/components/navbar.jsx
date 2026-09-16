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
    `relative text-sm font-medium transition ${
      active
        ? "font-semibold text-[#b66d58] after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-[#d98268]"
        : "text-[#69736f] hover:text-[#c87861]"
    }`;

  const mobileLinkClass = (active) =>
    `px-3 py-3 transition ${
      active ? "bg-[#fff0ea] text-[#b66d58]" : "hover:bg-[#fff0ea] hover:text-[#b66d58]"
    }`;

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-[#eadfd9] bg-[#fffdfb]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d98268] text-xl font-bold text-white shadow-sm">
            ✦
          </div>

          <span className="font-serif text-2xl font-bold tracking-tight text-[#26322e]">
            Pregna<span className="text-[#c87861]">Care</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/#about" className={() => linkClass(isActive("about"))}>
            About
          </NavLink>

          <NavLink to="/#services" className={() => linkClass(isActive("services"))}>
            Services
          </NavLink>

        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            to="/patient/login"
            className="hidden px-4 py-2 text-sm font-semibold text-[#3b4944] transition hover:text-[#c87861] sm:block"
          >
            Login
          </Link>

          <Link
            to="/patient/signup"
            className="rounded-lg bg-[#d98268] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c66f57]"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#eadfd9] text-xl text-[#c87861] transition hover:bg-[#fff0ea] sm:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#eadfd9] bg-[#fffdfb] px-6 py-4 sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm font-semibold text-[#3b4944]">
            <NavLink to="/#about" onClick={closeMenu} className={() => mobileLinkClass(isActive("about"))}>About</NavLink>
            <NavLink to="/#services" onClick={closeMenu} className={() => mobileLinkClass(isActive("services"))}>Services</NavLink>
            <div className="mt-2 flex gap-3 border-t border-[#eadfd9] pt-3">
              <Link to="/patient/login" onClick={closeMenu} className="flex-1 rounded-lg px-4 py-2.5 text-center text-[#3b4944] transition hover:bg-[#fff0ea] hover:text-[#b66d58]">Login</Link>
              <Link to="/patient/signup" onClick={closeMenu} className="flex-1 rounded-lg bg-[#d98268] px-4 py-2.5 text-center text-white transition hover:bg-[#c66f57]">Sign Up</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;