src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── DoctorCard.jsx
│   ├── AppointmentCard.jsx
│   ├── PatientCard.jsx
│   ├── Notification.jsx
│   └── Modal.jsx
│
├── pages/
│
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── PatientRegister.jsx
│   │   └── DoctorRegister.jsx
│   │
│   ├── patient/
│   │   ├── PatientDashboard.jsx
│   │   ├── Doctors.jsx
│   │   ├── DoctorProfile.jsx
│   │   ├── BookAppointment.jsx
│   │   ├── Appointments.jsx
│   │   ├── MyDoctor.jsx
│   │   ├── MedicalTimeline.jsx
│   │   ├── Documents.jsx
│   │   ├── Notifications.jsx
│   │   └── Profile.jsx
│   │
│   ├── doctor/
│   │   ├── DoctorDashboard.jsx
│   │   ├── Patients.jsx
│   │   ├── PatientDetails.jsx
│   │   ├── Appointments.jsx
│   │   ├── Availability.jsx
│   │   ├── VisitNotes.jsx
│   │   ├── Notifications.jsx
│   │   └── Profile.jsx
│   │
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── DoctorVerification.jsx
│       ├── Doctors.jsx
│       ├── Patients.jsx
│       ├── Appointments.jsx
│       ├── Disputes.jsx
│       └── Reports.jsx
│
├── services/
│   ├── api.js
│   ├── auth.js
│   ├── doctors.js
│   ├── patients.js
│   ├── appointments.js
│   └── notifications.js
│
├── context/
│   └── AuthContext.jsx
│
├── utils/
│   ├── validation.js
│   └── pregnancy.js
│
├── App.jsx
├── main.jsx
└── index.css


┌─────────────────────────────────────────────┐
│ Good morning, Amara 👋                     │
│                                             │
│ Pregnancy: Week 24                          │
│ Due date: December 28                       │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Upcoming appointment                    │ │
│ │ Dr. Bello                              │ │
│ │ September 15 • 10:00 AM                │ │
│ │ [View Appointment]                     │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ My Doctor                                   │
│ Dr. Bello ✓ Verified                       │
│ [View Profile]                              │
│                                             │
│ [Book Appointment] [Medical Records]        │
└─────────────────────────────────────────────┘


Doctor Dashboard

Today's Appointments
─────────────────────
10:00  Amara
11:00  Sarah
12:30  Jane

Patients
─────────────────────
Due this week       8
Upcoming           24
Overdue             3

Quick Actions
[Availability]
[Patients]
[Appointments]



ADMIN DASHBOARD

Doctors
├── Verified
├── Pending verification
└── Rejected

Patients
└── Total patients

Appointments
├── Upcoming
├── Completed
├── Cancelled
└── No-show

Reports
└── Platform metrics

Disputes
└── Patient/Doctor reports


Do you already have a doctor?

       YES                    NO
        ↓                      ↓
Search doctor           Browse doctors
        ↓                      ↓
Select doctor           Filter doctors
        ↓                      ↓
Link request            View profile
        ↓                      ↓
Doctor accepts          Book appointment
        ↓
"My Doctor"



Components
Props
useState
useEffect
map()
Forms
Conditional rendering
React Router



Authentication
Role-based routing
API calls
Loading states
Error handling
Form validation
Search/filtering


React + Tailwind
       ↓
Node / Express
       ↓
Supabase / PostgreSQL

Doctor has:

10:00 AM ─ Available


10:00
├── Patient A ✅
└── Patient B ❌

PHASE 1
Project setup
       ↓
PHASE 2
Authentication
       ↓
PHASE 3
Patient onboarding
       ↓