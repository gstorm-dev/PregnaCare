<<<<<<< Updated upstream
export const getAvailableDoctors = () => {
=======
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

const toDoctorCard = (doctor, index) => ({
  id: doctor.id || doctor.uid || doctor.email || `doctor-${index}`,
  name: doctor.name || "Dr. Unknown",
  specialty: doctor.specialty || "General Medicine",
  location: doctor.clinic || doctor.clinicName || "Clinic",
  experience: doctor.experience || "Available",
  rating: doctor.rating || (index % 2 === 0 ? 4.9 : 4.8),
  image: "/images/p1.jpg",
  nextSlot: doctor.nextSlot || "Available this week",
  email: doctor.email || "",
  phone: doctor.phone || doctor.contactInfo || "",
  clinic: doctor.clinic || doctor.clinicName || "",
});

const readLocalDoctors = () => {
>>>>>>> Stashed changes
  try {
    const storedDoctorUser = JSON.parse(
      localStorage.getItem("doctorUser") || "null",
    );
    const signedInDoctor = JSON.parse(
      sessionStorage.getItem("loggedInUser") || "null",
    );

    return [storedDoctorUser, signedInDoctor]
      .filter((doctor) => doctor && doctor.role === "doctor")
      .filter((doctor) => doctor.name || doctor.email || doctor.specialty)
<<<<<<< Updated upstream
      .map((doctor, index) => ({
        id: doctor.id || doctor.email || `doctor-${index}`,
        name: doctor.name || "Dr. Unknown",
        specialty: doctor.specialty || "General Medicine",
        location: doctor.clinic || doctor.clinicName || "Clinic",
        experience: doctor.experience || "Available",
        rating: doctor.rating || (index % 2 === 0 ? 4.9 : 4.8),
        image: "/images/p1.jpg",
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
=======
      .map(toDoctorCard)
      .filter(
        (doctor, index, doctors) =>
          doctors.findIndex(
            (item) => (item.email || item.name) === (doctor.email || doctor.name),
          ) === index,
      );
>>>>>>> Stashed changes
  } catch {
    return [];
  }
};
<<<<<<< Updated upstream
=======

const mergeDoctors = (remoteDoctors) => {
  const localDoctors = readLocalDoctors();
  const merged = [...remoteDoctors];

  localDoctors.forEach((doctor) => {
    const exists = merged.some(
      (item) => (item.email || item.name) === (doctor.email || doctor.name),
    );
    if (!exists) merged.push(doctor);
  });

  return merged;
};

export const getAvailableDoctors = () => readLocalDoctors();

export const subscribeToDoctors = (onChange) => {
  const doctorsQuery = query(
    collection(db, "users"),
    where("role", "==", "doctor"),
  );

  return onSnapshot(
    doctorsQuery,
    (snapshot) => {
      const remoteDoctors = snapshot.docs.map((docSnap, index) =>
        toDoctorCard({ id: docSnap.id, ...docSnap.data() }, index),
      );
      onChange(mergeDoctors(remoteDoctors));
    },
    () => onChange(readLocalDoctors()),
  );
};

export const useAvailableDoctors = () => {
  const [doctors, setDoctors] = useState(readLocalDoctors);

  useEffect(() => subscribeToDoctors(setDoctors), []);

  return doctors;
};
>>>>>>> Stashed changes
