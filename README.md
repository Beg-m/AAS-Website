#  AUTOMATIC ATTENDANCE SYSTEM — Web Interface  
AI-powered attendance tracking system using Face Recognition, Python, React, and PostgreSQL.

This project provides the **frontend interface** for the Automatic Attendance System (AAS).  
The system eliminates manual roll-calling by using **AI-based facial recognition** to detect students and automatically store attendance in the database.

---

## 🚀 Project Overview
The Automatic Attendance System is designed to:

- Automatically detect students from classroom camera footage  
- Mark attendance with ≥95% face-recognition accuracy  
- Allow instructors to review and edit unclear records  
- Generate downloadable PDF/Excel attendance reports  
- Support student self-registration and photo upload  
- Provide an admin dashboard for system-wide management  

The UI is built in **React (Cursor)** and communicates with backend APIs to handle registration, face uploads, recognition feedback, and reporting.

---

## 🖥️ Tech Stack

### **Frontend**
- React (implemented in Cursor IDE)
- Modern, component-based UI architecture
- Responsive web design (mobile-friendly)

### **Backend (Planned Integration)**
- Python (Face recognition, image processing)
- PostgreSQL (relational DB)
- FastAPI / Node backend (depending on final implementation)

### **AI Module**
- Face detection  
- Vector-based face matching  
- Attendance decision logic  

---

## 🧩 System Features

### 🔵 **Student Registration**
- Students can register from the UI  
- Admin can import students from the university system  
- Students upload a face photo (validated by AI)  
- The photo is processed and stored securely  

### 🔵 **Attendance Taking**
- AI analyzes real-time classroom camera footage  
- Matches faces with stored vectors  
- Marks attendance automatically  
- Instructor can manually correct entries  

### 🔵 **Reporting**
- Attendance reports generated per course/date  
- Filter by department, student, or course  
- Export as **PDF** or **Excel**  

---

## 🗂️ System Architecture Overview

The system contains these main modules (summarized from project documentation):  
:contentReference[oaicite:1]{index=1}

- **Student Module**: registration, photo upload  
- **Instructor Module**: attendance review/edit  
- **Admin Module**: user management, approvals  
- **AI Module**: face recognition + vector comparison  
- **Database Module**: students, courses, attendance, instructors  

---

## 🗄️ Database Tables (Summary)

**Students**  
`student_id, name, surname, email, photo_path, face_data, department_id`

**Courses**  
`course_id, course_name, instructor_id`

**Instructors**  
`instructor_id, name, email, department_id`

**Attendance**  
`attendance_id, student_id, course_id, date, status`

**Department**  
`department_id, department_name`

---

## 🧪 Functional Requirements (Key Points)

- Students must be able to register + upload facial photo  
- System must detect faces ≥95% accuracy  
- Attendance must be marked automatically  
- Instructors must be able to edit unclear records  
- Reports must export as PDF/Excel  

---

## 🔐 Non-Functional Requirements (Highlights)

- Face processing time ≤ 2 seconds  
- Data stored in encrypted format  
- System supports 50+ concurrent students  
- Login requires two-factor authentication  
- UI must work on mobile devices  

---

## 🛠️ Development Workflow

This project followed a structured EPIC → Story → Task workflow:  
- Requirements Analysis  
- Database Schema Creation  
- UI Design for Web Application(Canva → Cursor)  
- Backend Development  
- System Management & Post-Deployment Operations

---

## 💻 Frontend Pages (Cursor Implementation)
- Login / Register  
- Admin Dashboard  
- Student Registration  
- Face Upload Page  
- Attendance Review Page  
- Reporting Dashboard  

All pages were first designed in Canva, then implemented in Cursor with React.

---

## 🤝 Contributors
- Begüm Karadayı  
- Melisa Yönder  
- Melisa Çelik  

---

We can add installation instructions, API docs, screenshots, and deployment guides.
