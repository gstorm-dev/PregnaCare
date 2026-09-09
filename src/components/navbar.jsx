import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-transparent shadow-sm">
      <div className="flex items-center justify-between px-4 py-1.5 h-15">

        {/* Logo */}
        <div className="flex items-center ">
          <img
            src="/images/PregnaCareLogo.png"
            alt="PregnaCare"
            className="w-24 h-15 object-cover"
          />

        </div>
        {/* Links */}
        <div className="flex items-center gap-4 text-xs">
          <a
            href="/"
            className="px-2 py-1 rounded-md border border-transparent transition-all duration-200 text-gray-600 font-medium hover:text-green-700 hover:border-green-300 hover:bg-green-50"
          >
            Home
          </a>

          <a
            href="/find-doctor"
            className="px-2 py-1 rounded-md border border-transparent transition-all duration-200 text-gray-600 font-medium hover:text-green-700 hover:border-green-300 hover:bg-green-50"
          >
            Find a Doctor
          </a>

          <a
            href="/appointments"
            className="px-2 py-1 rounded-md border border-transparent transition-all duration-200 text-gray-600 font-medium hover:text-green-700 hover:border-green-300 hover:bg-green-50"
          >
            Appointments
          </a>

          <a
            href="/my-doctor"
            className="px-2 py-1 rounded-md border border-transparent transition-all duration-200 text-gray-600 font-medium hover:text-green-700 hover:border-green-300 hover:bg-green-50"
          >
            My Doctor
          </a>
        </div>

        {/* Profile */}
        <a
          href="/profile"
          className="flex items-center gap-2"
        >
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-[10px]">

          </div>

          <span className="text-gray-700 font-medium text-xs">
          </span>
        </a>

      </div>
    </nav>
  );
};

export default Navbar;