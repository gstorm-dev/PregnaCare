import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createRandomAvatar } from "../../utils/avatar";

const AuthPage = ({ mode, role }) => {
  const navigate = useNavigate();
  const isSignup = mode === "signup";
  const roleLabel = role === "doctor" ? "Doctor" : "Patient";
  const storageKey = `${role}User`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [experience, setExperience] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pregnancyWeek, setPregnancyWeek] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [patientDetailsStep, setPatientDetailsStep] = useState(false);
  const [credentialsStep, setCredentialsStep] = useState(false);
  const [applicationSent] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (isSignup) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (role === "doctor") {
        const doctorProfile = {
          name,
          email,
          password,
          role,
          avatar: createRandomAvatar(role),
          status: "pending_verification",
        };

        localStorage.setItem(storageKey, JSON.stringify(doctorProfile));
        setCredentialsStep(true);
        return;
      }

      if (role === "patient" && !patientDetailsStep) {
        setPatientDetailsStep(true);
        return;
      }

      localStorage.setItem(
        storageKey,
        JSON.stringify({
          name,
          email,
          password,
          role,
          avatar: createRandomAvatar(role),
          dueDate,
          pregnancyWeek,
          bloodType,
          medicalHistory,
          emergencyContact,
        }),
      );
      setAccountCreated(true);
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (
      !savedUser ||
      savedUser.email !== email ||
      savedUser.password !== password
    ) {
      setError(
        "No matching account found. Please check your details or sign up first.",
      );
      return;
    }

    const userWithAvatar = savedUser.avatar
      ? savedUser
      : { ...savedUser, avatar: createRandomAvatar(role) };
    localStorage.setItem(storageKey, JSON.stringify(userWithAvatar));
    sessionStorage.setItem("loggedInUser", JSON.stringify(userWithAvatar));
    if (role === "doctor") {
      localStorage.setItem("doctorUser", JSON.stringify(userWithAvatar));
    }
    navigate(role === "doctor" ? "/doctor" : "/patient");
  };

  const handleCredentialSubmit = (event) => {
    event.preventDefault();
    setError("");

    const doctorProfile = {
      name,
      email,
      password,
      role,
      avatar: createRandomAvatar(role),
      status: "pending_verification",
      licenseNumber,
      specialty,
      clinic: clinicName,
      clinicName,
      phone: contactInfo,
      contactInfo,
      experience,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(storageKey, JSON.stringify(doctorProfile));

    const pendingApplications = JSON.parse(
      localStorage.getItem("doctorApplications") || "[]",
    );
    pendingApplications.push({
      name,
      email,
      licenseNumber,
      specialty,
      clinicName,
      phone: contactInfo,
      contactInfo,
      experience,
      submittedAt: new Date().toISOString(),
      status: "pending_verification",
    });
    localStorage.setItem(
      "doctorApplications",
      JSON.stringify(pendingApplications),
    );

    setIsProcessing(true);
    setTimeout(() => {
      sessionStorage.setItem("loggedInUser", JSON.stringify(doctorProfile));
      localStorage.setItem("doctorUser", JSON.stringify(doctorProfile));
      navigate("/doctor");
    }, 5000);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] w-full px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-176px)] w-full max-w-6xl items-center justify-center">
        <section className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <Link to="/" className="text-sm font-semibold text-blue-700 transition hover:text-blue-800">
            ← Back to home
          </Link>

          <div className="mt-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              PregnaCare
            </p>
            <h1 className="text-3xl font-bold text-slate-800">
              {isSignup
                ? credentialsStep
                  ? "Complete your doctor profile"
                  : patientDetailsStep
                    ? "Tell us about your pregnancy"
                  : `Create your ${roleLabel.toLowerCase()} account`
                : `${roleLabel} sign in`}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {isSignup
                ? credentialsStep
                  ? "Add your professional details so the admin can verify your application."
                  : patientDetailsStep
                    ? "This information helps your doctor prepare your care report."
                  : accountCreated
                    ? "Your account has been created. Please continue to sign in when ready."
                    : "Join a connected space for better pregnancy care."
                : "Continue to your PregnaCare workspace."}
            </p>
          </div>

          {isProcessing ? (
            <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 px-4 py-4 text-sm text-blue-700">
              Processing your application. You will be redirected to your
              dashboard shortly...
            </div>
          ) : isSignup &&
            role === "doctor" &&
            credentialsStep &&
            !applicationSent ? (
            <form onSubmit={handleCredentialSubmit} className="mt-8 space-y-5">
              <label className="block text-sm font-semibold text-slate-700">
                Medical license number
                <input
                  value={licenseNumber}
                  onChange={(event) => setLicenseNumber(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="e.g. MD-23456"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Specialty
                <input
                  value={specialty}
                  onChange={(event) => setSpecialty(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="Obstetrics & Gynecology"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Clinic / hospital name
                <input
                  value={clinicName}
                  onChange={(event) => setClinicName(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="Clinic or hospital name"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Contact information
                <input
                  value={contactInfo}
                  onChange={(event) => setContactInfo(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="e.g. +234 801 234 5678"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Years of experience
                <input
                  value={experience}
                  onChange={(event) => setExperience(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="e.g. 6 years"
                />
              </label>

              {error && (
                <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Submit application
              </button>
            </form>
          ) : isSignup && role === "patient" && patientDetailsStep ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="block text-sm font-semibold text-slate-700">
                Expected due date
                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Current pregnancy week
                <input
                  type="number"
                  min="1"
                  max="45"
                  value={pregnancyWeek}
                  onChange={(event) => setPregnancyWeek(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="e.g. 24"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Blood type
                <input
                  value={bloodType}
                  onChange={(event) => setBloodType(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="e.g. O+"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Medical history or allergies
                <textarea
                  value={medicalHistory}
                  onChange={(event) => setMedicalHistory(event.target.value)}
                  required
                  rows="3"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="Share anything your doctor should know"
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Emergency contact
                <input
                  value={emergencyContact}
                  onChange={(event) => setEmergencyContact(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="Name and phone number"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Complete patient profile
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {isSignup && (
                <label className="block text-sm font-semibold text-slate-700">
                  Full name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Your full name"
                  />
                </label>
              )}

              <label className="block text-sm font-semibold text-slate-700">
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block text-sm font-semibold text-slate-700">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="At least 6 characters"
                />
              </label>

              {isSignup && (
                <label className="block text-sm font-semibold text-slate-700">
                  Confirm password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    placeholder="Repeat your password"
                  />
                </label>
              )}

              {error && (
                <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {applicationSent ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
                  Your application has been sent to the admin for verification.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {isSignup
                    ? `Create ${roleLabel} account`
                    : `Sign in as ${roleLabel.toLowerCase()}`}
                </button>
              )}
            </form>
          )}

          {accountCreated && !applicationSent && !credentialsStep && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              Your account has been created successfully. Please sign in to
              continue.
            </div>
          )}

          {!applicationSent && !credentialsStep && !accountCreated && (
            <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
              {isSignup ? "Already have an account?" : "Need an account?"}{" "}
              <Link
                to={`/${role}/${isSignup ? "login" : "signup"}`}
                className="font-semibold text-blue-700 hover:text-blue-800"
              >
                {isSignup ? "Sign in" : "Create an Account"}
              </Link>
            </div>
          )}

          {!applicationSent && !credentialsStep && !accountCreated && (
            <div className="mt-4 text-center text-xs text-slate-400">
              Switch role:{" "}
              {role === "doctor" ? (
                <Link
                  className="font-semibold text-blue-600 hover:text-blue-700"
                  to={`/${isSignup ? "patient/signup" : "patient/login"}`}
                >
                  Patient
                </Link>
              ) : (
                <Link
                  className="font-semibold text-blue-600 hover:text-blue-700"
                  to={`/${isSignup ? "doctor/signup" : "doctor/login"}`}
                >
                  Doctor
                </Link>
              )}
            </div>
          )}

          {(accountCreated || applicationSent) && !credentialsStep && (
            <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
              <Link
                to={`/${role}/login`}
                className="font-semibold text-blue-700 hover:text-blue-800"
              >
                Go to sign in
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AuthPage;
