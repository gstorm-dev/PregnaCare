import React from 'react'
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom'
import Home from './Pages/Home/home'
import AuthPage from './Pages/Auth/auth'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/patient/login" element={<AuthPage mode="login" role="patient" />} />
        <Route path="/doctor/login" element={<AuthPage mode="login" role="doctor" />} />
        <Route path="/patient/signup" element={<AuthPage mode="signup" role="patient" />} />
        <Route path="/doctor/signup" element={<AuthPage mode="signup" role="doctor" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App