export const appointmentRows = [];

export const APPOINTMENTS_STORAGE_KEY = "pregnacare:appointments";

export const getChatStorageKey = (appointmentId) =>
  `pregnacare:chat:${appointmentId}`;

export const getChatMessages = (appointmentId) => {
  try {
    const messages = JSON.parse(
      localStorage.getItem(getChatStorageKey(appointmentId)) || "[]",
    );
    return Array.isArray(messages) ? messages : [];
  } catch {
    return [];
  }
};

export const getUserNotifications = (user, role) => {
  if (!user?.email) return [];

  return readAppointments()
    .filter((appointment) =>
      role === "doctor"
        ? appointment.doctorEmail === user.email
        : appointment.patientEmail === user.email,
    )
    .flatMap((appointment) => {
      const notifications = [];
      const messages = getChatMessages(appointment.id);
      const latestMessage = messages[messages.length - 1];

      if (role === "doctor" && appointment.status === "Pending") {
        notifications.push({
          id: `${appointment.id}-request`,
          title: "New appointment request",
          text: `${appointment.patientName} requested an appointment.`,
          appointment,
          type: "request",
        });
      }

      if (role === "patient" && appointment.status === "Accepted") {
        notifications.push({
          id: `${appointment.id}-accepted`,
          title: "Appointment approved",
          text: `${appointment.doctorName} accepted your appointment.`,
          appointment,
          type: "accepted",
        });
      }

      if (appointment.consultationStarted && role === "patient") {
        notifications.push({
          id: `${appointment.id}-started`,
          title: "Care chat is ready",
          text: `Open your chat with ${appointment.doctorName}.`,
          appointment,
          type: "chat",
        });
      }

      if (latestMessage && latestMessage.senderRole !== role) {
        notifications.push({
          id: `${appointment.id}-${latestMessage.id}`,
          title: "New chat reply",
          text: `${latestMessage.sender}: ${latestMessage.text}`,
          appointment,
          type: "chat",
        });
      }

      return notifications;
    });
};

export const saveChatMessages = (appointmentId, messages) => {
  localStorage.setItem(getChatStorageKey(appointmentId), JSON.stringify(messages));
  window.dispatchEvent(new CustomEvent("pregnacare:chat-updated"));
};

export const getConsultationRoomName = (appointment) => {
  const patientName = (appointment.patientName || "patient")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  return `pregnacare-${appointment.id}-${patientName}`;
};

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
