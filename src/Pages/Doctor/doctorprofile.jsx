import { LogOut, Save } from "lucide-react";

const DoctorProfile = ({
  doctorProfile,
  setDoctorProfile,
  savedUser,
  profileSaved,
  setProfileSaved,
  handleLogout,
}) => (
  <section>
    <SectionHeading
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
          phone: doctorProfile.phone,
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
        <ProfileField
          label="Full name"
          value={doctorProfile.name}
          onChange={(value) =>
            setDoctorProfile((current) => ({ ...current, name: value }))
          }
        />
        <ProfileField
          label="Email address"
          type="email"
          value={doctorProfile.email}
          onChange={(value) =>
            setDoctorProfile((current) => ({ ...current, email: value }))
          }
        />
        <ProfileField
          label="Phone number"
          value={doctorProfile.phone}
          onChange={(value) =>
            setDoctorProfile((current) => ({ ...current, phone: value }))
          }
        />
        <ProfileField
          label="Clinic"
          value={doctorProfile.clinic}
          onChange={(value) =>
            setDoctorProfile((current) => ({ ...current, clinic: value }))
          }
        />
        <ProfileField
          label="Specialty"
          value={doctorProfile.specialty}
          className="sm:col-span-2"
          onChange={(value) =>
            setDoctorProfile((current) => ({ ...current, specialty: value }))
          }
        />
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

const ProfileField = ({
  label,
  type = "text",
  value,
  onChange,
  className = "",
}) => (
  <label className={`text-sm font-semibold ${className}`}>
    {label}
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
    />
  </label>
);
const SectionHeading = ({ eyebrow, title, text }) => (
  <div className="mb-7">
    <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
      {eyebrow}
    </p>
    <h2 className="mt-2 font-serif text-4xl">{title}</h2>
    <p className="mt-3 max-w-2xl text-sm leading-6 text-[#69736f]">{text}</p>
  </div>
);

export default DoctorProfile;
