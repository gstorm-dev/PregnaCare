import React, { useMemo, useState } from "react";
import { CalendarDays, ChevronRight, Search, Star, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const mockDoctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Obstetrician & Gynecologist", location: "Lagos Women's Centre", experience: "12 years", rating: "4.9", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=85", nextSlot: "Thu, 10:30 AM" },
  { id: 2, name: "Dr. Emily Williams", specialty: "Maternal-Fetal Medicine", location: "Bloom Women's Clinic", experience: "10 years", rating: "4.8", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=85", nextSlot: "Fri, 2:00 PM" },
  { id: 3, name: "Dr. Michael Brown", specialty: "Obstetrician", location: "Harbour Health", experience: "8 years", rating: "4.7", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=85", nextSlot: "Mon, 9:00 AM" },
  { id: 4, name: "Dr. Amina Bello", specialty: "Midwife & Women's Health", location: "New Dawn Maternity", experience: "9 years", rating: "4.9", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=85", nextSlot: "Tue, 11:30 AM" },
];

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("All specialties");
  const specialties = ["All specialties", ...new Set(mockDoctors.map((doctor) => doctor.specialty))];
  const filteredDoctors = useMemo(() => mockDoctors.filter((doctor) => {
    const matchesQuery = `${doctor.name} ${doctor.specialty} ${doctor.location}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (specialty === "All specialties" || doctor.specialty === specialty);
  }), [query, specialty]);

  return (
    <PatientPage title="Find your care team" eyebrow="My doctors">
      <div className="rounded-2xl border border-[#eadfd9] bg-white p-5 shadow-[0_10px_30px_rgba(125,79,62,.05)] sm:p-6">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="relative block flex-1"><span className="sr-only">Search doctors</span><Search size={18} className="absolute left-4 top-3.5 text-[#9aa09c]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by doctor, specialty, or clinic" className="w-full rounded-xl border border-[#e9e2dc] bg-[#fffdfb] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#d98268]" /></label>
          <select value={specialty} onChange={(event) => setSpecialty(event.target.value)} className="rounded-xl border border-[#e9e2dc] bg-[#fffdfb] px-4 py-3 text-sm text-[#3b4944] outline-none focus:border-[#d98268]">{specialties.map((item) => <option key={item}>{item}</option>)}</select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between"><p className="text-sm text-[#69736f]">{filteredDoctors.length} doctors available</p><span className="text-xs font-semibold uppercase tracking-wider text-[#c87861]">Verified care team</span></div>
      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        {filteredDoctors.map((doctor) => <article key={doctor.id} className="group flex flex-col overflow-hidden rounded-4xl border border-[#eadfd9] bg-white shadow-[0_10px_30px_rgba(125,79,62,.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(125,79,62,.12)] sm:flex-row"><div className="relative h-56 shrink-0 overflow-hidden sm:h-auto sm:w-40"><img src={doctor.image} alt={doctor.name} className="h-full min-h-56 w-full object-cover object-top transition duration-500 group-hover:scale-105" /><div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#3b4944] shadow"><Star size={13} fill="currentColor" className="text-[#b38336]" />{doctor.rating}</div></div><div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6"><div><h2 className="font-serif text-2xl">{doctor.name}</h2><p className="mt-1 font-semibold text-[#c87861]">{doctor.specialty}</p><p className="mt-3 text-sm text-[#69736f]">{doctor.location} · {doctor.experience}</p></div><div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-[#f0e8e3] pt-4"><p className="text-xs text-[#69736f]">Next slot<br /><span className="font-semibold text-[#3b4944]">{doctor.nextSlot}</span></p><Link to={`/patient/appointments?doctor=${doctor.id}`} className="inline-flex items-center gap-1 rounded-xl bg-[#d98268] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#c66f57]">Book visit <ChevronRight size={15} /></Link></div></div></article>)}
      </div>
      {filteredDoctors.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-[#e7b4a3] bg-[#fff3ef] p-10 text-center"><Stethoscope className="mx-auto text-[#c87861]" /><p className="mt-3 font-serif text-xl">No doctors found</p><p className="mt-2 text-sm text-[#69736f]">Try a different name or specialty.</p></div>}
    </PatientPage>
  );
};

const PatientPage = ({ eyebrow, title, children }) => <div className="min-h-screen bg-[#f8f6f3] text-[#26322e]"><header className="border-b border-[#e9e2dc] bg-[#fffdfb] px-5 py-5 sm:px-8"><div className="mx-auto flex max-w-6xl items-center justify-between"><Link to="/patient" className="font-serif text-2xl font-bold">Pregna<span className="text-[#c87861]">Care</span></Link><Link to="/patient" className="text-sm font-semibold text-[#c87861]">Back to dashboard</Link></div></header><main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12"><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#c87861]">{eyebrow}</p><h1 className="mt-2 font-serif text-4xl sm:text-5xl">{title}</h1>{children}</main></div>;

export default Doctors;