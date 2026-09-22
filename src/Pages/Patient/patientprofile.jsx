import React, { useState } from "react";
import { Check, FileText, HeartPulse, Save, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { getAvatarUrl } from "../../utils/avatar";

const PatientProfile = () => {
  const savedUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");
  const avatarUrl = savedUser?.avatar || getAvatarUrl(savedUser?.email);
  const [form, setForm] = useState({
    name: savedUser?.name || "Jane Doe",
    email: savedUser?.email || "jane@example.com",
    phone: savedUser?.phone || "+234 801 234 5678",
    dueDate: savedUser?.dueDate || "",
  });
  const [saved, setSaved] = useState(false);
  const updateField = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const handleSave = (event) => {
    event.preventDefault();
    const updatedUser = { ...savedUser, ...form, avatar: avatarUrl };
    localStorage.setItem("patientProfile", JSON.stringify(updatedUser));
    localStorage.setItem("patientUser", JSON.stringify(updatedUser));
    sessionStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] text-[#26322e]">
      <header className="border-b border-[#e9e2dc] bg-[#fffdfb] px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/patient" className="font-serif text-2xl font-bold">
            Pregna<span className="text-[#c87861]">Care</span>
          </Link>
          <Link to="/patient" className="text-sm font-semibold text-[#c87861]">
            Back to dashboard
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#c87861]">
          Your information
        </p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">My profile</h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
          <aside className="rounded-2xl bg-[#26322e] p-7 text-white">
            <img
              src={avatarUrl}
              alt={`${form.name} profile`}
              className="h-20 w-20 rounded-full bg-[#e6b7a6] object-cover"
            />
            <h2 className="mt-6 font-serif text-3xl">{form.name}</h2>
            <p className="mt-1 text-sm text-white/65">PregnaCare Patient</p>
            <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
              <ProfileStat
                icon={HeartPulse}
                label="Pregnancy week"
                value="Week 22"
              />
              <ProfileStat icon={FileText} label="Documents" value="10 files" />
              <ProfileStat
                icon={UserRound}
                label="Care provider"
                value="Dr. Johnson"
              />
            </div>
          </aside>
          <section className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)] sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
                  Personal details
                </p>
                <h2 className="mt-2 font-serif text-2xl">
                  Keep your information current
                </h2>
              </div>
              <UserRound className="text-[#c87861]" />
            </div>
            <form
              onSubmit={handleSave}
              className="mt-7 grid gap-5 sm:grid-cols-2"
            >
              <Field
                label="Full name"
                name="name"
                value={form.name}
                onChange={updateField}
              />
              <Field
                label="Email address"
                name="email"
                value={form.email}
                onChange={updateField}
                type="email"
              />
              <Field
                label="Phone number"
                name="phone"
                value={form.phone}
                onChange={updateField}
              />
              <Field
                label="Due date"
                name="dueDate"
                value={form.dueDate}
                onChange={updateField}
              />
              <div className="sm:col-span-2 flex flex-wrap items-center gap-4 border-t border-[#f0e8e3] pt-5">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c66f57]"
                >
                  <Save size={17} />
                  Save changes
                </button>
                {saved && (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#6f9387]">
                    <Check size={17} />
                    Profile saved
                  </span>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

const Field = ({ label, name, value, onChange, type = "text" }) => (
  <label className="block text-sm font-semibold">
    {label}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none transition focus:border-[#d98268]"
    />
  </label>
);
const ProfileStat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <Icon size={18} className="text-[#f2c8b8]" />
    <div>
      <p className="text-xs text-white/55">{label}</p>
      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  </div>
);

export default PatientProfile;
