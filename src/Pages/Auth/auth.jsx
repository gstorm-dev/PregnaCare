import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthPage = ({ mode, role }) => {
  const navigate = useNavigate();
  const isSignup = mode === "signup";
  const roleLabel = role === "doctor" ? "Doctor" : "Patient";
  const storageKey = `${role}User`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (isSignup) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      localStorage.setItem(storageKey, JSON.stringify({ name, email, password, role }));
      navigate(`/${role}/login`);
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
      setError("No matching account found. Please check your details or sign up first.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
    navigate(role === "doctor" ? "/doctor" : "/patient");
  };

  return (
    <main className="min-h-[calc(100vh-80px)] w-full bg-blue-50 px-6 py-12">

      <div className="mx-auto flex min-h-[calc(100vh-176px)] w-full max-w-6xl items-center justify-center">

        <section className="w-full max-w-md rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">

          <Link
            to="/"
            className="text-sm font-semibold text-blue-700 transition hover:text-blue-800"
          >
            ← Back to home
          </Link>

          <div className="mt-8">

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              PregnaCare
            </p>

            <h1 className="text-3xl font-bold text-slate-800">
              {isSignup
                ? `Create your ${roleLabel.toLowerCase()} account`
                : `${roleLabel} sign in`}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {isSignup
                ? "Join a connected space for better pregnancy care."
                : "Continue to your PregnaCare workspace."}
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

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

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {isSignup
                ? `Create ${roleLabel} account`
                : `Sign in as ${roleLabel.toLowerCase()}`}
            </button>

          </form>

          <div className="mt-7 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">

            {isSignup ? "Already have an account?" : "Need an account?"}{" "}

            <Link
              to={`/${role}/${isSignup ? "login" : "signup"}`}
              className="font-semibold text-blue-700 hover:text-blue-800"
            >
              {isSignup ? "Sign in" : "Create one"}
            </Link>

          </div>

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

        </section>

      </div>

    </main>
  );
};

export default AuthPage;