export let doctorProfile = {
  id: "DOC-001",
  name: "Dr. Bello",
  specialty: "Obstetrician",
  initials: "DB",
  email: "dr.bello@pregnacare.com",
  phone: "+234 800 000 0000",
  contactInfo: "+234 800 000 0000",
  clinic: "PregnaCare Clinic",
  location: "Lagos, Nigeria",
  availability: "Available today",
  nextSession: "Today, 08:30 AM",
  status: "On duty",
};

export const doctors = [];

const defaultDoctorImages = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=700&q=85",
];

export const getAvailableDoctors = () => {
  try {
    const storedDoctorUser = JSON.parse(
      localStorage.getItem("doctorUser") || "null",
    );
    const signedInDoctor = JSON.parse(
      localStorage.getItem("loggedInUser") || "null",
    );

    const submittedDoctors = [
      ...(storedDoctorUser && storedDoctorUser.role === "doctor"
        ? [storedDoctorUser]
        : []),
      ...(signedInDoctor && signedInDoctor.role === "doctor"
        ? [signedInDoctor]
        : []),
    ]
      .filter(Boolean)
      .filter((doctor) => doctor.name || doctor.email || doctor.specialty)
      .map((doctor, index) => ({
        id: doctor.id || doctor.email || `doctor-${index}`,
        name: doctor.name || "Dr. Unknown",
        specialty: doctor.specialty || "General Medicine",
        location: doctor.clinic || doctor.clinicName || "Clinic",
        experience: doctor.experience || "Available",
        rating: doctor.rating || (index % 2 === 0 ? 4.9 : 4.8),
        image: doctor.image || defaultDoctorImages[index % defaultDoctorImages.length],
        nextSlot: doctor.nextSlot || "Available this week",
        email: doctor.email || "",
        phone: doctor.phone || doctor.contactInfo || "",
        clinic: doctor.clinic || doctor.clinicName || "",
      }));

    const uniqueDoctors = Array.from(
      new Map(
        submittedDoctors.map((doctor) => [doctor.email || doctor.name, doctor]),
      ).values(),
    );

    if (uniqueDoctors.length > 0) {
      return uniqueDoctors;
    }
  } catch {
    // fallback below
  }

  return [];
};

export let doctorAvailability = [
  {
    day: "Today",
    date: "14 Sep",
    slots: ["08:30 AM", "09:15 AM", "10:45 AM", "13:00 PM"],
  },
  {
    day: "Tomorrow",
    date: "15 Sep",
    slots: ["09:00 AM", "11:00 AM", "12:30 PM"],
  },
  {
    day: "Wednesday",
    date: "16 Sep",
    slots: ["08:00 AM", "10:30 AM", "14:00 PM"],
  },
];

export const doctorDashboardData = {
  schedule: [
    {
      time: "08:30",
      patient: "Amara Okafor",
      week: "24w",
      status: "Check-in",
      tone: "bg-blue-100 text-blue-700",
    },
    {
      time: "09:15",
      patient: "Grace Eze",
      week: "18w",
      status: "Follow-up",
      tone: "bg-amber-100 text-amber-700",
    },
    {
      time: "10:45",
      patient: "Nneka Umeh",
      week: "32w",
      status: "Review",
      tone: "bg-emerald-100 text-emerald-700",
    },
    {
      time: "13:00",
      patient: "Chioma Adebayo",
      week: "27w",
      status: "New visit",
      tone: "bg-purple-100 text-purple-700",
    },
  ],
  tasks: [
    {
      title: "Review blood test results",
      tag: "High priority",
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Confirm follow-up for Grace Eze",
      tag: "Today",
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Send ultrasound summary to Nneka",
      tag: "Inbox",
      color: "bg-blue-100 text-blue-700",
    },
  ],
  patientOverview: [
    {
      name: "Amara Okafor",
      week: 24,
      risk: "Low",
      vitals: "BP 118/74",
      last: "2 days ago",
      next: "Today 08:30",
    },
    {
      name: "Grace Eze",
      week: 18,
      risk: "Moderate",
      vitals: "BP 124/82",
      last: "5 days ago",
      next: "Today 09:15",
    },
    {
      name: "Nneka Umeh",
      week: 32,
      risk: "High",
      vitals: "BP 132/88",
      last: "1 week ago",
      next: "Today 10:45",
    },
    {
      name: "Chioma Adebayo",
      week: 27,
      risk: "Low",
      vitals: "BP 116/72",
      last: "3 days ago",
      next: "Today 13:00",
    },
  ],
  quickStats: [
    {
      label: "Patients today",
      value: "24",
      accent: "bg-blue-100 text-blue-700",
    },
    { label: "High risk", value: "06", accent: "bg-amber-100 text-amber-700" },
    {
      label: "Follow-ups",
      value: "12",
      accent: "bg-emerald-100 text-emerald-700",
    },
  ],
};

export const getDoctorInformation = () => ({ ...doctorProfile });

export const getDoctors = () => doctors.map((doctor) => ({ ...doctor }));

export const getDoctorAvailability = () =>
  doctorAvailability.map((slot) => ({ ...slot, slots: [...slot.slots] }));

export const updateDoctorProfile = (updates = {}) => {
  doctorProfile = { ...doctorProfile, ...updates };
  return { ...doctorProfile };
};

export const availableDoctors = getDoctors();
export const upcomingSurgeries = [
  {
    patient: "Amelia Brukin",
    specialty: "Neurologist",
    time: "2:30 PM",
    date: "23",
    tone: "bg-emerald-500",
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    patient: "Bhtson Cozei",
    specialty: "Surgen",
    time: "5:00 PM",
    date: "25",
    tone: "bg-green-500",
    accent: "bg-emerald-100 text-emerald-700",
  },
];

export const dashboardStats = [
  {
    label: "Appointments",
    value: 9,
    icon: "◔",
    color: "bg-blue-200 text-blue-800",
  },
  {
    label: "Surgeries",
    value: 3,
    icon: "✚",
    color: "bg-emerald-200 text-emerald-800",
  },
];

export const doctorSidebarItems = [
  "Hospital Dashboard",
  "Medical Dashboard",
  "Dentist Dashboard",
  "Doctors",
  "Patients",
  "Staff",
  "Appointments",
  "Departments",
  "Accounts",
  "Human Resources",
  "Salaries",
];

export const activityBars = [5, 7, 9, 6, 8, 4, 5];
