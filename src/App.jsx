<<<<<<< Updated upstream
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
=======
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { auth } from "./firebase";
import { ensureSession } from "./Services/auth";
>>>>>>> Stashed changes
import Home from "./Pages/Home/home";
import AuthPage from "./Pages/Auth/auth";
import PatientDashboard from "./Pages/Patient/patientdashboard";
import PatientAppointments from "./Pages/Patient/patientappointments";
import PatientProfile from "./Pages/Patient/patientprofile";
import PatientDoctors from "./Pages/Patient/doctors";
import Doctordashboard from "./Pages/Doctor/doctordashboard";
import Consultation from "./Pages/Consultation/consultation";

const App = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      try {
        if (user) await ensureSession(user);
      } finally {
        setReady(true);
      }
    });
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Loading PregnaCare...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/patient/login" element={<AuthPage mode="login" role="patient" />} />
        <Route path="/doctor/login" element={<AuthPage mode="login" role="doctor" />} />
        <Route path="/patient/signup" element={<AuthPage mode="signup" role="patient" />} />
        <Route path="/doctor/signup" element={<AuthPage mode="signup" role="doctor" />} />
        
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/doctors" element={<PatientDoctors />} />
        <Route path="/doctor" element={<Doctordashboard />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/consultation/:roomName" element={<Consultation />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
