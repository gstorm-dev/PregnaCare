import React from "react";

const Patientinfo = ({ patient, onBack }) => {
  if (!patient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7faff]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
          No patient selected.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faff] p-6 text-slate-800">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={onBack}
          className="mb-6 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm"
        >
          ← Back to dashboard
        </button>

        <div className="rounded-[28px] border border-blue-100 bg-white p-6 shadow-sm">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Patient profile
              </p>
              <h1 className="mt-2 text-4xl font-bold text-slate-800">
                {patient.name}
              </h1>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                patient.risk === "High"
                  ? "bg-red-100 text-red-700"
                  : patient.risk === "Moderate"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {patient.risk} risk
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Age
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-800">
                {patient.age}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Gestation
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-800">
                {patient.gestationalWeek}w
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Status
              </div>
              <div className="mt-2 text-2xl font-bold text-slate-800">
                {patient.status}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Next visit
              </div>
              <div className="mt-2 text-lg font-bold text-slate-800">
                {patient.nextAppointment}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="mb-4 text-xl font-bold text-slate-800">Vitals</h2>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Blood pressure</span>
                  <strong>{patient.vitals.bloodPressure}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Heart rate</span>
                  <strong>{patient.vitals.heartRate}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Temperature</span>
                  <strong>{patient.vitals.temperature}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Oxygen saturation</span>
                  <strong>{patient.vitals.oxygen}</strong>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="mb-4 text-xl font-bold text-slate-800">
                Clinical summary
              </h2>
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <span className="font-semibold text-slate-800">
                    Condition:
                  </span>{" "}
                  {patient.condition}
                </div>
                <div>
                  <span className="font-semibold text-slate-800">
                    Last visit:
                  </span>{" "}
                  {patient.lastVisit}
                </div>
                <div>
                  <span className="font-semibold text-slate-800">
                    Next appointment:
                  </span>{" "}
                  {patient.nextAppointment}
                </div>
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-slate-700">
                  {patient.notes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patientinfo;
