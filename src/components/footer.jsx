import React from "react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-[90%] max-w-6xl gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="/" className="text-2xl font-bold tracking-tight text-slate-900">
            Pregna<span className="text-blue-600">Care</span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            A simpler way for mothers, doctors, and care teams to stay connected throughout pregnancy.
          </p>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Care that stays with you
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-800">Explore</h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-600">
            <a href="#about" className="transition hover:text-blue-700">About PregnaCare</a>
            <a href="#services" className="transition hover:text-blue-700">Our services</a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-800">For your care team</h2>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-slate-600">
            <a href="#services" className="transition hover:text-blue-700">Patient support</a>
            <a href="#services" className="transition hover:text-blue-700">Doctor tools</a>
            <a href="#services" className="transition hover:text-blue-700">Care coordination</a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-[90%] max-w-6xl flex-col gap-2 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 PregnaCare. All rights reserved.</p>
          <p>Built for calmer, more connected pregnancy care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
