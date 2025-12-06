**AUTOMATIC ATTENDANCE SYSTEM (AAS)**

A complete web-based **Automatic Attendance System (AAS)** built using **React + Vite** for the frontend and **Node.js/Express + PostgreSQL** for the backend.
The system supports **AI-ready facial recognition attendance**, student/course management, reporting, and a modern UI.

### 1. PROJECT OVERVIEW

The Automatic Attendance System (AAS) is designed to automate and simplify the process of tracking student attendance using intelligent, camera-based identification.
It provides administrative panels for managing students, instructors, courses, departments, and attendance records through a modular, scalable architecture.
This project includes:

**A fully functional React UI**

• Structured as a component-based architecture for maintainability
• Uses **React Router** for multi-page navigation (Dashboard, Students, Courses, Attendance, Reports, Settings)
• Implements reusable UI components for tables, forms, filters, and modals
• Developed with Vite for **high-performance development and optimized production builds**
• Includes responsive design for desktop and laptop screens
• Provides complete CRUD workflows (Create–Read–Update–Delete) for system entities

**A complete Node.js/Express REST API**

• Organized into modular route files: *students*,*instructors*,*courses*,*attendance*,*reports*,*departments*,*auth*
• Implements **RESTful best practices** with clear endpoints and HTTP standards
• Includes robust input validation, error handling, and status responses
• Uses **PostgreSQL connection pooling** for performance
• Handles filtering, searching, pagination, and relationship queries
• Includes a */api/health* endpoint for server diagnostics

**PostgreSQL database with relational schema**

Designed using ERD methodology (Entity-Relationship Diagram)

- Includes core tables:   
• students
• instructors
• courses
• departments
• attendance
• student_course (junction table for many-to-many relationships)

- Ensures data consistency through:
• Primary Keys (PK)
• Foreign Keys (FK)
• Cascading rules

-Schema supports:
• Student–Course enrollment
• Attendance linking with students & courses
• Instructor–Course assignments

**Unified production server architecture**

-The Express backend serves both the **API and the compiled React frontend**
-Allows the entire application to run on **one port**(e.g., http://localhost:5001)
-Eliminates CORS issues thanks to same-origin architecture

-Simplifies deployment on platforms like:
• Render
• Railway
• Docker containers
• On-premise university servers

-Express automatically routes:
• /api/* → Backend API
• All other paths → dist/index.html (React SPA)


### Comprehensive system design artifacts

-> The development process is supported by full software engineering documentation:

**Requirements Analysis**
✔ Functional (FR) and Non-Functional (NFR) requirements defined

**Use Case Diagrams**
✔ Covers main actor workflows (Student, Instructor, Admin)

**Detailed Use Case Descriptions**
✔ Includes preconditions, main flow, alternative paths, postconditions

**ERD (Entity-Relationship Diagram)**
✔ Models database structure visually with PK–FK relations

**Class Diagrams (if applicable)**
✔ Documents backend module responsibilities

**Sequence Diagrams**
✔ Shows API request flow between UI → Backend → Database

**UI Wireframes & Final Screens**
✔ Created initially in Canva, then implemented with React

These documents ensure that the system is traceable, maintainable, and aligned with academic software engineering standards.


### 2. SYSTEM ARCHITECTURE

### ✔ Frontend
-React 19
-Vite
-React Router DOM
-React Icons
-Modular page-based component structure

### ✔ Backend
-Node.js
-Express.js
-PostgreSQL + pg
-dotenv
-Unified server architecture (serves frontend + API from one port)

### ✔ Development Tools
-Cursor (AI-assisted coding)
-Canva (UI wireframes)
-Git/GitHub
-ESLint
-Docker (optional)

### 3. PROJECT STRUCTURE

AAS-Website/
│
├── backend-node/
│   ├── **config**/
│   │   └── db.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── students.js
│   │   ├── instructors.js
│   │   ├── courses.js
│   │   ├── attendance.js
│   │   ├── reports.js
│   │   └── departments.js
│   ├── server.js
│   └── **package**.json
│
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Students.jsx
│   │   ├── Attendance.jsx
│   │   ├── Reports.jsx
│   │   ├── Courses.jsx
│   │   ├── Instructors.jsx
│   │   └── Settings.jsx
│   ├── utils/api.js
│   ├── App.jsx
│   └── main.jsx
│
├── dist/                   # Production build **output**
├── public/
├── docker-compose.yml
├── **package**.json
└── vite.**config**.js

### 4. PROJECT DEVELOPMENT PHASES

This section follows the exact workflow provided in your Jira task list & final analysis document.

### PHASE 1 — Requirements Analysis & System Design

***1.1 Requirements Collection (AAS-95, AAS-93)***

**Documented:**
-Functional requirements
-Non-functional requirements
-Actors & roles
-System boundaries
-Initial constraints,

**1.2 Actor & Use Case Identification (AAS-99)**

**Actors:**
-Student
-Instructor
-Admin
-Face Recognition Module (future integration)

### USE CASE DIAGRAM(AAS-107)

![image](https://github.com/user-attachments/assets/d2fee37c-6dcb-4bae-933b-efa55eb02aa9)



### PHASE 2 — Database Design (AAS-100, AAS-106, AAS-111, AAS-110, AAS-112)

### 2.1 ER DIAGRAM(AAS-106)**

**Tables include:**
-students
-instructors
-departments
-courses
-student_course (many-to-many)
-attendance

![image](https://github.com/user-attachments/assets/20d9a595-b5c9-4507-b054-a7d966728a6e)

### SEQUENCE DIAGRAM (AAS-108)

Sequence diagrams were created for the following use cases:

->Add Student
->Face Enrollment
->Take Attendance (Camera)
->View Attendance
->Generate Reports

![image](https://github.com/user-attachments/assets/b4d05884-4aba-4e36-8e2c-2d1125e391b1)


**2.2 Database Implementation**

✔ PostgreSQL schema created
✔ Sample data inserted
✔ Relationships tested
✔ Node.js DB connection established

### PHASE 3 — UI/UX Design (AAS-114, AAS-115, AAS-116, AAS-118)

**3.1 Wireframe Design (Canva)**

**Designed screens:**
-Login
-Dashboard
-Students Page
-Instructors Page
-Courses
-Attendance
-Reports
-Settings

### UI Design Placeholder

1. <img width="524" height="295" alt="image" src="https://github.com/user-attachments/assets/eb1420d2-a29c-4f0c-9268-6b778d11e907" />

2. <img width="524" height="295" alt="image" src="https://github.com/user-attachments/assets/f857d158-f01f-4626-8af2-1397ccd63865" />

3. <img width="525" height="295" alt="image" src="https://github.com/user-attachments/assets/fbaafd40-8d68-4ec4-ad70-b696cedcf3d1" />

4.<img width="524" height="295" alt="image" src="https://github.com/user-attachments/assets/12cc2772-aae5-4ac4-bc2b-9d84b5185008" />

5. <img width="524" height="295" alt="image" src="https://github.com/user-attachments/assets/d33c1ddf-b9d5-4c07-b725-98ff5a0e531b" />

6. <img width="524" height="295" alt="image" src="https://github.com/user-attachments/assets/aa7857f5-79ce-4cb2-9a51-2fddbd2d660e" />

7. <img width="524" height="295" alt="image" src="https://github.com/user-attachments/assets/2442286d-88e3-4842-ad10-5847514a6ebf" />

8. <img width="524" height="295" alt="image" src="https://github.com/user-attachments/assets/0e8a186f-41a2-495b-9d45-6a4b84e6a2df" />

9. <img width="524" height="295" alt="image" src="https://github.com/user-attachments/assets/6d1b581c-eebc-47a2-a2f5-24c75474528f" />

10. <img width="524" height="295" alt="image" src="https://github.com/user-attachments/assets/55cd31ef-50a2-4c23-9e7c-89f86c656744" />

11.<img width="524" height="295" alt="image" src="https://github.com/user-attachments/assets/128b55e7-8de8-4e7a-811b-6fdf08d16c09" />

### 3.2 High-Fidelity UI (Cursor AI + React)

**Developed reusable components:**

-Sidebar navigation
-Search bars
-Filter dropdowns
-Cards & tables
-Forms
-Charts

### UI Screens Placeholder

1. <img width="433" height="281" alt="image" src="https://github.com/user-attachments/assets/73708a5b-843f-4d72-ae3d-203df2ea075d" />

2. <img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/76dc371a-bb17-4668-a020-37adde7e0788" />

3. <img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/4ee4fa2b-1948-4284-9a16-afb1069f7666" />

4. <img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/a419f371-f052-4383-bbdc-e487b79397bd" />

5. <img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/08509ecd-ceef-4f8d-9949-7a20b766ff2f" />

6. <img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/b9de43e1-c9a2-4782-857b-87e101a29e05" />

7.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/b05e392c-e85c-4856-af74-da7f50a9e933" />

8.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/8182e578-cf1f-44a0-a16e-1911dfdfbe92" />

9.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/5c179ecc-615d-4287-bb88-05c06a423bf3" />

10.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/92e98ac7-6421-430f-be54-4fc491b4bb82" />

11.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/9c1138f5-14f8-408f-8637-d0b087f5e671" />

12.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/56bb9914-cdac-4167-b4bc-9eb2e75637e6" />

13.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/081e6c84-95cd-49da-b538-629086a6374e" />

14.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/24406603-7542-453d-966f-562ec1ada862" />

15.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/7bc3f68f-2e07-43a3-9c71-d083e0d096c1" />

16.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/fe04446d-be14-4783-a342-cfce7da3e92b" />

17. <img width="433" height="281" alt="image" src="https://github.com/user-attachments/assets/9b1040a7-b096-4ee8-8aed-d007d917f217" />

18.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/05c1a6bb-f94e-4449-9ae6-1538d9898037" />


### PHASE 4 — Frontend Development (React + Vite)

**4.1 Routing System**

Implemented using **React Router DOM:**

/ → Dashboard  
/students  
/instructors  
/courses  
/attendance  
/reports  
/settings  

**4.2 State & API Integration**

Using api.js, all backend requests were centralized:

export const API_URL = "/api";   // relative path for unified server

export async function getStudents() {
  return fetch(`${API_URL}/students`).then(res => res.json());
}


### 4.3 Components Developed

  **Component**	                           **Purpose**
  Dashboard.jsx	                    System summary & quick actions
  Students.jsx	                    Add/edit/delete/search students
  Attendance.jsx	                  Attendance table & filtering
  Reports.jsx	                      Future reporting features
  Courses.jsx	                      Course list & instructor mapping
  Instructors.jsx	                  Instructor management
  Settings.jsx                      Profile & system config


### PHASE 5 — Backend Development (Node.js + Express)

***5.1 Backend Setup (AAS-123)***

npm init  
npm install express pg cors dotenv


**5.2 Database Connection Layer (AAS-119)**

db.js contains PostgreSQL pool:

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5433,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "aas_database",
});


**5.3 REST API Endpoints**

**Students API (AAS-127)**

GET /api/students
POST /api/students
PUT /api/students/:id
DELETE /api/students/:id

**Attendance API (AAS-140)**

GET /api/attendance
POST /api/attendance

**Reports API (AAS-144)**

GET /api/reports/attendance-summary
GET /api/reports/attendance-rate


**Face Enrollment & Processing (AAS-131)**

☑ API prepared
☑ Ready for integration with AI face-recognition module

### PHASE 6 — Unified Production Server (AAS-152)

**The backend serves both:**

- **/api/** → Express REST API
- **React production build** → /dist
  
**Static File Hosting**

app.use(express.static(path.join(__dirname, "..", "dist")));

**SPA Routing Support**

app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "Route not found" });
  }
  res.sendFile(path.join(buildPath, "index.html"));
});

**RESULT**
✔ No CORS issues
✔ Both frontend + backend run on same port
✔ Simple deployment (Docker or plain Node)


### 7. API DOCUMENTATION

**Students**

GET /api/students
POST /api/students
GET /api/students/:id
PUT /api/students/:id
DELETE /api/students/:id

**Instructors**

GET /api/instructors
Courses
GET /api/courses

**Attendance**

GET /api/attendance
POST /api/attendance

**Reports**

GET /api/reports/attendance-summary
Departments
GET /api/departments

**Health Check**

GET /api/health



This project is part of the **SE 342 Software Validation and Testing course** project at Maltepe University.

**Team Members**

Begüm KARADAYI - Student ID: 220706023
Melisa ÇELİK - Student ID: 220706025
Melisa YÖNDER - Student ID: 220706029












































































