import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Stethoscope,
  Search,
  Save,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  createAppointment,
  getConsultationRoomName,
  getAppointments,
  getUserNotifications,
  removeAppointment,
} from "../../Services/appointments";
import { getAvailableDoctors } from "../../Services/doctor";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
  { label: "Appointments", icon: CalendarDays, view: "appointments" },
  { label: "My Doctor", icon: Stethoscope, view: "doctors" },
  { label: "Pregnancy Journey", icon: HeartPulse, view: "timeline" },
];

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [doctorQuery, setDoctorQuery] = useState("");
  const [appointmentSent, setAppointmentSent] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [appointmentNotifications, setAppointmentNotifications] = useState([]);
  const [dismissedNotificationIds, setDismissedNotificationIds] = useState(
    new Set(),
  );
  const savedUser = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("loggedInUser") || "null");
    } catch {
      return null;
    }
  }, []);

  const displayName = savedUser?.name || "Jane Doe";
  const firstName = displayName.split(" ")[0];
  const avatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(savedUser?.email || displayName)}`;
  const dueDate = savedUser?.dueDate || "Not provided";
  const pregnancyWeek = savedUser?.pregnancyWeek
    ? `Week ${savedUser.pregnancyWeek}`
    : "Not provided";
  const bloodType = savedUser?.bloodType || "Not provided";
  const patientAppointments = getAppointments().filter(
    (appointment) => appointment.patientEmail === savedUser?.email,
  );
  const assignedAppointment =
    patientAppointments.find((appointment) => appointment.status === "Accepted") ||
    patientAppointments.find((appointment) => appointment.status === "Pending");
  const currentDoctor = assignedAppointment?.doctorName || "Not assigned";

  useEffect(() => {
    const syncNotifications = () => {
      const patient = JSON.parse(
        sessionStorage.getItem("loggedInUser") || "null",
      );
      const notifications = getUserNotifications(patient, "patient").filter(
        (notification) => !dismissedNotificationIds.has(notification.id),
      );
      setAppointmentNotifications(notifications);
    };

    syncNotifications();
    const timer = window.setInterval(syncNotifications, 1_000);
    window.addEventListener("pregnacare:appointments-updated", syncNotifications);
    window.addEventListener("storage", syncNotifications);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener(
        "pregnacare:appointments-updated",
        syncNotifications,
      );
      window.removeEventListener("storage", syncNotifications);
    };
  }, [dismissedNotificationIds]);

  const clearAllNotifications = () => {
    setDismissedNotificationIds(
      (current) =>
        new Set([
          ...current,
          ...appointmentNotifications.map((notification) => notification.id),
        ]),
    );
    setAppointmentNotifications([]);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="patient-dashboard min-h-screen bg-[#f8f6f3] text-[#26322e]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[#e9e2dc] bg-[#fffdfb] px-5 py-6 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-3">
          <Link
            to="/patient"
            className="flex items-center gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d98268] text-xl font-bold text-white">
              ✦
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight">
              Pregna<span className="text-[#c87861]">Care</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-[#69736f] hover:bg-[#fff0ea] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-10 rounded-2xl bg-[#fff3ef] p-4">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#c87861]">
            Welcome back
          </p>
          <p className="mt-2 truncate font-serif text-2xl">{firstName}!</p>
          <div className="mt-4 flex items-center gap-3">
            <img
              src={avatarUrl}
              alt={`${displayName} profile`}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="text-xs text-[#69736f]">Patient</p>
            </div>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map(({ label, icon: Icon, view }, index) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setActiveView(view);
                setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${activeView === view ? "bg-[#d98268] text-white shadow-[0_8px_18px_rgba(217,130,104,.22)]" : "text-[#69736f] hover:bg-[#fff0ea] hover:text-[#b66d58]"}`}
            >
              <Icon size={19} strokeWidth={index === 0 ? 2.3 : 1.8} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#eee6e0] pt-5">
          <Link
            to="/patient/profile"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#69736f] hover:bg-[#fff0ea] hover:text-[#b66d58]"
          >
            <CircleHelp size={19} />
            Help Center
          </Link>
          <button
            type="button"
            onClick={() => {
              setActiveView("settings");
              setSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${activeView === "settings" ? "bg-[#fff0ea] text-[#b66d58]" : "text-[#69736f] hover:bg-[#fff0ea] hover:text-[#b66d58]"}`}
          >
            <Settings size={19} />
            Settings
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#b66d58] hover:bg-[#fff0ea]"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-[#26322e]/30 lg:hidden"
        />
      )}

      <main className="min-h-screen lg:ml-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[#e9e2dc] bg-[#f8f6f3]/95 px-5 backdrop-blur sm:px-8 lg:px-10">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl border border-[#e9e2dc] bg-white p-2.5 text-[#c87861] lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
              Patient workspace
            </p>
            <h1 className="mt-1 font-serif text-2xl">
              Hello!! {firstName} <span aria-hidden="true"></span>
            </h1>
          </div>
          <div className="relative ml-auto flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setNotificationsOpen((open) => !open)}
              className="relative rounded-xl border border-[#e9e2dc] bg-white p-2.5 text-[#69736f] transition hover:border-[#e7b4a3] hover:text-[#c87861]"
            >
              <Bell size={19} />
              {appointmentNotifications.length > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#d98268]" />
              )}
            </button>
            <button
              type="button"
              aria-label="Open profile"
              onClick={() => setActiveView("profile")}
              className="h-10 w-10 overflow-hidden rounded-full"
            >
              <img src={avatarUrl} alt={`${displayName} profile`} className="h-full w-full object-cover" />
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-14 w-80 rounded-2xl border border-[#eadfd9] bg-white p-4 text-sm shadow-xl">
                {appointmentNotifications.length === 0 ? (
                  <p className="font-semibold">You are all caught up.</p>
                ) : (
                  <>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-semibold">Notifications</p>
                      <button
                        type="button"
                        onClick={clearAllNotifications}
                        className="cursor-pointer text-xs font-semibold text-[#c87861] hover:text-[#b66d58]"
                      >
                        Clear all
                      </button>
                    </div>
                    {appointmentNotifications.map((notification) => (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          navigate(
                            `/consultation/${getConsultationRoomName(notification.appointment)}?appointment=${encodeURIComponent(notification.appointment.id)}`,
                          )
                        }
                        className="mb-2 w-full rounded-xl bg-[#fff8f4] p-3 text-left last:mb-0 hover:bg-[#fff0ea]"
                      >
                        <p className="font-semibold">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-[#69736f]">{notification.text}</p>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mb-8 sm:hidden">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
              Patient workspace
            </p>
            <h1 className="mt-1 font-serif text-2xl">
              Good morning, {firstName} <span aria-hidden="true">👋</span>
            </h1>
          </div>

          {activeView === "dashboard" && (
            <>
              <section className="grid gap-5 md:grid-cols-2">
                <DashboardCard
                  avatar={avatarUrl}
                  title="My Profile"
                  accent="peach"
                >
                  <InfoRow label="Name" value={displayName} />
                  <InfoRow label="Due Date" value={dueDate} />
                  <InfoRow label="Doctor" value={currentDoctor} />
                  <InfoRow label="Pregnancy Week" value={pregnancyWeek} />
                  <InfoRow label="Blood Type" value={bloodType} />
                </DashboardCard>
                <DashboardCard
                  icon={FileText}
                  title="My Documents"
                  accent="sage"
                >
                  <InfoRow label="Medical Records" value="4 files" />
                  <InfoRow label="Scan Results" value="2 files" />
                  <InfoRow label="Prescriptions" value="3 files" />
                  <InfoRow label="Other Documents" value="1 file" />
                </DashboardCard>
                <DashboardCard
                  icon={CalendarDays}
                  title="Appointments"
                  accent="cream"
                >
                  <p className="rounded-xl bg-[#fff8f4] p-4 text-sm text-[#69736f]">
                    No appointment requests yet.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveView("appointments")}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c87861]"
                  >
                    View appointments <ChevronRight size={16} />
                  </button>
                </DashboardCard>
                <DashboardCard
                  icon={HeartPulse}
                  title="Pregnancy Timeline"
                  accent="rose"
                >
                  <div id="timeline" className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-8 border-[#f4d8cd] text-sm font-bold text-[#b66d58]">
                      22w
                    </div>
                    <div>
                      <p className="font-semibold">
                        You are in your second trimester
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#69736f]">
                        Your baby is growing steadily. Keep taking care of
                        yourself.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#f0e3dd]">
                    <div className="h-full w-[55%] rounded-full bg-[#d98268]" />
                  </div>
                </DashboardCard>
              </section>

              <section className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
                <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
                        Your next step
                      </p>
                      <h2 className="mt-2 font-serif text-2xl">
                        Prepare for your next visit
                      </h2>
                    </div>
                    <CalendarDays className="text-[#c87861]" />
                  </div>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-[#69736f]">
                    Bring your questions and recent health notes to your
                    upcoming appointment. Your care team is here to help.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveView("appointments")}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c66f57]"
                  >
                    Open appointments <ChevronRight size={17} />
                  </button>
                </div>
                <div className="rounded-2xl bg-[#26322e] p-6 text-white">
                  <HeartPulse size={25} className="text-[#f2c8b8]" />
                  <h2 className="mt-7 font-serif text-2xl">
                    A little reminder
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Rest, hydrate, and make room for moments that make you feel
                    good today.
                  </p>
                </div>
              </section>
            </>
          )}

          {activeView !== "dashboard" && (
            <WorkspaceView
              view={activeView}
              setActiveView={setActiveView}
              selectedDoctor={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
              doctorQuery={doctorQuery}
              setDoctorQuery={setDoctorQuery}
              appointmentSent={appointmentSent}
              setAppointmentSent={setAppointmentSent}
              profileSaved={profileSaved}
              setProfileSaved={setProfileSaved}
              displayName={displayName}
            />
          )}
        </div>
      </main>
    </div>
  );
};

const WorkspaceView = ({
  view,
  setActiveView,
  selectedDoctor,
  setSelectedDoctor,
  doctorQuery,
  setDoctorQuery,
  appointmentSent,
  setAppointmentSent,
  profileSaved,
  setProfileSaved,
  displayName,
}) => {
  const doctors = getAvailableDoctors();
  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialty} ${doctor.location}`
      .toLowerCase()
      .includes(doctorQuery.toLowerCase()),
  );

  if (view === "doctors") {
    return (
      <section>
        <WorkspaceHeading
          eyebrow="My doctor"
          title="Find your care team"
          text="Search trusted pregnancy specialists without leaving your dashboard."
        />
        <div className="rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-[#9aa09c]"
            />
            <input
              value={doctorQuery}
              onChange={(event) => setDoctorQuery(event.target.value)}
              placeholder="Search doctors, specialties, or clinics"
              className="w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#d98268]"
            />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {filteredDoctors.map((doctor) => (
              <article
                key={doctor.name}
                className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#eadfd9] bg-[#fffdfb] shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:flex-row"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-40 w-full object-cover object-top sm:h-auto sm:w-28"
                />
                <div className="flex min-w-0 flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-serif text-lg">
                        {doctor.name}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-[#c87861]">
                        {doctor.specialty}
                      </p>
                      <p className="mt-2 truncate text-xs text-[#69736f]">
                        {doctor.location}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#fff0ea] px-2 py-1 text-[11px] font-bold text-[#b66d58]">
                      ★ {doctor.rating}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setAppointmentSent(false);
                      setActiveView("appointments");
                    }}
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#d98268] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#c66f57] sm:mt-auto"
                  >
                    Choose doctor
                  </button>
                </div>
              </article>
            ))}
            {filteredDoctors.length === 0 && (
              <p className="col-span-full py-6 text-center text-sm text-[#69736f]">
                No matching doctors found.
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (view === "appointments") {
    return (
      <AppointmentWorkspace
        selectedDoctor={selectedDoctor}
        appointmentSent={appointmentSent}
        setAppointmentSent={setAppointmentSent}
      />
    );
  }

  if (view === "appointments") {
    return (
      <section>
        <WorkspaceHeading
          eyebrow="Care calendar"
          title="Book an appointment"
          text="Choose a convenient time with your selected care provider."
        />
        {selectedDoctor && (
          <div className="mb-5 flex max-w-2xl items-center gap-4 rounded-2xl border border-[#eadfd9] bg-white p-4 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
            <img
              src={selectedDoctor.image}
              alt={selectedDoctor.name}
              className="h-20 w-20 rounded-xl object-cover object-top"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#c87861]">
                Selected doctor
              </p>
              <h2 className="mt-1 font-serif text-xl">{selectedDoctor.name}</h2>
              <p className="text-sm text-[#69736f]">
                {selectedDoctor.specialty} · {selectedDoctor.location}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#b38336]">
                ★ {selectedDoctor.rating} patient rating
              </p>
            </div>
          </div>
        )}
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
              Upcoming
            </p>
            <h2 className="mt-2 font-serif text-2xl">Prenatal check-up</h2>
            <p className="mt-4 text-sm text-[#69736f]">
              Thursday, September 24 · 10:30 AM
            </p>
            <p className="mt-2 text-sm text-[#69736f]">
              With Dr. Sarah Johnson at Lagos Women's Centre
            </p>
            <span className="mt-5 inline-flex rounded-full bg-[#edf3ef] px-3 py-1 text-xs font-semibold text-[#6f9387]">
              Confirmed
            </span>
          </div>
          <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
            <h2 className="font-serif text-2xl">Request a visit</h2>
            {appointmentSent ? (
              <div className="mt-6 rounded-xl bg-[#edf3ef] p-5 text-center">
                <p className="font-semibold">Request sent successfully.</p>
                <p className="mt-1 text-sm text-[#69736f]">
                  Your care team will confirm the time shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setAppointmentSent(true);
                }}
                className="mt-5 space-y-4"
              >
                <select
                  defaultValue={selectedDoctor?.name || "Dr. Sarah Johnson"}
                  className="w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 text-sm"
                >
                  <option>Dr. Sarah Johnson</option>
                  <option>Dr. Emily Williams</option>
                  <option>Dr. Amina Bello</option>
                </select>
                <input
                  type="date"
                  className="w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 text-sm"
                />
                <select className="w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 text-sm">
                  <option>10:30 AM</option>
                  <option>2:00 PM</option>
                  <option>4:30 PM</option>
                </select>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c66f57]"
                >
                  Request appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (view === "timeline") {
    return (
      <section>
        <WorkspaceHeading
          eyebrow="Pregnancy journey"
          title="Your timeline"
          text="A simple view of your pregnancy milestones and next steps."
        />
        <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-10 border-[#f4d8cd] font-serif text-2xl text-[#b66d58]">
              22w
            </div>
            <div>
              <h2 className="font-serif text-2xl">Second trimester</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#69736f]">
                Your baby is growing steadily. Keep your appointments, rest when
                you need to, and bring questions to your next check-up.
              </p>
            </div>
          </div>
          <div className="mt-8 h-3 overflow-hidden rounded-full bg-[#f0e3dd]">
            <div className="h-full w-[55%] rounded-full bg-[#d98268]" />
          </div>
          <div className="mt-4 flex justify-between text-xs text-[#69736f]">
            <span>Week 1</span>
            <span>Week 40</span>
          </div>
        </div>
      </section>
    );
  }

  if (view === "settings")
    return (
      <section>
        <WorkspaceHeading
          eyebrow="Workspace settings"
          title="Settings"
          text="Manage your dashboard preferences and notifications."
        />
        <div className="max-w-3xl rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)] sm:p-8">
          <div className="divide-y divide-[#f0e8e3]">
            <SettingRow
              title="Appointment reminders"
              text="Receive reminders before upcoming visits."
            />
            <SettingRow
              title="Pregnancy updates"
              text="Get helpful weekly updates for your current stage."
            />
            <SettingRow
              title="Email notifications"
              text="Receive important care messages by email."
            />
          </div>
          <button
            type="button"
            onClick={() => setProfileSaved(true)}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c66f57]"
          >
            <Save size={17} />
            {profileSaved ? "Settings saved" : "Save settings"}
          </button>
        </div>
      </section>
    );

  return (
    <section>
      <WorkspaceHeading
        eyebrow="Your information"
        title="My profile"
        text="Keep your patient information current."
      />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setProfileSaved(true);
          window.setTimeout(() => setProfileSaved(false), 2200);
        }}
        className="max-w-3xl rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)] sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Full name
            <input
              defaultValue={displayName}
              className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
            />
          </label>
          <label className="text-sm font-semibold">
            Email address
            <input
              defaultValue="jane@example.com"
              type="email"
              className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
            />
          </label>
          <label className="text-sm font-semibold">
            Phone number
            <input
              defaultValue="+234 801 234 5678"
              className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
            />
          </label>
          <label className="text-sm font-semibold">
            Due date
            <input
              defaultValue="2026-10-24"
              type="date"
              className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c66f57]"
        >
          <Save size={17} />
          {profileSaved ? "Saved" : "Save changes"}
        </button>
      </form>
    </section>
  );
};

const AppointmentWorkspace = ({
  selectedDoctor,
  appointmentSent,
  setAppointmentSent,
}) => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("2026-09-24");
  const [time, setTime] = useState("10:30 AM");
  const [doctorOptions, setDoctorOptions] = useState(getAvailableDoctors());
  const [doctor, setDoctor] = useState(
    selectedDoctor?.name || getAvailableDoctors()[0]?.name || "Dr. Sarah Johnson",
  );

  useEffect(() => {
    const syncAppointments = () => {
      const patient = JSON.parse(
        sessionStorage.getItem("loggedInUser") || "null",
      );
      setAppointments(
        getAppointments().filter(
          (appointment) => appointment.patientEmail === patient?.email,
        ),
      );
    };
    syncAppointments();
    const timer = window.setInterval(syncAppointments, 1_000);
    window.addEventListener(
      "pregnacare:appointments-updated",
      syncAppointments,
    );
    window.addEventListener("storage", syncAppointments);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener(
        "pregnacare:appointments-updated",
        syncAppointments,
      );
      window.removeEventListener("storage", syncAppointments);
    };
  }, []);

  useEffect(() => {
    const availableDoctors = getAvailableDoctors();

    setDoctorOptions((current) => {
      const sameList =
        current.length === availableDoctors.length &&
        current.every(
          (item, index) =>
            item.name === availableDoctors[index]?.name &&
            item.email === availableDoctors[index]?.email,
        );
      return sameList ? current : availableDoctors;
    });

    if (selectedDoctor?.name) {
      setDoctor(selectedDoctor.name);
      return;
    }

    setDoctor((current) => {
      if (availableDoctors.some((item) => item.name === current)) {
        return current;
      }
      return availableDoctors[0]?.name || "";
    });
  }, [selectedDoctor]);

  const handleBooking = (event) => {
    event.preventDefault();
    const patient = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");
    const selectedDoctorInfo = doctorOptions.find((item) => item.name === doctor);

    if (!selectedDoctorInfo?.email) {
      return;
    }

    createAppointment({
      patientName: patient?.name || "Jane Doe",
      patientEmail: patient?.email || "",
      patientDueDate: patient?.dueDate || "Not provided",
      patientPregnancyWeek: patient?.pregnancyWeek || "Not provided",
      patientBloodType: patient?.bloodType || "Not provided",
      patientMedicalHistory: patient?.medicalHistory || "Not provided",
      patientEmergencyContact: patient?.emergencyContact || "Not provided",
      doctorName: selectedDoctorInfo?.name || doctor,
      doctorEmail: selectedDoctorInfo?.email || "",
      doctorPhone:
        selectedDoctorInfo?.phone || selectedDoctorInfo?.contactInfo || "",
      doctorClinic: selectedDoctorInfo?.clinic || selectedDoctorInfo?.location || "",
      doctorSpecialty: selectedDoctorInfo?.specialty || "",
      reason: "Prenatal check-up",
      date: `${date} · ${time}`,
      scheduledAt: `${date}T${time === "10:30 AM" ? "10:30" : time === "2:00 PM" ? "14:00" : "16:30"}:00`,
      requestedAt: new Date().toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      }),
      status: "Pending",
    });
    setAppointmentSent(true);
  };

  return (
    <section>
      <WorkspaceHeading
        eyebrow="Care calendar"
        title="Book an appointment"
        text="Request a visit and manage your existing appointments at any time."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
            Your appointments
          </p>
          {appointments.length === 0 ? (
            <p className="mt-5 text-sm text-[#69736f]">
              No appointment requests yet.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-xl bg-[#fff8f4] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{appointment.reason}</p>
                      <p className="mt-1 text-sm text-[#69736f]">
                        {appointment.doctorName} · {appointment.date}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#fff0ea] px-2 py-1 text-xs font-semibold text-[#b66d58]">
                      {appointment.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAppointment(appointment.id)}
                    className="mt-3 inline-flex items-center rounded-xl bg-[#fff0ea] px-4 py-2 text-sm font-semibold text-[#b66d58] transition hover:bg-[#f9ddd3]"
                  >
                    Cancel appointment
                  </button>
                  {appointment.status === "Accepted" && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/consultation/${getConsultationRoomName(appointment)}?appointment=${encodeURIComponent(appointment.id)}`,
                        )
                      }
                      className="mt-3 ml-2 inline-flex items-center rounded-xl bg-[#26322e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3b4944]"
                    >
                      Open care chat
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <h2 className="font-serif text-2xl">Request a visit</h2>
          {doctorOptions.length === 0 ? (
            <p className="mt-6 rounded-xl bg-[#fff8f4] p-5 text-sm text-[#69736f]">
              No doctors are available yet. A doctor must sign in before you can request an appointment.
            </p>
          ) : appointmentSent ? (
            <div className="mt-6 rounded-xl bg-[#edf3ef] p-5 text-center">
              <p className="font-semibold">Request sent successfully.</p>
              <button
                type="button"
                onClick={() => setAppointmentSent(false)}
                className="mt-4 text-sm font-semibold text-[#c87861]"
              >
                Book another visit
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="mt-5 space-y-4">
              <label className="block text-sm font-semibold">
                Doctor
                <select
                  value={doctor}
                  onChange={(event) => setDoctor(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal"
                >
                  {doctorOptions.map((doctorProfile) => (
                    <option key={doctorProfile.email || doctorProfile.id} value={doctorProfile.name}>
                      {doctorProfile.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold">
                  Date
                  <input
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal"
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Time
                  <select
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal"
                  >
                    <option>10:30 AM</option>
                    <option>2:00 PM</option>
                    <option>4:30 PM</option>
                  </select>
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-[#d98268] px-5 py-3 font-semibold text-white"
              >
                Request appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const SettingRow = ({ title, text }) => (
  <label className="flex cursor-pointer items-center justify-between gap-5 py-5">
    <span>
      <span className="block font-semibold">{title}</span>
      <span className="mt-1 block text-sm leading-6 text-[#69736f]">
        {text}
      </span>
    </span>
    <input
      type="checkbox"
      defaultChecked
      className="h-5 w-5 accent-[#d98268]"
    />
  </label>
);

const WorkspaceHeading = ({ eyebrow, title, text }) => (
  <div className="mb-7">
    <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
      {eyebrow}
    </p>
    <h2 className="mt-2 font-serif text-4xl">{title}</h2>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#69736f]">{text}</p>
  </div>
);

const DashboardCard = ({ icon: Icon, avatar, title, accent, children }) => {
  const accents = {
    peach: "bg-[#fff0ea] text-[#c87861]",
    sage: "bg-[#edf3ef] text-[#6f9387]",
    cream: "bg-[#fff8e9] text-[#ba8c49]",
    rose: "bg-[#f8e7e1] text-[#c87861]",
  };
  return (
    <article className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${accents[accent]}`}
        >
          {avatar ? (
            <img
              src={avatar}
              alt=""
              className="h-11 w-11 rounded-xl object-cover"
            />
          ) : (
            <Icon size={21} />
          )}
        </div>
        <h2 className="font-serif text-2xl">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </article>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-[#f0e8e3] py-2.5 text-sm last:border-0">
    <span className="text-[#8a928e]">{label}</span>
    <span className="text-right font-semibold text-[#3b4944]">{value}</span>
  </div>
);

export default PatientDashboard;
