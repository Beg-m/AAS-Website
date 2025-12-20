### AUTOMATIC ATTENDANCE SYSTEM

A complete web-based **Automatic Attendance System (AAS)** built using **React + Vite** for the frontend and **Node.js/Express + PostgreSQL** for the backend.
The system supports **AI-ready facial recognition attendance**, student/course management, reporting, and a modern UI.

### 1.PROJECT OVERVİEW

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

<img width="432" height="613" alt="image" src="https://github.com/user-attachments/assets/a368441b-f947-41e1-806b-34827120066e" />

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

5. <img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/06eb3ae2-3ab2-4dcb-aac9-8014f000dc40" />

6. <img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/4efe72f0-20b0-48ec-ab4c-ccf099b56c60" />

7.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/3de1895a-1e04-409b-9e25-58da42b14d73" />

8.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/5b7bfb04-7e49-45b5-9a2f-b12a2e5a716e" />

9.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/f4a26680-d880-4eb3-8939-e0f14a6f14dc" />

10.<img width="433" height="282" alt="image" src="https://github.com/user-attachments/assets/1e2c05e6-bf3e-415f-a4d5-fef243270c60" />

11.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/67777c96-d27e-47b7-b850-4fbabdb43e1c" />

12.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/a7d18d76-f46d-4029-8378-b3b118be5920" />

13.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/fbb60be5-be03-4b14-b2b1-ed835d494c37" />

14.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/4d086a60-0bbd-4dfa-8640-8e0d1668fbbc" />

15.<img width="433" height="281" alt="image" src="https://github.com/user-attachments/assets/84876a14-f816-4e18-8bca-8f209616aaba" />

16.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/aee51b1e-43be-4ef3-92e6-25ae6247785c" />

17.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/fe04446d-be14-4783-a342-cfce7da3e92b" />

18. <img width="433" height="281" alt="image" src="https://github.com/user-attachments/assets/9b1040a7-b096-4ee8-8aed-d007d917f217" />

19.<img width="432" height="281" alt="image" src="https://github.com/user-attachments/assets/05c1a6bb-f94e-4449-9ae6-1538d9898037" />


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


### 8. UNIT TESTING SUMMARY

#### 8.1 Introduction

Unit testing is a software testing methodology where individual components of an application are tested in isolation to verify they function correctly. In the context of backend API development, this means testing route handlers and business logic without dependencies on external systems like databases or frontend interfaces.

Backend unit testing is crucial for several reasons:
- **Reliability**: Ensures API endpoints behave correctly under various input conditions
- **Maintainability**: Catches regressions when code is modified or refactored
- **Documentation**: Tests serve as executable documentation of expected behavior
- **Speed**: Isolated tests execute quickly without external dependencies

This document describes the backend unit testing approach implemented for the AAS (Attendance Automation System) project, focusing specifically on Express.js API routes.

#### 8.2 Testing Approach and Rationale

**2.1 Exclusion of Frontend Code**

The frontend code located in `src/` and `public/` directories was intentionally excluded from this test suite because:
- **Separation of concerns**: Frontend and backend represent distinct layers of the application
- **Scope limitation**: This test suite specifically targets backend API logic
- **Independence**: Backend tests should not depend on UI implementation details

**2.2 Focus on Express Routes**

Express route handlers were chosen as the primary testing target because they:
- Define the API contract between frontend and backend
- Handle request validation and data transformation
- Contain business logic for data processing
- Return appropriate HTTP responses

By testing routes, we validate the API layer's behavior without UI dependencies.

**2.3 Database Mocking Strategy**

The PostgreSQL database (`backend-node/config/db.js`) was mocked rather than using a real database instance because:
- **Isolation**: Tests should not depend on database state or configuration
- **Speed**: Avoids database setup and teardown overhead
- **Reliability**: Eliminates test failures due to database connectivity issues
- **Control**: Enables precise test scenarios including error conditions

The mock replaces `pool.query()` and `pool.connect()` with Vitest functions that return controlled responses.

#### 8.3 Testing Setup and Tools

**3.1 Test Framework: Vitest**

Vitest was selected as the testing framework because it:
- Provides fast test execution with native ESM support
- Offers built-in mocking capabilities
- Supports watch mode for development
- Integrates seamlessly with Vite-based projects

**3.2 HTTP Testing: Supertest**

Supertest was used to simulate HTTP requests because it:
- Allows testing complete request/response cycles
- Verifies HTTP status codes and response bodies
- Validates middleware behavior
- Provides a realistic testing environment

**3.3 Mocking Implementation**

The database mocking strategy:
- Uses `vi.mock()` to replace the database module before route imports
- Replaces `pool.query()` with mock functions returning controlled data
- Simulates `pool.connect()` for transaction handling
- Resets mocks between tests to ensure isolation

Transaction handling:
- Multi-step database operations use a mock client object
- Simulates BEGIN, COMMIT, and ROLLBACK operations
- Sequences query calls to match real transaction behavior

#### 8.4 Test Coverage by Entity

**4.1 Student Routes (`/api/students`)**

The student routes handle student management operations:
- `GET /api/students` - Retrieves a list of students with optional search and department filtering
- `GET /api/students/:id` - Retrieves a specific student by ID
- `POST /api/students` - Creates a new student record (with optional course enrollment)

**Test Scenarios:**

1. **Successful Student Creation**
   - Tests the creation of a student with valid input data (name, surname, email, department)
   - Verifies HTTP 201 status code and success response structure
   - Mocks database transaction: department lookup, student insertion, and commit

2. **Validation Error for Missing Required Fields**
   - Tests the API's response when required fields are missing (e.g., email)
   - Verifies HTTP 400 status code and appropriate error message
   - Ensures no database write operation occurs

3. **Fetching Students with Search Query**
   - Tests the GET endpoint with a search query parameter
   - Verifies HTTP 200 status code and filtered results
   - Confirms database query execution with search parameters

**Additional tests include:** Fetching all students, fetching student by ID (success and 404 cases), department validation, and database error handling.

**4.2 Course Routes (`/api/courses`)**

The course routes manage course-related operations:
- `GET /api/courses` - Retrieves courses with optional search and instructor filtering
- `POST /api/courses` - Creates a new course
- `DELETE /api/courses/:id` - Deletes a course by ID

**Test Scenarios:**

1. **Successful Course Creation**
   - Tests course creation with valid input (course_id, course_name, instructor_id)
   - Verifies HTTP 201 status code and course_id in response
   - Mocks: course ID uniqueness check, instructor existence validation, and insertion

2. **Validation Error for Duplicate Course ID**
   - Tests the API's response when attempting to create a course with an existing ID
   - Verifies HTTP 400 status code and appropriate error message
   - Ensures duplicate prevention logic works correctly

3. **Fetching Courses with Search Query**
   - Tests the GET endpoint with search functionality
   - Verifies HTTP 200 status code and filtered results
   - Confirms search functionality works as expected

**Additional tests include:** Fetching all courses, instructor validation (non-existent instructor), course deletion (success and 404 cases), and database error handling.

**4.3 Enrollment Routes (`/api/students/courses`)**

The enrollment routes handle student-course relationships:
- `GET /api/students/courses` - Retrieves student-course enrollments with optional search and course filtering
- `POST /api/students` - Creates a student with course enrollment (via courses array in request body)

**Test Scenarios:**

1. **Successful Enrollment Creation**
   - Tests creating a student with associated courses in a single transaction
   - Verifies HTTP 201 status code and successful enrollment
   - Mocks transaction: student creation, course validation, and enrollment insertion

2. **Fetching Enrollments with Course Filter**
   - Tests the GET endpoint with course filtering
   - Verifies HTTP 200 status code and filtered enrollment results
   - Confirms filtering functionality works correctly

3. **Creating Student Without Courses (Optional Enrollment)**
   - Tests student creation without course enrollment
   - Verifies HTTP 201 status code and student creation success
   - Confirms enrollment is optional and doesn't cause errors

**Additional tests include:** Fetching all enrollments, search functionality for enrollments, invalid course handling (gracefully skipped), and database error handling.

#### 8.5 Running the Tests

**5.1 Prerequisites**

Ensure all dependencies are installed:
```bash
npm install
```

**5.2 Test Execution Commands**

Run all tests once (single execution):
```bash
npm test -- --run
```

Run tests in watch mode (automatically re-runs on file changes):
```bash
npm test
```

Run tests with interactive UI:
```bash
npm run test:ui
```

Run tests with coverage report:
```bash
npm run test:coverage
```

Run a specific test file:
```bash
npm test -- --run tests/student.test.js
```

**5.3 Expected Output**

Successful test execution displays:
- Number of test files executed (3 files)
- Total number of tests run (24 tests)
- All tests passing status
- Execution time (typically under 1 second)

Example output:
```
✓ tests/enrollment.test.js (7 tests)
✓ tests/student.test.js (8 tests)
✓ tests/course.test.js (9 tests)

Test Files  3 passed (3)
Tests  24 passed (24)
```

#### 8.6 Conclusion

This backend unit testing suite successfully achieves:

- **Complete Coverage**: All three main entities (Student, Course, Enrollment) are thoroughly tested
- **Proper Isolation**: Database is fully mocked, ensuring tests are independent and fast
- **Realistic Scenarios**: Tests cover success cases, validation errors, and edge cases
- **Fast Execution**: All 24 tests complete in under one second
- **Maintainability**: Clear test structure and descriptive names facilitate future maintenance

This approach is correct and professional because:

- **Focused Scope**: Tests target backend API logic without frontend dependencies
- **Proper Mocking**: Database mocking ensures fast, reliable, and isolated tests
- **Best Practices**: Follows industry standards including AAA pattern, clear naming, and comprehensive coverage
- **CI/CD Ready**: Test suite can be easily integrated into continuous integration pipelines

The test suite serves as executable documentation of the API's expected behavior and provides a solid foundation for ongoing development and maintenance of the AAS backend system.


This project is part of the **SE 342 Software Validation and Testing course** project at Maltepe University.

**Team Members**

Begüm KARADAYI - Student ID: 220706023
Melisa ÇELİK - Student ID: 220706025
Melisa YÖNDER - Student ID: 220706029












































































