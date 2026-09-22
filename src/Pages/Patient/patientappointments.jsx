import React, { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, Stethoscope, X } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  createAppointment,
  getConsultationRoomName,
  getAppointments,
  removeAppointment,
} from "../../Services/appointments";
import { getAvailableDoctors } from "../../Services/doctor";

const PatientAppointments = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [doctorOptions, setDoctorOptions] = useState(getAvailableDoctors());
  const [doctor, setDoctor] = useState(() => {
    const requestedDoctor = searchParams.get("doctor");
    const availableDoctors = getAvailableDoctors();
    const matchedDoctor = availableDoctors.find(
      (item) => String(item.email || item.id) === requestedDoctor,
    );
    return matchedDoctor?.name || availableDoctors[0]?.name || "";
  });
  const [date, setDate] = useState("2026-09-24");
  const [time, setTime] = useState("10:30 AM");
  const [appointments, setAppointments] = useState([]);
  const [booked, setBooked] = useState(false);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    try {
      setPatient(JSON.parse(sessionStorage.getItem("loggedInUser") || "null"));
    } catch {
      setPatient(null);
    }

    const syncAppointments = () => {
      const currentPatient = JSON.parse(
        sessionStorage.getItem("loggedInUser") || "null",
      );
      setAppointments(
        getAppointments().filter(
          (appointment) =>
            (currentPatient?.email &&
              appointment.patientEmail === currentPatient.email) ||
            (!currentPatient?.email &&
              appointment.patientName === (currentPatient?.name || "Jane Doe")),
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

    if (availableDoctors.length === 0) {
      return;
    }

    const requestedDoctor = searchParams.get("doctor");
    const matchedDoctor = availableDoctors.find(
      (item) => String(item.email || item.id) === requestedDoctor,
    );

    if (matchedDoctor) {
      setDoctor(matchedDoctor.name);
      return;
    }

    setDoctor((current) => {
      if (availableDoctors.some((item) => item.name === current)) {
        return current;
      }
      return availableDoctors[0]?.name || "";
    });
  }, [searchParams]);

  const handleBooking = (event) => {
    event.preventDefault();
    const requestedAt = new Date().toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });
    const selectedDoctor = doctorOptions.find((item) => item.name === doctor);

    if (!selectedDoctor?.email) {
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
      doctorName: selectedDoctor?.name || doctor,
      doctorEmail: selectedDoctor?.email || "",
      doctorPhone: selectedDoctor?.phone || selectedDoctor?.contactInfo || "",
      doctorClinic: selectedDoctor?.clinic || selectedDoctor?.location || "",
      doctorSpecialty: selectedDoctor?.specialty || "",
      reason: "Prenatal check-up",
      date: `${date} · ${time}`,
      scheduledAt: `${date}T${time === "10:30 AM" ? "10:30" : time === "2:00 PM" ? "14:00" : "16:30"}:00`,
      requestedAt,
      status: "Pending",
    });
    setBooked(true);
  };

  const cancelAppointment = (appointmentId) => removeAppointment(appointmentId);

  return (
    <PatientPage eyebrow="Care calendar" title="Your appointments">
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
                Your requests
              </p>
              <h2 className="mt-2 font-serif text-2xl">Appointments</h2>
            </div>
            <span className="rounded-full bg-[#fff0ea] px-3 py-1 text-xs font-semibold text-[#b66d58]">
              {appointments.length} total
            </span>
          </div>
          {appointments.length === 0 ? (
            <p className="mt-8 text-sm text-[#69736f]">
              You have no appointment requests yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-xl bg-[#fffdfb] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{appointment.reason}</p>
                      <p className="mt-1 text-sm text-[#69736f]">
                        With {appointment.doctorName}
                      </p>
                      <p className="mt-1 text-sm text-[#69736f]">
                        {appointment.date}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${appointment.status === "Accepted" ? "bg-[#edf3ef] text-[#6f9387]" : "bg-[#fff0ea] text-[#b66d58]"}`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => cancelAppointment(appointment.id)}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#fff0ea] px-4 py-2 text-sm font-semibold text-[#b66d58] transition hover:bg-[#f9ddd3]"
                  >
                    <X size={15} /> Cancel appointment
                  </button>
                  {appointment.status === "Accepted" && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/consultation/${getConsultationRoomName(appointment)}?appointment=${encodeURIComponent(appointment.id)}`,
                        )
                      }
                      className="mt-4 ml-2 inline-flex items-center gap-2 rounded-xl bg-[#26322e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3b4944]"
                    >
                      Open care chat
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="rounded-2xl border border-[#eadfd9] bg-white p-6 shadow-[0_10px_30px_rgba(125,79,62,.05)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0ea] text-[#c87861]">
              <CalendarDays size={21} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#c87861]">
                Live booking
              </p>
              <h2 className="font-serif text-2xl">Book a visit</h2>
            </div>
          </div>
          {doctorOptions.length === 0 ? (
            <p className="mt-8 rounded-xl bg-[#fff8f4] p-5 text-sm text-[#69736f]">
              No doctors are available yet. A doctor must sign in before you can request an appointment.
            </p>
          ) : booked ? (
            <div className="mt-8 rounded-xl bg-[#edf3ef] p-5 text-center">
              <CheckCircle2 className="mx-auto text-[#6f9387]" size={30} />
              <p className="mt-3 font-semibold">Request sent successfully</p>
              <p className="mt-1 text-sm text-[#69736f]">
                {doctor} will review your request shortly.
              </p>
              <button
                type="button"
                onClick={() => setBooked(false)}
                className="mt-4 text-sm font-semibold text-[#c87861]"
              >
                Book another visit
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="mt-6 space-y-4">
              <label className="block text-sm font-semibold">
                Doctor
                <select
                  value={doctor}
                  onChange={(event) => setDoctor(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
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
                    className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Time
                  <select
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 font-normal outline-none focus:border-[#d98268]"
                  >
                    <option>10:30 AM</option>
                    <option>2:00 PM</option>
                    <option>4:30 PM</option>
                  </select>
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d98268] px-5 py-3 font-semibold text-white hover:bg-[#c66f57]"
              >
                Request appointment <Stethoscope size={17} />
              </button>
            </form>
          )}
        </section>
      </div>
      <Link
        to="/patient/doctors"
        className="mt-6 inline-flex text-sm font-semibold text-[#c87861]"
      >
        Find another doctor
      </Link>
    </PatientPage>
  );
};

const PatientPage = ({ eyebrow, title, children }) => (
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
        {eyebrow}
      </p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{title}</h1>
      {children}
    </main>
  </div>
);

export default PatientAppointments;
