import React, { useMemo, useState } from "react";
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

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, view: "dashboard" },
  { label: "Appointments", icon: CalendarDays, view: "appointments" },
  { label: "Patients", icon: Users, view: "patients" },
  { label: "Care Plans", icon: ClipboardCheck, view: "plans" },
  { label: "Reports", icon: Activity, view: "reports" },
];

const doctorPatients = [
  { name: "Amina Yusuf", age: 28, condition: "Prenatal monitoring", visit: "Monday, 10:30 AM", status: "Review due" },
  { name: "Grace Thompson", age: 32, condition: "Blood pressure follow-up", visit: "Tuesday, 2:00 PM", status: "In review" },
  { name: "Sarah Okafor", age: 26, condition: "Nutrition consultation", visit: "Wednesday, 9:15 AM", status: "Routine" },
  { name: "Chinelo Eze", age: 30, condition: "Fetal screening", visit: "Thursday, 11:45 AM", status: "Scheduled" },
  { name: "Lola Adeyemi", age: 34, condition: "Postnatal support", visit: "Friday, 1:30 PM", status: "Checklist" },
  { name: "Mariam Bello", age: 29, condition: "Lab review", visit: "Friday, 4:00 PM", status: "Review due" },
];

const Doctordashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [patientQuery, setPatientQuery] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  const savedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedInUser") || "null");
    } catch {
      return null;
    }
  }, []);

  const displayName = savedUser?.name || "Dr. Grace Okafor";
  const firstName = displayName.split(" ").slice(-1)[0] || "Grace";

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const filteredPatients = doctorPatients.filter((patient) =>
    `${patient.name} ${patient.condition} ${patient.status}`.toLowerCase().includes(patientQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f6f3] text-[#26322e]">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[#e9e2dc] bg-[#fffdfb] px-5 py-6 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-3">
          <Link to="/doctor" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d98268] text-xl font-bold text-white">✦</span>
            <span className="font-serif text-2xl font-bold tracking-tight">Pregna<span className="text-[#c87861]">Care</span></span>
          </Link>
          <button type="button" aria-label="Close menu" onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-[#69736f] hover:bg-[#fff0ea] lg:hidden"><X size={20} /></button>
        </div>

        <div className="mt-10 rounded-2xl bg-[#fff3ef] p-4">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#c87861]">Welcome back</p>
          <p className="mt-2 truncate font-serif text-2xl">{firstName}!</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e6b7a6] font-semibold text-[#7d493b]">{displayName.slice(0, 1).toUpperCase()}</div>
            <div>
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="text-xs text-[#69736f]">Obstetrician</p>
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
          <Link to="/doctor/profile" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#69736f] hover:bg-[#fff0ea] hover:text-[#b66d58]">
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
          <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#b66d58] hover:bg-[#fff0ea]">
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <button type="button" aria-label="Close navigation overlay" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-[#26322e]/30 lg:hidden" />}

      <main className="min-h-screen lg:ml-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[#e9e2dc] bg-[#f8f6f3]/95 px-5 backdrop-blur sm:px-8 lg:px-10">
          <button type="button" aria-label="Open menu" onClick={() => setSidebarOpen(true)} className="rounded-xl border border-[#e9e2dc] bg-white p-2.5 text-[#c87861] lg:hidden"><Menu size={20} /></button>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">Doctor workspace</p>
            <h1 className="mt-1 font-serif text-2xl">Good morning, {firstName} <span aria-hidden="true">👋</span></h1>
          </div>
          <div className="relative ml-auto flex items-center gap-3">
            <button type="button" aria-label="Notifications" onClick={() => setNotificationsOpen((open) => !open)} className="relative rounded-xl border border-[#e9e2dc] bg-white p-2.5 text-[#69736f] transition hover:border-[#e7b4a3] hover:text-[#c87861]">
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#d98268]" />
            </button>
            <button type="button" aria-label="Open profile" onClick={() => setActiveView("profile")} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6b7a6] font-semibold text-[#7d493b]">{displayName.slice(0, 1).toUpperCase()}</button>
            {notificationsOpen && (
              <div className="absolute right-0 top-14 w-64 rounded-2xl border border-[#eadfd9] bg-white p-4 text-sm shadow-xl">
                <p className="font-semibold">You are all caught up.</p>
                <p className="mt-1 text-[#69736f]">Your next appointment starts in 45 minutes.</p>
              </div>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mb-8 sm:hidden">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">Doctor workspace</p>
            <h1 className="mt-1 font-serif text-2xl">Good morning, {firstName}</h1>
          </div>

          {activeView === "dashboard" && (
            <>
              <section className="grid gap-5 md:grid-cols-2">
                <DashboardCard icon={UserRound} title="My Profile" accent="peach">
                  <InfoRow label="Name" value={displayName} />
                  <InfoRow label="Specialty" value="Maternal care" />
                  <InfoRow label="Clinic" value="PregnaCare Clinic" />
                  <InfoRow label="Next Shift" value="Today · 9:00 AM" />
                </DashboardCard>

                <DashboardCard icon={FileText} title="Patient Overview" accent="sage">
                  <InfoRow label="Active patients" value="148" />
                  <InfoRow label="New consults" value="12" />
                  <InfoRow label="Follow-ups" value="27" />
                  <InfoRow label="This week" value="41 visits" />
                </DashboardCard>

                <DashboardCard icon={CalendarDays} title="Appointments" accent="cream">
                  <div className="flex items-center justify-between rounded-xl bg-[#fff8f4] p-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#c87861]">Upcoming</p>
                      <p className="mt-1 font-semibold">Prenatal review</p>
                      <p className="mt-1 text-sm text-[#69736f]">Thursday, 10:30 AM</p>
                    </div>
                    <ChevronRight size={19} className="text-[#c87861]" />
                  </div>
                  <button type="button" onClick={() => setActiveView("appointments")} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c87861]">View schedule <ChevronRight size={16} /></button>
                </DashboardCard>

                <DashboardCard icon={HeartPulse} title="Care Progress" accent="rose">
                  <div id="timeline" className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-8 border-[#f4d8cd] text-sm font-bold text-[#b66d58]">74%</div>
                    <div>
                      <p className="font-semibold">Patient compliance is strong</p>
                      <p className="mt-1 text-sm leading-6 text-[#69736f]">Most patients are keeping to their care plans and follow-ups.</p>
                    </div>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#f0e3dd]">
                    <div className="h-full w-[74%] rounded-full bg-[#d98268]" />
                  </div>
                </DashboardCard>
              </section>

              <section className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
                <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">Today’s focus</p>
                      <h2 className="mt-2 font-serif text-2xl">Prepare for your patient visits</h2>
                    </div>
                    <BriefcaseMedical className="text-[#c87861]" />
                  </div>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-[#69736f]">Review each patient’s notes, update checklists, and finalize any required care instructions before the next consultation.</p>
                  <button type="button" onClick={() => setActiveView("patients")} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c66f57]">Open patient list <ChevronRight size={17} /></button>
                </div>

                <div className="rounded-2xl bg-[#26322e] p-6 text-white">
                  <Stethoscope size={25} className="text-[#f2c8b8]" />
                  <h2 className="mt-7 font-serif text-2xl">Clinical reminder</h2>
                  <p className="mt-3 text-sm leading-6 text-white/70">Rest, hydrate, and review your patient notes before each check-in to keep care consistent and calm.</p>
                </div>
              </section>
            </>
          )}

          {activeView !== "dashboard" && (
            <WorkspaceView
              view={activeView}
              patientQuery={patientQuery}
              setPatientQuery={setPatientQuery}
              filteredPatients={filteredPatients}
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

const WorkspaceView = ({ view, patientQuery, setPatientQuery, filteredPatients, profileSaved, setProfileSaved, displayName }) => {
  if (view === "patients") {
    return (
      <section>
        <WorkspaceHeading eyebrow="Care team" title="Patient overview" text="Stay on top of follow-ups, consultations, and routine monitoring." />
        <div className="rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-3.5 text-[#9aa09c]" />
            <input
              value={patientQuery}
              onChange={(event) => setPatientQuery(event.target.value)}
              placeholder="Search patients, conditions, or visit status"
              className="w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#d98268]"
            />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {filteredPatients.map((patient) => (
              <article key={patient.name} className="rounded-2xl border border-[#eadfd9] bg-[#fffdfb] p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl">{patient.name}</h3>
                    <p className="mt-1 text-sm text-[#69736f]">Age {patient.age}</p>
                  </div>
                  <span className="rounded-full bg-[#fff0ea] px-2 py-1 text-[11px] font-bold text-[#b66d58]">{patient.status}</span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-[#69736f]">
                  <p><span className="font-semibold text-[#3b4944]">Condition:</span> {patient.condition}</p>
                  <p><span className="font-semibold text-[#3b4944]">Visit:</span> {patient.visit}</p>
                </div>
                <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#d98268] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#c66f57]">Review chart <ChevronRight size={14} /></button>
              </article>
            ))}

            {filteredPatients.length === 0 && <p className="col-span-full py-6 text-center text-sm text-[#69736f]">No patients match your search.</p>}
          </div>
        </div>
      </section>
    );
  }

  if (view === "appointments") {
    return (
      <section>
        <WorkspaceHeading eyebrow="Care calendar" title="Your appointments" text="Review your upcoming consultations and scheduled patient visits." />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">Upcoming</p>
            <h2 className="mt-2 font-serif text-2xl">Prenatal check-up</h2>
            <p className="mt-4 text-sm text-[#69736f]">Thursday, September 24 · 10:30 AM</p>
            <p className="mt-2 text-sm text-[#69736f]">With Ms. Amina Yusuf · Room 4</p>
            <span className="mt-5 inline-flex rounded-full bg-[#edf3ef] px-3 py-1 text-xs font-semibold text-[#6f9387]">Confirmed</span>
          </div>

          <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
            <h2 className="font-serif text-2xl">Today’s agenda</h2>
            <div className="mt-5 space-y-4">
              <AgendaRow time="9:00 AM" title="Consultation review" />
              <AgendaRow time="11:00 AM" title="Lab follow-up" />
              <AgendaRow time="2:30 PM" title="Patient education session" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (view === "plans") {
    return (
      <section>
        <WorkspaceHeading eyebrow="Care plans" title="Treatment plans" text="Keep each patient journey structured and consistent." />
        <div className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <div className="space-y-4">
            <PlanRow title="Prenatal monitoring" detail="Daily hydration check, weekly blood pressure review, and nutrition follow-up." />
            <PlanRow title="Lab tracking" detail="Monitor iron levels, blood work, and vitamin supplementation notes." />
            <PlanRow title="Patient education" detail="Share reminders for appointments, sleep hygiene, and activity guidelines." />
          </div>
        </div>
      </section>
    );
  }

  if (view === "reports") {
    return (
      <section>
        <WorkspaceHeading eyebrow="Insights" title="Performance reports" text="Measure activity across consultations, reassessments, and care outcomes." />
        <div className="grid gap-5 lg:grid-cols-3">
          <ReportCard title="Consultations" value="41" note="This week" />
          <ReportCard title="Follow-ups" value="27" note="Scheduled" />
          <ReportCard title="Care score" value="94%" note="Patient satisfaction" />
        </div>
      </section>
    );
  }

  if (view === "settings") {
    return (
      <section>
        <WorkspaceHeading eyebrow="Workspace settings" title="Settings" text="Adjust notifications and preferences for your clinical schedule." />
        <div className="max-w-3xl rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)] sm:p-8">
          <div className="divide-y divide-[#f0e8e3]">
            <SettingRow title="Appointment reminders" text="Receive reminders before patient visits." />
            <SettingRow title="Care plan updates" text="Get alerts for any patient checklist changes." />
            <SettingRow title="Email notifications" text="Receive important updates for your clinical schedule." />
          </div>
          <button type="button" onClick={() => setProfileSaved(true)} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c66f57]">
            <Save size={17} />
            {profileSaved ? "Settings saved" : "Save settings"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <WorkspaceHeading eyebrow="Your information" title="My profile" text="Keep your professional details and availability updated." />
      <form onSubmit={(event) => { event.preventDefault(); setProfileSaved(true); window.setTimeout(() => setProfileSaved(false), 2200); }} className="max-w-3xl rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)] sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">Full name<input defaultValue={displayName} className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]" /></label>
          <label className="text-sm font-semibold">Email address<input defaultValue="grace@pregnacare.com" type="email" className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]" /></label>
          <label className="text-sm font-semibold">Phone number<input defaultValue="+234 801 234 5678" className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]" /></label>
          <label className="text-sm font-semibold">Clinic<input defaultValue="PregnaCare Clinic" className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]" /></label>
        </div>
        <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c66f57]">
          <Save size={17} />
          {profileSaved ? "Saved" : "Save changes"}
        </button>
      </form>
    </section>
  );
};

const AgendaRow = ({ time, title }) => (
  <div className="flex items-center justify-between rounded-xl bg-[#fff8f4] p-3">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#c87861]">{time}</p>
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
    <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">{title}</p>
    <h3 className="mt-3 font-serif text-4xl">{value}</h3>
    <p className="mt-2 text-sm text-[#69736f]">{note}</p>
  </div>
);

const SettingRow = ({ title, text }) => (
  <label className="flex cursor-pointer items-center justify-between gap-5 py-5">
    <span>
      <span className="block font-semibold">{title}</span>
      <span className="mt-1 block text-sm leading-6 text-[#69736f]">{text}</span>
    </span>
    <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#d98268]" />
  </label>
);

const WorkspaceHeading = ({ eyebrow, title, text }) => (
  <div className="mb-7">
    <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">{eyebrow}</p>
    <h2 className="mt-2 font-serif text-4xl">{title}</h2>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#69736f]">{text}</p>
  </div>
);

const DashboardCard = ({ icon: Icon, title, accent, children }) => {
  const accents = { peach: "bg-[#fff0ea] text-[#c87861]", sage: "bg-[#edf3ef] text-[#6f9387]", cream: "bg-[#fff8e9] text-[#ba8c49]", rose: "bg-[#f8e7e1] text-[#c87861]" };

  return (
    <article className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
      <div className="flex items-center gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accents[accent]}`}><Icon size={21} /></div>
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