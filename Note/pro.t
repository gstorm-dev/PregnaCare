src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── DoctorCard.jsx
│   ├── AppointmentCard.jsx
│   ├── PatientCard.jsx
│   ├── Notification.jsx
│   └── Modal.jsx
│
├── pages/
│
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── PatientRegister.jsx
│   │   └── DoctorRegister.jsx
│   │
│   ├── patient/
│   │   ├── PatientDashboard.jsx
│   │   ├── Doctors.jsx
│   │   ├── DoctorProfile.jsx
│   │   ├── BookAppointment.jsx
│   │   ├── Appointments.jsx
│   │   ├── MyDoctor.jsx
│   │   ├── MedicalTimeline.jsx
│   │   ├── Documents.jsx
│   │   ├── Notifications.jsx
│   │   └── Profile.jsx
│   │
│   ├── doctor/
│   │   ├── DoctorDashboard.jsx
│   │   ├── Patients.jsx
│   │   ├── PatientDetails.jsx
│   │   ├── Appointments.jsx
│   │   ├── Availability.jsx
│   │   ├── VisitNotes.jsx
│   │   ├── Notifications.jsx
│   │   └── Profile.jsx
│   │
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── DoctorVerification.jsx
│       ├── Doctors.jsx
│       ├── Patients.jsx
│       ├── Appointments.jsx
│       ├── Disputes.jsx
│       └── Reports.jsx
│
├── services/
│   ├── api.js
│   ├── auth.js
│   ├── doctors.js
│   ├── patients.js
│   ├── appointments.js
│   └── notifications.js
│
├── context/
│   └── AuthContext.jsx
│
├── utils/
│   ├── validation.js
│   └── pregnancy.js
│
├── App.jsx
├── main.jsx
└── index.css


┌─────────────────────────────────────────────┐
│ Good morning, Amara 👋                     │
│                                             │
│ Pregnancy: Week 24                          │
│ Due date: December 28                       │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Upcoming appointment                    │ │
│ │ Dr. Bello                              │ │
│ │ September 15 • 10:00 AM                │ │
│ │ [View Appointment]                     │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ My Doctor                                   │
│ Dr. Bello ✓ Verified                       │
│ [View Profile]                              │
│                                             │
│ [Book Appointment] [Medical Records]        │
└─────────────────────────────────────────────┘


Doctor Dashboard

Today's Appointments
─────────────────────
10:00  Amara
11:00  Sarah
12:30  Jane

Patients
─────────────────────
Due this week       8
Upcoming           24
Overdue             3

Quick Actions
[Availability]
[Patients]
[Appointments]



ADMIN DASHBOARD

Doctors
├── Verified
├── Pending verification
└── Rejected

Patients
└── Total patients

Appointments
├── Upcoming
├── Completed
├── Cancelled
└── No-show

Reports
└── Platform metrics

Disputes
└── Patient/Doctor reports


Do you already have a doctor?

       YES                    NO
        ↓                      ↓
Search doctor           Browse doctors
        ↓                      ↓
Select doctor           Filter doctors
        ↓                      ↓
Link request            View profile
        ↓                      ↓
Doctor accepts          Book appointment
        ↓
"My Doctor"



Components
Props
useState
useEffect
map()
Forms
Conditional rendering
React Router



Authentication
Role-based routing
API calls
Loading states
Error handling
Form validation
Search/filtering


React + Tailwind
       ↓
Node / Express
       ↓
Supabase / PostgreSQL

Doctor has:

10:00 AM ─ Available


10:00
├── Patient A ✅
└── Patient B ❌

PHASE 1
Project setup
       ↓
PHASE 2
Authentication
       ↓
PHASE 3
Patient onboarding
       ↓



       import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(
        location.hash.replace("#", "")
      );

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isHome = location.pathname === "/" && !location.hash;
  const isAbout = location.pathname === "/" && location.hash === "#about";
  const isServices = location.pathname === "/" && location.hash === "#services";
  const isContact = location.pathname === "/" && location.hash === "#contact";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
            +
          </div>

          <span className="text-2xl font-bold text-slate-800">
            Pregna<span className="text-blue-600">Care</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">

          <NavLink
            to="/"
            className={() =>
              `text-sm font-semibold ${
                isHome
                  ? "text-blue-600"
                  : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            Home
          </NavLink>

          <Link
            to="/#about"
            className={`text-sm font-semibold ${
              isAbout
                ? "text-blue-600"
                : "text-slate-600 hover:text-blue-600"
            }`}
          >
            About
          </Link>

          <Link
            to="/#services"
            className={`text-sm font-semibold ${
              isServices
                ? "text-blue-600"
                : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Services
          </Link>

          <Link
            to="/#contact"
            className={`text-sm font-semibold ${
              isContact
                ? "text-blue-600"
                : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Contact
          </Link>

        </div>

        <div className="hidden items-center gap-3 sm:flex">

          <Link
            to="/patient/login"
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/patient/signup"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Sign Up
          </Link>

        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-blue-100 px-3 py-2 text-xl text-blue-600 sm:hidden"
        >
          {menuOpen ? "×" : "☰"}
        </button>

      </div>

      {menuOpen && (
        <div className="border-t border-blue-100 bg-white px-6 py-4 sm:hidden">

          <div className="flex flex-col gap-1">

            <NavLink
              to="/"
              onClick={closeMenu}
              className={() =>
                `rounded-lg px-4 py-3 text-sm font-semibold ${
                  isHome
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-blue-50"
                }`
              }
            >
              Home
            </NavLink>

            <Link
              to="/#about"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                isAbout
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-blue-50"
              }`}
            >
              About
            </Link>

            <Link
              to="/#services"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                isServices
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-blue-50"
              }`}
            >
              Services
            </Link>

            <Link
              to="/#contact"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-semibold ${
                isContact
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-blue-50"
              }`}
            >
              Contact
            </Link>

            <div className="mt-2 flex gap-3 border-t border-slate-100 pt-4">

              <Link
                to="/patient/login"
                onClick={closeMenu}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
              >
                Login
              </Link>

              <Link
                to="/patient/signup"
                onClick={closeMenu}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
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