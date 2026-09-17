import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  ShieldCheck,
  Star,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const Home = () => {
  const services = [
    {
      number: "01",
      title: "Find the Right Doctor",
      text: "Connect with qualified healthcare professionals who understand your pregnancy needs.",
      icon: Stethoscope,
    },
    {
      number: "02",
      title: "Book Appointments",
      text: "Schedule and manage appointments easily without the stress of endless phone calls.",
      icon: CalendarDays,
    },
    {
      number: "03",
      title: "Track Your Journey",
      text: "Keep your pregnancy milestones, appointments and care information organized.",
      icon: HeartPulse,
    },
  ];

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Obstetrician & Gynecologist",
      experience: "12 years experience",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Dr. Emily Williams",
      specialty: "Maternal-Fetal Medicine",
      experience: "10 years experience",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Dr. Michael Brown",
      specialty: "Obstetrician",
      experience: "8 years experience",
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80",
    },
  ];

  const articles = [
    {
      category: "Pregnancy",
      title: "Understanding Your Pregnancy Journey",
      text: "Learn what to expect as your pregnancy progresses from one stage to the next.",
      image:
        "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&w=900&q=80",
    },
    {
      category: "Wellness",
      title: "Taking Better Care of Yourself",
      text: "Simple and practical ways to support your physical and emotional wellbeing.",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
    },
    {
      category: "Healthcare",
      title: "Why Regular Checkups Matter",
      text: "Discover why consistent prenatal care is an important part of pregnancy.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const testimonials = [
    {
      text: "PregnaCare made it much easier for me to keep track of my appointments and find the right doctor.",
      name: "Amara E.",
      role: "PregnaCare Patient",
    },
    {
      text: "Having my pregnancy information organized in one place gave me peace of mind throughout my journey.",
      name: "Jessica M.",
      role: "PregnaCare Patient",
    },
    {
      text: "The platform makes connecting patients with the right healthcare professionals much simpler.",
      name: "Daniel O.",
      role: "Healthcare Professional",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffdfb] text-[#26322e]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#fff3ef]">

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:min-h-175 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            

            <h1 className="font-serif text-4xl leading-[1.02] tracking-tight text-[#26322e] sm:text-5xl md:text-6xl lg:text-7xl">
              Pregnancy care,
              <span className="block text-[#c87861]">
                made simpler.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#69736f] sm:text-lg sm:leading-8">
              PregnaCare brings expectant mothers and healthcare professionals
              together in one simple, supportive platform designed for every
              stage of pregnancy.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/patient/signup"
                className="inline-flex items-center justify-center gap-2 bg-[#d98268] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_25px_rgba(217,130,104,.28)] transition hover:-translate-y-1 hover:bg-[#c66f57] sm:px-7"
              >
                Start Your Journey
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/#services"
                className="inline-flex items-center justify-center gap-2 border border-[#d8c6bf] bg-white px-6 py-3.5 text-sm font-bold text-[#3b4944] transition hover:-translate-y-1 hover:border-[#d98268] hover:text-[#c87861] sm:px-7"
              >
                Find a Doctor
                <Stethoscope size={17} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-200 pt-7">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  alt="Patient"
                />
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  alt="Patient"
                />
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                  alt="Patient"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-amber-400">
                    <Star size={15} fill="currentColor" />
                    <Star size={15} fill="currentColor" />
                    <Star size={15} fill="currentColor" />
                    <Star size={15} fill="currentColor" />
                    <Star size={15} fill="currentColor" />
                  </div>

                  <span className="text-sm font-bold text-slate-800">
                    4.9/5
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Trusted by our growing community
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative overflow-hidden rounded-4xl border border-white bg-white p-2 shadow-[0_24px_70px_rgba(54,45,39,.18)] sm:p-3">
              <img
                src="images/p3.jpg"
                alt="Mother receiving pregnancy care"
                className="h-97.5 w-full rounded-3xl object-cover transition duration-700 hover:scale-[1.02] sm:h-125 lg:h-142.5"
              />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-8 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff0ea] text-[#c87861]">
                      <HeartPulse size={21} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        Your pregnancy journey
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-slate-900">
                        You're doing great!
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-[#c87861]">68%</p>
                    <p className="text-[11px] text-slate-500">Progress</p>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[68%] rounded-full bg-blue-700"></div>
                </div>
              </div>
            </div>


            <div className="absolute -right-4 bottom-20 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block lg:-right-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <p className="text-[11px] text-slate-500">Care focused</p>
                  <p className="text-sm font-bold text-slate-900">On you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STATS */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          <div className="border-b border-slate-100 px-5 py-7 text-center md:border-b-0 md:border-r">
            <p className="text-2xl font-bold text-blue-700 sm:text-3xl">
              10K+
            </p>
            <p className="mt-1 text-sm text-slate-500">Patients supported</p>
          </div>

          <div className="border-b border-slate-100 px-5 py-7 text-center md:border-b-0 md:border-r">
            <p className="text-2xl font-bold text-blue-700 sm:text-3xl">
              500+
            </p>
            <p className="mt-1 text-sm text-slate-500">Healthcare professionals</p>
          </div>

          <div className="border-r border-slate-100 px-5 py-7 text-center">
            <p className="text-2xl font-bold text-emerald-600 sm:text-3xl">
              24/7
            </p>
            <p className="mt-1 text-sm text-slate-500">Access to information</p>
          </div>

          <div className="px-5 py-7 text-center">
            <p className="text-2xl font-bold text-blue-700 sm:text-3xl">
              98%
            </p>
            <p className="mt-1 text-sm text-slate-500">Patient satisfaction</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-24 px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <img
                src="images/p4.jpg"
                alt="Mother and baby"
                className="mt-10 h-64 w-full rounded-3xl object-cover shadow-lg sm:mt-16 sm:h-80"
              />

              <img
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=700&q=80"
                alt="Mother receiving support"
                className="h-72 w-full rounded-3xl object-cover shadow-lg sm:h-96"
              />
            </div>

            <div className="absolute bottom-4 left-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:bottom-6 sm:left-6 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <HeartPulse size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Built around</p>
                  <p className="text-sm font-bold text-slate-900">
                    Mother & baby care
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              About PregnaCare
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl md:text-5xl">
              Because pregnancy care should feel
              <span className="text-blue-700"> less complicated.</span>
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Finding reliable care, remembering appointments and knowing where
              to turn for support can make pregnancy feel overwhelming.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              PregnaCare brings these experiences together so patients can
              focus on what matters most — taking care of themselves and their
              growing families.
            </p>

            <div className="mt-7 space-y-4">
              {[
                "Connect with healthcare professionals",
                "Manage your pregnancy appointments",
                "Access useful pregnancy resources",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={21}
                    className="shrink-0 text-emerald-600"
                  />

                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/#about"
              className="mt-8 inline-flex items-center gap-2 font-bold text-blue-700 transition hover:gap-3"
            >
              Discover PregnaCare
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-24 bg-slate-50 px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                What we offer
              </p>

              <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl md:text-5xl">
                Everything you need,
                <span className="text-blue-700"> in one place.</span>
              </h2>
            </div>

            <p className="max-w-md leading-7 text-slate-500">
              Simple tools designed to make pregnancy care easier for patients
              and healthcare professionals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.number}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon size={25} />
                    </div>

                    <span className="text-sm font-bold text-slate-300">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-950 sm:text-2xl">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {service.text}
                  </p>

                  <Link
                    to="/patient/signup"
                    className="mt-7 inline-flex items-center gap-2 font-bold text-blue-700"
                  >
                    Learn more
                    <ChevronRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Our healthcare professionals
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl md:text-5xl">
              Meet doctors you can trust
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Find experienced healthcare professionals ready to support your
              pregnancy journey.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.name}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-slate-900 shadow">
                    <Star size={14} fill="currentColor" className="text-amber-400" />
                    {doctor.rating}
                  </div>

                  <div className="absolute bottom-4 left-4 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">
                    Available
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-950">
                    {doctor.name}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-blue-700">
                    {doctor.specialty}
                  </p>

                  <p className="mt-3 text-sm text-slate-500">
                    {doctor.experience}
                  </p>

                  <Link
                    to="/#services"
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-50 py-3 text-sm font-bold text-slate-800 transition hover:bg-blue-700 hover:text-white"
                  >
                    View Profile
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 font-bold text-blue-700 transition hover:gap-3"
            >
              View all doctors
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-blue-950 px-5 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              Your care journey,
              <span className="text-emerald-300"> simplified.</span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-blue-100">
              From creating your account to managing your care, PregnaCare
              keeps your journey simple and organized.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Create your account",
                text: "Sign up and create your personal PregnaCare profile.",
              },
              {
                number: "02",
                title: "Find your care",
                text: "Discover doctors and services that match your needs.",
              },
              {
                number: "03",
                title: "Stay connected",
                text: "Manage appointments and stay organized throughout your journey.",
              },
            ].map((step) => (
              <div key={step.number}>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-bold text-emerald-300">
                    {step.number}
                  </span>

                  <div className="h-px flex-1 bg-white/10"></div>
                </div>

                <h3 className="mt-7 text-xl font-bold sm:text-2xl">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-blue-100">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                Knowledge & support
              </p>

              <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl md:text-5xl">
                Learn. Prepare. Feel confident.
              </h2>
            </div>

            <Link
              to="/#services"
              className="inline-flex items-center gap-2 font-bold text-blue-700"
            >
              Explore resources
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-sm font-bold text-emerald-600">
                    {article.category}
                  </p>

                  <h3 className="mt-3 text-xl font-bold text-slate-950">
                    {article.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {article.text}
                  </p>

                  <button className="mt-6 inline-flex items-center gap-2 font-bold text-blue-700">
                    Read article
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-50 px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Real experiences
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl md:text-5xl">
              Care that feels more connected.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
              >
                <div className="flex gap-1 text-amber-400">
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                  <Star size={15} fill="currentColor" />
                </div>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  “{testimonial.text}”
                </p>

                <div className="mt-7 border-t border-slate-100 pt-5">
                  <p className="font-bold text-slate-950">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-[#c87861] px-6 py-16 text-center shadow-[0_24px_60px_rgba(125,79,62,.18)] sm:px-10 md:rounded-5xl md:px-16 md:py-20">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#f2c8b8]/25 blur-3xl"></div>

          <div className="relative">
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#ffe1d7]">
              <HeartPulse size={15} />
              Your journey starts here
            </div>

            <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Better pregnancy care is just a few clicks away.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#fff0ea]">
              Create your PregnaCare account and take the first step toward a
              more organized and connected pregnancy journey.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/patient/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-[#b66d58] transition hover:bg-[#fff0ea]"
              >
                Create Patient Account
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/doctor/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white hover:text-[#b66d58]"
              >
                Join as a Doctor
                <Stethoscope size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;