export const patients = [
  {
    id: "PT-001",
    name: "Amara Okafor",
    age: 28,
    gestationalWeek: 24,
    risk: "Low",
    status: "Stable",
    vitals: {
      bloodPressure: "118/74",
      heartRate: "78 bpm",
      temperature: "36.8°C",
      oxygen: "98%",
    },
    lastVisit: "2 days ago",
    nextAppointment: "Today, 08:30 AM",
    condition: "Routine prenatal review",
    notes:
      "Patient reports good energy and no dizziness. Continue monitoring blood pressure and hydration.",
  },
  {
    id: "PT-002",
    name: "Grace Eze",
    age: 31,
    gestationalWeek: 18,
    risk: "Moderate",
    status: "Monitoring",
    vitals: {
      bloodPressure: "124/82",
      heartRate: "80 bpm",
      temperature: "36.7°C",
      oxygen: "97%",
    },
    lastVisit: "5 days ago",
    nextAppointment: "Today, 09:15 AM",
    condition: "Follow-up consultation",
    notes:
      "Needs attention to blood pressure trends and sleep routine. Continue weekly follow-up.",
  },
  {
    id: "PT-003",
    name: "Nneka Umeh",
    age: 34,
    gestationalWeek: 32,
    risk: "High",
    status: "Priority",
    vitals: {
      bloodPressure: "132/88",
      heartRate: "84 bpm",
      temperature: "37.1°C",
      oxygen: "97%",
    },
    lastVisit: "1 week ago",
    nextAppointment: "Today, 10:45 AM",
    condition: "High-risk pregnancy review",
    notes:
      "Symptoms require enhanced monitoring, dietary planning, and closer follow-up this week.",
  },
  {
    id: "PT-004",
    name: "Chioma Adebayo",
    age: 26,
    gestationalWeek: 27,
    risk: "Low",
    status: "Stable",
    vitals: {
      bloodPressure: "116/72",
      heartRate: "76 bpm",
      temperature: "36.9°C",
      oxygen: "99%",
    },
    lastVisit: "3 days ago",
    nextAppointment: "Today, 13:00 PM",
    condition: "New visit",
    notes:
      "No major issues reported. Continue routine prenatal checks and lifestyle guidance.",
  },
];

export const getPatients = () => patients.map((patient) => ({ ...patient }));

export const getPatientById = (patientId) => {
  return patients.find((patient) => patient.id === patientId);
};
