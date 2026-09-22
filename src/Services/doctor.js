export const getAvailableDoctors = () => {
  try {
    const storedDoctorUser = JSON.parse(
      localStorage.getItem("doctorUser") || "null",
    );
    const signedInDoctor = JSON.parse(
      sessionStorage.getItem("loggedInUser") || "null",
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
  } catch {
    // fallback below
  }

  return [];
};
