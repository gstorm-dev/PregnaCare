export const appointmentRows = [
  {
    name: "Ariana Pear",
    age: 32,
    doctor: "Dr. Connor",
    department: "Cardiology",
    date: "18 Aug",
    time: "9:00 AM",
    disease: "Severe Fever",
    status: "In Room",
  },
  {
    name: "Mila Johnson",
    age: 26,
    doctor: "Dr. Tom",
    department: "Pediatric",
    date: "18 Aug",
    time: "10:00 AM",
    disease: "Eye Infection",
    status: "Ready",
  },
  {
    name: "Ariana Pear",
    age: 32,
    doctor: "Dr. Connor",
    department: "Cardiology",
    date: "18 Aug",
    time: "9:00 AM",
    disease: "Severe Fever",
    status: "In Room",
  },
  {
    name: "Mila Johnson",
    age: 26,
    doctor: "Dr. Tom",
    department: "Pediatric",
    date: "18 Aug",
    time: "10:00 AM",
    disease: "Eye Infection",
    status: "Ready",
  },
];

export const APPOINTMENTS_STORAGE_KEY = "pregnacare:appointments";

const readAppointments = () => {
  try {
    const appointments = JSON.parse(
      localStorage.getItem(APPOINTMENTS_STORAGE_KEY) || "[]",
    );
    return Array.isArray(appointments) ? appointments : [];
  } catch {
    return [];
  }
};

export const getAppointments = () => readAppointments();

export const saveAppointments = (appointments) => {
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  window.dispatchEvent(new CustomEvent("pregnacare:appointments-updated"));
};

export const createAppointment = (appointment) => {
  const appointments = readAppointments();
  const nextAppointment = {
    ...appointment,
    id: appointment.id || `appointment-${Date.now()}`,
  };
  saveAppointments([...appointments, nextAppointment]);
  return nextAppointment;
};

export const updateAppointment = (appointmentId, updates) => {
  const appointments = readAppointments().map((appointment) =>
    appointment.id === appointmentId
      ? { ...appointment, ...updates }
      : appointment,
  );
  saveAppointments(appointments);
  return appointments;
};

export const removeAppointment = (appointmentId) => {
  const appointments = readAppointments().filter(
    (appointment) => appointment.id !== appointmentId,
  );
  saveAppointments(appointments);
  return appointments;
};
