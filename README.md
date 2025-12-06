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

### **Backend**
- Python Flask (RESTful API)
- PostgreSQL (relational DB)
- psycopg2 (database adapter)
- Flask-CORS (cross-origin resource sharing)

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

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (for frontend)
- Python 3.8+ (for backend)
- PostgreSQL 12+

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Run setup script:
```bash
./setup.sh
```

Or manually:
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example and update credentials)
cp .env.example .env
```

3. Setup PostgreSQL database:
```bash
# Create database
createdb aas_database

# Initialize schema
psql -U postgres -d aas_database -f database/schema.sql
```

4. Update `.env` file with your database credentials

5. Start backend server:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

---

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - User authentication

### Students
- `GET /api/students` - Get all students (with filters)
- `GET /api/students/<id>` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/<id>` - Update student
- `DELETE /api/students/<id>` - Delete student
- `GET /api/students/courses` - Get students with courses

### Instructors
- `GET /api/instructors` - Get all instructors (with filters)

### Courses
- `GET /api/courses` - Get all courses (with filters)

### Attendance
- `GET /api/attendance` - Get attendance records (with filters)
- `POST /api/attendance` - Create attendance record

### Reports
- `GET /api/reports/attendance-summary` - Get attendance summary
- `GET /api/reports/attendance-rate` - Get attendance rate by course

### Departments
- `GET /api/departments` - Get all departments

For detailed API documentation, see `backend/README.md`

---

## 🗄️ Database Schema

The database includes the following tables:
- **employee** - System administrators
- **department** - University departments
- **student** - Student information with face data
- **instructor** - Instructor information
- **course** - Course information
- **attendance** - Attendance records
- **student_course** - Many-to-many relationship between students and courses

See `backend/database/schema.sql` for complete schema definition.

---

## 🚀 Running the Full Stack

1. Start PostgreSQL service
2. Start backend: `cd backend && python app.py`
3. Start frontend: `npm run dev`
4. Access the application at `http://localhost:5173`

---

## 📝 Notes

- The frontend is configured to connect to `http://localhost:5000` for API calls
- Update `src/utils/api.js` if your backend runs on a different port
- Default login credentials are in the database schema (see `schema.sql`)
- All API endpoints return JSON responses
