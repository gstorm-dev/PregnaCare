import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <main className="min-h-screen mt-10 bg-white text-slate-800">
     

      <section className="mx-auto grid w-[90%] max-w-6xl gap-8 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Pregnancy support made simpler
          </p>
          <h1 className="text-4xl font-bold leading-tight text-slate-800 md:text-5xl">
            Better care for every stage of motherhood.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            PregnaCare helps patients, doctors, and administrators connect in one simple
            digital space for appointments, care tracking, and communication.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button type="button" className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Book a visit
            </button>
            <button type="button" className="rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">
              Learn more
            </button>
          </div>
        </div>

        <div
          className="flex min-h-[330px] items-end rounded-3xl border border-blue-100 bg-cover bg-center p-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15, 23, 42, 0.28), rgba(15, 23, 42, 0.25)), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80')",
          }}
        >
          <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/85 p-5 shadow-sm">
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Care plan
            </span>
            <h3 className="mt-4 text-xl font-semibold text-slate-800">Personalized support</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>Appointments</li>
              <li>Doctor updates</li>
              <li>Health timeline</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto mt-16 w-[90%] max-w-6xl scroll-mt-28">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            About the platform
          </p>
          <h2 className="text-3xl font-bold text-slate-800">What PregnaCare does</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold text-slate-800">For patients</h3>
            <p className="leading-7 text-slate-600">
              Patients can book appointments, view doctor information, keep track of care,
              and stay informed throughout pregnancy.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold text-slate-800">For doctors</h3>
            <p className="leading-7 text-slate-600">
              Doctors can manage availability, review patient records, update visit notes,
              and coordinate care in one organized dashboard.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-xl font-semibold text-slate-800">For administrators</h3>
            <p className="leading-7 text-slate-600">
              Admins can oversee doctors, patients, appointments, and reports to keep the
              system running smoothly and efficiently.
            </p>
          </article>
        </div>
      </section>

      <section id="services" className="mx-auto mt-16 w-[90%] max-w-6xl scroll-mt-28">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            Our services
          </p>
          <h2 className="text-3xl font-bold text-slate-800">
            Practical support for every care journey
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            From your first appointment to ongoing care coordination, PregnaCare keeps the
            details organized and the right people connected.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="text-2xl text-blue-700">01</p>
            <h3 className="mt-5 text-xl font-semibold text-slate-800">Find trusted doctors</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Browse available healthcare professionals and choose care that fits your needs.
            </p>
          </article>

          <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <p className="text-2xl text-blue-700">02</p>
            <h3 className="mt-5 text-xl font-semibold text-slate-800">Manage appointments</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Book, review, and keep track of your upcoming visits in one simple space.
            </p>
          </article>

          <article className="rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="text-2xl text-green-700">03</p>
            <h3 className="mt-5 text-xl font-semibold text-slate-800">Coordinate better care</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Keep patients, doctors, and administrators aligned throughout the journey.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto mt-16 w-[90%] max-w-6xl rounded-3xl border border-green-100 bg-green-50 p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
              Why it matters
            </p>
            <h2 className="text-3xl font-bold text-slate-800">Simple access to trusted care.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              PregnaCare is designed to make maternal healthcare more organized, accessible,
              and reassuring for everyone involved. It brings essential communication and care
              tools into a single platform.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-green-200 bg-white px-4 py-3 font-medium text-slate-700">
              Easy appointment booking
            </div>
            <div className="rounded-2xl border border-green-200 bg-white px-4 py-3 font-medium text-slate-700">
              Clear patient communication
            </div>
            <div className="rounded-2xl border border-green-200 bg-white px-4 py-3 font-medium text-slate-700">
              Better care coordination
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>

    </div>
  );
};

export default Home;