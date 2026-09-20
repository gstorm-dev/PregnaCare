import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Bell,
  BriefcaseMedical,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  Save,
  Search,
  Settings,
  Stethoscope,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAppointments,
  removeAppointment,
  saveAppointments,
  updateAppointment,
} from "../../Services/appointments";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
  { label: "Appointments", icon: CalendarDays, view: "appointments" },
  { label: "Patients", icon: Users, view: "patients" },
  { label: "Pending Requests", icon: FileText, view: "pendingPatients" },
  { label: "Care Plans", icon: ClipboardCheck, view: "plans" },
  { label: "Reports", icon: Activity, view: "reports" },
];

const initialPendingRequests = [];

const getConsultationRoomName = (appointment) => {
  const patientName = appointment.patientName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  return `pregnacare-${appointment.id}-${patientName}`;
};

const defaultPreferences = {
  appointmentReminders: true,
  carePlanUpdates: true,
  emailNotifications: true,
};

const getDoctorStorageKey = (section) => {
  try {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    const doctorId =
      user?.email?.toLowerCase().replace(/[^a-z0-9]/g, "-") || "guest";
    return `doctorDashboard:${doctorId}:${section}`;
  } catch {
    return `doctorDashboard:guest:${section}`;
  }
};

const getStoredList = (section, fallback) => {
  try {
    const savedList = JSON.parse(
      localStorage.getItem(getDoctorStorageKey(section)) || "null",
    );
    return Array.isArray(savedList) ? savedList : fallback;
  } catch {
    return fallback;
  }
};

const Doctordashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [patientQuery, setPatientQuery] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [preferences, setPreferences] = useState(() => {
    try {
      return {
        ...defaultPreferences,
        ...JSON.parse(
          localStorage.getItem("doctorDashboardPreferences") || "{}",
        ),
      };
    } catch {
      return defaultPreferences;
    }
  });
  const [pendingPatients, setPendingPatients] = useState(() =>
    [],
  );
  const [acceptedPatients, setAcceptedPatients] = useState(() =>
    [],
  );
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const notifiedAppointmentIds = useRef(new Set());
  const [doctorProfile, setDoctorProfile] = useState(() => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("loggedInUser") || "null",
      );
      return {
        name: storedUser?.name || "",
        email: storedUser?.email || "",
        phone: storedUser?.phone || storedUser?.contactInfo || "",
        contactInfo: storedUser?.contactInfo || storedUser?.phone || "",
        clinic: storedUser?.clinic || storedUser?.clinicName || "",
        specialty: storedUser?.specialty || "",
      };
    } catch {
      return {
        name: "",
        email: "",
        phone: "",
        contactInfo: "",
        clinic: "",
        specialty: "",
      };
    }
  });

  const savedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser") || "null");
    } catch {
      return null;
    }
  }, []);

  const displayName = doctorProfile.name || "Doctor";
  const firstName = displayName.split(" ").slice(-1)[0] || "Doctor";

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const filteredPatients = acceptedPatients.filter((patient) =>
    `${patient.name} ${patient.condition || patient.reason} ${patient.status}`
      .toLowerCase()
      .includes(patientQuery.toLowerCase()),
  );

  const activePatientCount = acceptedPatients.length;

  useEffect(() => {
    localStorage.setItem(
      getDoctorStorageKey("pendingPatients"),
      JSON.stringify(pendingPatients),
    );
  }, [pendingPatients]);

  useEffect(() => {
    localStorage.setItem(
      getDoctorStorageKey("acceptedPatients"),
      JSON.stringify(acceptedPatients),
    );
  }, [acceptedPatients]);

  useEffect(() => {
    const syncAppointments = () => {
      const appointments = getAppointments();
      const doctorAppointments = appointments.filter(
        (appointment) =>
          appointment.doctorEmail &&
          appointment.doctorEmail === doctorProfile.email,
      );
      setPendingAppointments(
        doctorAppointments.filter(
          (appointment) => appointment.status === "Pending",
        ),
      );
      setAcceptedAppointments(
        doctorAppointments.filter(
          (appointment) => appointment.status === "Accepted",
        ),
      );
    };

    syncAppointments();
    window.addEventListener(
      "pregnacare:appointments-updated",
      syncAppointments,
    );
    return () =>
      window.removeEventListener(
        "pregnacare:appointments-updated",
        syncAppointments,
      );
  }, [doctorProfile.email]);

  const notifyDoctorConsultationReady = (appointment) => {
    window.alert(
      `Consultation reminder: it is time to meet with ${appointment.patientName}. You can start the video call from the accepted appointment card.`,
    );
  };

  useEffect(() => {
    const checkConsultationTimes = () => {
      const now = Date.now();

      acceptedAppointments.forEach((appointment) => {
        const appointmentTime = new Date(appointment.scheduledAt).getTime();
        const hasValidTime = Number.isFinite(appointmentTime);

        if (
          hasValidTime &&
          appointmentTime <= now &&
          !notifiedAppointmentIds.current.has(appointment.id)
        ) {
          notifiedAppointmentIds.current.add(appointment.id);
          notifyDoctorConsultationReady(appointment);
        }
      });
    };

    checkConsultationTimes();
    const reminderInterval = window.setInterval(checkConsultationTimes, 30_000);
    return () => window.clearInterval(reminderInterval);
  }, [acceptedAppointments]);

  const startConsultation = (appointment) => {
    navigate(`/consultation/${getConsultationRoomName(appointment)}`);
  };

  const handlePendingPatientDecision = (requestId, decision) => {
    const request = pendingPatients.find((item) => item.id === requestId);
    if (!request) return;

    setPendingPatients((current) =>
      current.filter((item) => item.id !== requestId),
    );

    if (decision === "accept") {
      setAcceptedPatients((current) => [
        ...current,
        {
          ...request,
          condition: request.reason,
          visit: request.requestedAt,
          status: "New patient",
        },
      ]);

      const appointment = {
        id: `patient-${request.id}`,
        patientName: request.name,
        reason: request.reason,
        date: "To be scheduled",
        requestedAt: request.requestedAt,
        status: "Pending",
        doctorName: displayName,
        doctorEmail: doctorProfile.email,
      };
      const appointments = getAppointments().filter(
        (item) => item.id !== appointment.id,
      );
      saveAppointments([...appointments, appointment]);
    }
  };

  const handleAppointmentDecision = (appointmentId, decision) => {
    const appointment = pendingAppointments.find(
      (item) => item.id === appointmentId,
    );
    if (!appointment) {
      const acceptedAppointment = acceptedAppointments.find(
        (item) => item.id === appointmentId,
      );
      if (!acceptedAppointment) return;

      removeAppointment(appointmentId);
      return;
    }

    if (decision === "accept") {
      updateAppointment(appointmentId, { status: "Accepted" });
    } else {
      removeAppointment(appointmentId);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] text-[#26322e]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[#e9e2dc] bg-[#fffdfb] px-5 py-6 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-3">
          <Link
            to="/doctor"
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
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e6b7a6] font-semibold text-[#7d493b]">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="text-xs text-[#69736f]">
                {doctorProfile.specialty}
              </p>
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

        <div className="mt-auto border-t border-[#eee6e0] pt-5 space-y-1">
          <Link
            to="/doctor/profile"
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
              Doctor workspace
            </p>
            <h1 className="mt-1 font-serif text-2xl">
              Good morning, {firstName}{" "}
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
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#d98268]" />
            </button>
            <button
              type="button"
              aria-label="Open profile"
              onClick={() => setActiveView("profile")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6b7a6] font-semibold text-[#7d493b]"
            >
              {displayName.slice(0, 1).toUpperCase()}
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-14 w-64 rounded-2xl border border-[#eadfd9] bg-white p-4 text-sm shadow-xl">
                <p className="font-semibold">You are all caught up.</p>
                <p className="mt-1 text-[#69736f]">
                  Your next appointment starts in 45 minutes.
                </p>
              </div>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mb-8 sm:hidden">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
              Doctor workspace
            </p>
            <h1 className="mt-1 font-serif text-2xl">
              Good morning, {firstName}
            </h1>
          </div>

          {activeView === "dashboard" && (
            <>
              <section className="grid gap-5 md:grid-cols-2">
                <DashboardCard
                  icon={UserRound}
                  title="My Profile"
                  accent="peach"
                >
                  <InfoRow label="Name" value={displayName} />
                  <InfoRow label="Specialty" value={doctorProfile.specialty} />
                  <InfoRow label="Clinic" value={doctorProfile.clinic} />
                  <InfoRow label="Next Shift" value="Not set yet" />
                </DashboardCard>

                <DashboardCard
                  icon={FileText}
                  title="Patient Overview"
                  accent="sage"
                >
                  {activePatientCount === 0 ? (
                    <div className="rounded-xl bg-[#edf3ef] p-4 text-center">
                      <p className="text-sm font-semibold text-[#3d5a51]">
                        No patients yet
                      </p>
                      <p className="mt-2 text-sm text-[#69736f]">
                        Start by reviewing pending patient requests.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveView("pendingPatients")}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#d98268] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#c66f57]"
                      >
                        Accept patients <ChevronRight size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <InfoRow
                        label="Active patients"
                        value={String(activePatientCount)}
                      />
                      <InfoRow
                        label="Needs review"
                        value={String(Math.max(activePatientCount, 0))}
                      />
                      <InfoRow
                        label="Next appointment"
                        value={
                          activePatientCount > 0
                            ? "Awaiting booking"
                            : "No booking yet"
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setActiveView("patients")}
                        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#d98268] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#c66f57]"
                      >
                        View patient list <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </DashboardCard>

                <DashboardCard
                  icon={CalendarDays}
                  title="Appointments"
                  accent="cream"
                >
                  {acceptedAppointments.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#e7d2c7] bg-[#fff8f4] p-4 text-center">
                      <p className="text-sm font-semibold text-[#3b4944]">
                        No appointments yet
                      </p>
                      <p className="mt-2 text-sm text-[#69736f]">
                        Your schedule will appear after an appointment is
                        accepted.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-[#f0d9d0] bg-[#fff8f4] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
                        Booked
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#26322e]">
                        {acceptedAppointments[0].patientName} booked an
                        appointment
                      </p>
                      <p className="mt-1 text-sm text-[#69736f]">
                        {acceptedAppointments[0].date}
                      </p>
                    </div>
                  )}
                </DashboardCard>

                <DashboardCard
                  icon={HeartPulse}
                  title="Care Progress"
                  accent="rose"
                >
                  <div className="rounded-xl border border-dashed border-[#efd4ca] bg-[#fff7f5] p-4 text-center">
                    <p className="text-sm font-semibold text-[#3b4944]">
                      No care progress yet
                    </p>
                    <p className="mt-2 text-sm text-[#69736f]">
                      Progress updates will appear after patient visits begin.
                    </p>
                  </div>
                </DashboardCard>
              </section>

              <section className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
                <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
                        Today’s focus
                      </p>
                      <h2 className="mt-2 font-serif text-2xl">
                        Prepare for your patient visits
                      </h2>
                    </div>
                    <BriefcaseMedical className="text-[#c87861]" />
                  </div>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-[#69736f]">
                    Review each patient’s notes, update checklists, and finalize
                    any required care instructions before the next consultation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveView("patients")}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c66f57]"
                  >
                    Open patient list <ChevronRight size={17} />
                  </button>
                </div>

                <div className="rounded-2xl bg-[#26322e] p-6 text-white">
                  <Stethoscope size={25} className="text-[#f2c8b8]" />
                  <h2 className="mt-7 font-serif text-2xl">
                    Clinical reminder
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Rest, hydrate, and review your patient notes before each
                    check-in to keep care consistent and calm.
                  </p>
                </div>
              </section>
            </>
          )}

          {activeView !== "dashboard" && (
            <WorkspaceView
              view={activeView}
              setActiveView={setActiveView}
              patientQuery={patientQuery}
              setPatientQuery={setPatientQuery}
              filteredPatients={filteredPatients}
              pendingPatients={pendingPatients}
              acceptedPatients={acceptedPatients}
              handlePendingPatientDecision={handlePendingPatientDecision}
              pendingAppointments={pendingAppointments}
              acceptedAppointments={acceptedAppointments}
              handleAppointmentDecision={handleAppointmentDecision}
              startConsultation={startConsultation}
              profileSaved={profileSaved}
              setProfileSaved={setProfileSaved}
              preferences={preferences}
              setPreferences={setPreferences}
              displayName={displayName}
              doctorProfile={doctorProfile}
              setDoctorProfile={setDoctorProfile}
              savedUser={savedUser}
              handleLogout={handleLogout}
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
  patientQuery,
  setPatientQuery,
  filteredPatients,
  pendingPatients,
  acceptedPatients,
  handlePendingPatientDecision,
  pendingAppointments,
  acceptedAppointments,
  handleAppointmentDecision,
  startConsultation,
  profileSaved,
  setProfileSaved,
  preferences,
  setPreferences,
  displayName,
  doctorProfile,
  setDoctorProfile,
  savedUser,
  handleLogout,
}) => {
  if (view === "patients") {
    return (
      <section>
        <WorkspaceHeading
          eyebrow="Care team"
          title="Patient overview"
          text="Stay on top of follow-ups, consultations, and routine monitoring."
        />
        <div className="rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          {filteredPatients.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#e9d4cc] bg-[#fffaf8] p-8 text-center">
              <p className="font-serif text-3xl text-[#26322e]">
                No patients yet
              </p>
              <p className="mt-3 text-sm leading-6 text-[#69736f]">
                Once you accept a patient request, they will appear here.
              </p>
              <button
                type="button"
                onClick={() => setActiveView("pendingPatients")}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c66f57]"
              >
                Accept patients <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-4 top-3.5 text-[#9aa09c]"
                  />
                  <input
                    value={patientQuery}
                    onChange={(event) => setPatientQuery(event.target.value)}
                    placeholder="Search patients, conditions, or visit status"
                    className="w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#d98268]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView("pendingPatients")}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c66f57]"
                >
                  Pending requests
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {filteredPatients.map((patient) => (
                  <article
                    key={`${patient.name}-${patient.visit}`}
                    className="rounded-2xl border border-[#eadfd9] bg-[#fffdfb] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-xl">{patient.name}</h3>
                        <p className="mt-1 text-sm text-[#69736f]">
                          Age {patient.age}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#fff0ea] px-2 py-1 text-[11px] font-bold text-[#b66d58]">
                        {patient.status}
                      </span>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-[#69736f]">
                      <p>
                        <span className="font-semibold text-[#3b4944]">
                          Condition:
                        </span>{" "}
                        {patient.condition}
                      </p>
                      <p>
                        <span className="font-semibold text-[#3b4944]">
                          Visit:
                        </span>{" "}
                        {patient.visit}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#d98268] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#c66f57]"
                    >
                      Review chart <ChevronRight size={14} />
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    );
  }

  if (view === "pendingPatients") {
    return (
      <section>
        <WorkspaceHeading
          eyebrow="Access requests"
          title="Pending patient requests"
          text="Review patient requests and decide who to accept into your care list."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {pendingPatients.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-[#e9d4cc] bg-[#fffaf8] p-8 text-center">
              <p className="font-serif text-3xl text-[#26322e]">
                No pending requests
              </p>
              <p className="mt-3 text-sm text-[#69736f]">
                When a patient requests care, they will appear here for review.
              </p>
            </div>
          ) : (
            pendingPatients.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-2xl">{request.name}</h3>
                    <p className="mt-1 text-sm text-[#69736f]">
                      Age {request.age}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#fff0ea] px-2 py-1 text-[11px] font-bold text-[#b66d58]">
                    Pending
                  </span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-[#69736f]">
                  <p>
                    <span className="font-semibold text-[#3b4944]">
                      Request:
                    </span>{" "}
                    {request.reason}
                  </p>
                  <p>
                    <span className="font-semibold text-[#3b4944]">
                      Requested:
                    </span>{" "}
                    {request.requestedAt}
                  </p>
                </div>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handlePendingPatientDecision(request.id, "accept")
                    }
                    className="flex-1 rounded-xl bg-[#d98268] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c66f57]"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handlePendingPatientDecision(request.id, "decline")
                    }
                    className="flex-1 rounded-xl border border-[#e9d4cc] bg-[#fffaf8] px-4 py-2.5 text-sm font-semibold text-[#8b645c] transition hover:bg-[#fdf0eb]"
                  >
                    Decline
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    );
  }

  if (view === "appointments") {
    return (
      <section>
        <WorkspaceHeading
          eyebrow="Care calendar"
          title="Your appointments"
          text="Review appointment requests, confirmed bookings, and schedule updates."
        />
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-serif text-2xl">
                Pending appointment requests
              </h3>
              <button
                type="button"
                onClick={() =>
                  alert("Schedule new appointment feature coming soon")
                }
                className="inline-flex items-center gap-2 rounded-lg bg-[#d98268] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#c66f57]"
              >
                + Schedule
              </button>
            </div>
            {pendingAppointments.length === 0 ? (
              <p className="mt-4 text-sm text-[#69736f]">
                No pending appointment requests.
              </p>
            ) : (
              <div className="mt-4 grid gap-4">
                {pendingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="relative rounded-2xl border border-[#eadfd9] bg-[#fffdfb] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#26322e]">
                          {appointment.patientName}
                        </p>
                        <p className="mt-1 text-sm text-[#69736f]">
                          {appointment.reason}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#fff0ea] px-2 py-1 text-[11px] font-bold text-[#b66d58]">
                        Pending
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[#69736f]">
                      Requested: {appointment.requestedAt}
                    </p>
                    <p className="text-sm text-[#69736f]">
                      Preferred time: {appointment.date}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleAppointmentDecision(appointment.id, "accept")
                        }
                        className="flex-1 rounded-xl bg-[#d98268] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c66f57]"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleAppointmentDecision(appointment.id, "decline")
                        }
                        className="flex-1 rounded-xl border border-[#e9d4cc] bg-[#fffaf8] px-4 py-2.5 text-sm font-semibold text-[#8b645c] transition hover:bg-[#fdf0eb]"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
            <h3 className="font-serif text-2xl">Accepted appointments</h3>
            {acceptedAppointments.length === 0 ? (
              <p className="mt-4 text-sm text-[#69736f]">
                No accepted appointments yet.
              </p>
            ) : (
              <div className="mt-4 grid gap-4">
                {acceptedAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="rounded-2xl border border-[#eadfd9] bg-[#fffdfb] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#26322e]">
                          {appointment.patientName}
                        </p>
                        <p className="mt-1 text-sm text-[#69736f]">
                          {appointment.reason}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#edf3ef] px-2 py-1 text-[11px] font-bold text-[#6f9387]">
                        Accepted
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[#69736f]">
                      Date: {appointment.date}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleAppointmentDecision(appointment.id, "decline")
                        }
                        className="inline-flex items-center rounded-xl border border-[#e9d4cc] bg-[#fffaf8] px-4 py-2 text-sm font-semibold text-[#8b645c] transition hover:bg-[#fdf0eb]"
                      >
                        Decline appointment
                      </button>
                      <button
                        type="button"
                        onClick={() => startConsultation(appointment)}
                        className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#26322e] px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-[#3b4944]"
                      >
                        Start consultation <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (view === "plans") {
    return (
      <section>
        <WorkspaceHeading
          eyebrow="Care plans"
          title="Treatment plans"
          text="Keep each patient journey structured and consistent."
        />
        <div className="rounded-2xl border border-dashed border-[#e9d4cc] bg-[#fffaf8] p-10 text-center shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <p className="font-serif text-3xl text-[#26322e]">
            No care progress yet
          </p>
          <p className="mt-3 text-sm leading-6 text-[#69736f]">
            Care plans and progress updates will appear here as soon as you
            begin seeing patients.
          </p>
        </div>
      </section>
    );
  }

  if (view === "reports") {
    const totalAcceptedAppointments = acceptedAppointments.length;
    const totalPendingAppointments = pendingAppointments.length;
    const totalAcceptedPatients = acceptedPatients.length;
    const totalDeclined = pendingPatients.length;
    const careScore =
      totalAcceptedAppointments > 0
        ? Math.round(
            (totalAcceptedAppointments /
              (totalAcceptedAppointments + totalDeclined + 1)) *
              100,
          )
        : 0;

    return (
      <section>
        <WorkspaceHeading
          eyebrow="Insights"
          title="Performance reports"
          text="Measure activity across consultations, reassessments, and care outcomes."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          <ReportCard
            title="Consultations"
            value={String(totalAcceptedAppointments)}
            note="Accepted"
          />
          <ReportCard
            title="Follow-ups"
            value={String(totalPendingAppointments)}
            note="Pending"
          />
          <ReportCard
            title="Care score"
            value={`${careScore}%`}
            note="Acceptance rate"
          />
        </div>
      </section>
    );
  }

  if (view === "settings") {
    return (
      <section>
        <WorkspaceHeading
          eyebrow="Workspace settings"
          title="Settings"
          text="Adjust notifications and preferences for your clinical schedule."
        />
        <div className="max-w-3xl rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)] sm:p-8">
          <div className="divide-y divide-[#f0e8e3]">
            <SettingRow
              title="Appointment reminders"
              text="Receive reminders before patient visits."
              checked={preferences.appointmentReminders}
              onChange={(checked) =>
                setPreferences((current) => ({
                  ...current,
                  appointmentReminders: checked,
                }))
              }
            />
            <SettingRow
              title="Care plan updates"
              text="Get alerts for any patient checklist changes."
              checked={preferences.carePlanUpdates}
              onChange={(checked) =>
                setPreferences((current) => ({
                  ...current,
                  carePlanUpdates: checked,
                }))
              }
            />
            <SettingRow
              title="Email notifications"
              text="Receive important updates for your clinical schedule."
              checked={preferences.emailNotifications}
              onChange={(checked) =>
                setPreferences((current) => ({
                  ...current,
                  emailNotifications: checked,
                }))
              }
            />
          </div>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem(
                "doctorDashboardPreferences",
                JSON.stringify(preferences),
              );
              setProfileSaved(true);
              window.setTimeout(() => setProfileSaved(false), 2200);
            }}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c66f57]"
          >
            <Save size={17} />
            {profileSaved ? "Settings saved" : "Save settings"}
          </button>
        </div>
      </section>
    );
  }

  if (view === "profile") {
    return (
      <section>
        <WorkspaceHeading
          eyebrow="Your information"
          title="My profile"
          text="Keep your professional details and availability updated."
        />
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const updatedUser = {
              ...savedUser,
              name: doctorProfile.name,
              email: doctorProfile.email,
              phone: doctorProfile.phone || doctorProfile.contactInfo,
              contactInfo: doctorProfile.contactInfo || doctorProfile.phone,
              clinic: doctorProfile.clinic,
              clinicName: doctorProfile.clinic,
              specialty: doctorProfile.specialty,
            };

            localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
            localStorage.setItem("doctorUser", JSON.stringify(updatedUser));
            setProfileSaved(true);
            window.setTimeout(() => setProfileSaved(false), 2200);
          }}
          className="max-w-3xl rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)] sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Full name
              <input
                value={doctorProfile.name}
                onChange={(event) =>
                  setDoctorProfile((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
              />
            </label>
            <label className="text-sm font-semibold">
              Email address
              <input
                value={doctorProfile.email}
                type="email"
                onChange={(event) =>
                  setDoctorProfile((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
              />
            </label>
            <label className="text-sm font-semibold">
              Phone number
              <input
                value={doctorProfile.phone || doctorProfile.contactInfo || ""}
                onChange={(event) =>
                  setDoctorProfile((current) => ({
                    ...current,
                    phone: event.target.value,
                    contactInfo: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
              />
            </label>
            <label className="text-sm font-semibold">
              Clinic
              <input
                value={doctorProfile.clinic}
                onChange={(event) =>
                  setDoctorProfile((current) => ({
                    ...current,
                    clinic: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
              />
            </label>
            <label className="text-sm font-semibold sm:col-span-2">
              Specialty
              <input
                value={doctorProfile.specialty}
                onChange={(event) =>
                  setDoctorProfile((current) => ({
                    ...current,
                    specialty: event.target.value,
                  }))
                }
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
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#e74c3c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c0392b]"
        >
          <LogOut size={17} />
          Logout
        </button>
      </section>
    );
  }
};

const AgendaRow = ({ time, title }) => (
  <div className="flex items-center justify-between rounded-xl bg-[#fff8f4] p-3">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#c87861]">
        {time}
      </p>
      <p className="mt-1 font-semibold text-[#26322e]">{title}</p>
    </div>
    <ChevronRight size={16} className="text-[#c87861]" />
  </div>
);

const PlanRow = ({ title, detail }) => (
  <div className="rounded-2xl border border-[#f0e8e3] bg-[#fffdfb] p-4">
    <p className="font-semibold text-[#26322e]">{title}</p>
    <p className="mt-2 text-sm leading-6 text-[#69736f]">{detail}</p>
  </div>
);

const ReportCard = ({ title, value, note }) => (
  <div className="rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
    <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
      {title}
    </p>
    <h3 className="mt-3 font-serif text-4xl">{value}</h3>
    <p className="mt-2 text-sm text-[#69736f]">{note}</p>
  </div>
);

const SettingRow = ({ title, text, checked, onChange }) => (
  <label className="flex cursor-pointer items-center justify-between gap-5 py-5">
    <span>
      <span className="block font-semibold">{title}</span>
      <span className="mt-1 block text-sm leading-6 text-[#69736f]">
        {text}
      </span>
    </span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
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

const DashboardCard = ({ icon: Icon, title, accent, children }) => {
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
          <Icon size={21} />
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

export default Doctordashboard;
