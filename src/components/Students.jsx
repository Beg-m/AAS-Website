import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaBook, 
  FaClipboardList, 
  FaChartBar,
  FaCog,
  FaSearch,
  FaChevronDown
} from 'react-icons/fa';
import './Students.css';

// Sample student data
const sampleStudents = [
  { id: '01', name: 'Liam', surname: 'Carter', email: 'l.carter@university.edu', department: 'Software Eng.', photoPath: 'uploads/students/01_liam_carter.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '02', name: 'Emily', surname: 'Dawson', email: 'e.dawson@university.edu', department: 'Sociology', photoPath: 'uploads/students/02_emily_dawson.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '03', name: 'Noah', surname: 'Mitchell', email: 'n.mitchell@university.edu', department: 'Computer Eng.', photoPath: 'uploads/students/03_noah_mitchell.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '04', name: 'Ava', surname: 'Reynolds', email: 'a.reynolds@university.edu', department: 'Business Administration', photoPath: 'uploads/students/04_ava_reynolds.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '05', name: 'Ethan', surname: 'Cooper', email: 'ethan_c@university.edu', department: 'Electrical Eng.', photoPath: 'uploads/students/05_ethan_cooper.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '06', name: 'Sophia', surname: 'Bennett', email: 's.bennett@university.edu', department: 'Architecture', photoPath: 'uploads/students/06_sophia_bennett.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '07', name: 'Mason', surname: 'Turner', email: 'm.turner@university.edu', department: 'Industrial Eng.', photoPath: 'uploads/students/07_mason_turner.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '08', name: 'Isabella', surname: 'Hayes', email: 'i.hayes@university.edu', department: 'Law', photoPath: 'uploads/students/08_isabella_hayes.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '09', name: 'Logan', surname: 'Brooks', email: 'l.brooks@university.edu', department: 'Medicine', photoPath: 'uploads/students/09_logan_brooks.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '10', name: 'Olivia', surname: 'Parker', email: 'o.parker@university.edu', department: 'Software Eng.', photoPath: 'uploads/students/10_olivia_parker.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '11', name: 'Jacob', surname: 'Harrison', email: 'j.harrison@university.edu', department: 'Computer Eng.', photoPath: 'uploads/students/11_jacob_harrison.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '12', name: 'Chloe', surname: 'Martinez', email: 'c.martinez@university.edu', department: 'Business Administration', photoPath: 'uploads/students/12_chloe_martinez.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '13', name: 'Caleb', surname: 'Anderson', email: 'c.anderson@university.edu', department: 'Electrical Eng.', photoPath: 'uploads/students/13_caleb_anderson.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '14', name: 'Grace', surname: 'Sullivan', email: 'g.sullivan@university.edu', department: 'Architecture', photoPath: 'uploads/students/14_grace_sullivan.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' },
  { id: '15', name: 'Henry', surname: 'Chapman', email: 'h.chapman@university.edu', department: 'Industrial Eng.', photoPath: 'uploads/students/15_henry_chapman.jpg', faceData: '0.128, -0.442, 0.913, -0.552, 0.003,...' }
];

// Sample students & courses data
const studentsCourses = [
  { studentId: '01', name: 'Liam', surname: 'Carter', courseId: 'CSE-410', courseName: 'Software Architecture' },
  { studentId: '02', name: 'Emily', surname: 'Dawson', courseId: 'SOC-101', courseName: 'Introduction to Sociology' },
  { studentId: '03', name: 'Noah', surname: 'Mitchell', courseId: 'CSE-320', courseName: 'Database Management System' },
  { studentId: '04', name: 'Ava', surname: 'Reynolds', courseId: 'BUS-101', courseName: 'Principles of Management' },
  { studentId: '05', name: 'Ethan', surname: 'Cooper', courseId: 'CSE-320', courseName: 'Database Management System' },
  { studentId: '06', name: 'Sophia', surname: 'Bennett', courseId: 'EEE-210', courseName: 'Circuit Analysis' },
  { studentId: '07', name: 'Mason', surname: 'Turner', courseId: 'SOC-101', courseName: 'Introduction to Sociology' },
  { studentId: '08', name: 'Isabella', surname: 'Hayes', courseId: 'ARC-130', courseName: 'Design Studio' },
  { studentId: '09', name: 'Logan', surname: 'Brooks', courseId: 'CSE-410', courseName: 'Software Architecture' },
  { studentId: '10', name: 'Olivia', surname: 'Parker', courseId: 'BUS-101', courseName: 'Principles of Management' },
  { studentId: '11', name: 'Jacob', surname: 'Harrison', courseId: 'IE-330', courseName: 'Operations Research' },
  { studentId: '12', name: 'Chloe', surname: 'Martinez', courseId: 'IE-330', courseName: 'Operations Research' },
  { studentId: '13', name: 'Caleb', surname: 'Anderson', courseId: 'LAW-210', courseName: 'Constitutional Law' },
  { studentId: '14', name: 'Grace', surname: 'Sullivan', courseId: 'MED-120', courseName: 'Human Anatomy' },
  { studentId: '15', name: 'Henry', surname: 'Chapman', courseId: 'MED-120', courseName: 'Human Anatomy' }
];

function Students() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [viewMode, setViewMode] = useState('courses');

  const filteredStudents = sampleStudents.filter(student => {
    const matchesSearch = searchQuery === '' || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.includes(searchQuery);
    const matchesDepartment = selectedDepartment === '' || student.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const filteredStudentsCourses = studentsCourses.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentId.includes(searchQuery);
    const matchesCourse = selectedCourse === '' || item.courseId === selectedCourse || item.courseName === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/universitelogo_mor%202.png" alt="Maltepe University Logo" className="sidebar-logo" />
          <div className="sidebar-university-name">Maltepe University</div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <FaTachometerAlt className="nav-icon" />
            <span>Dashboard</span>
          </Link>
          <Link to="/students" className={`nav-item ${location.pathname === '/students' ? 'active' : ''}`}>
            <FaUserGraduate className="nav-icon" />
            <span>Students</span>
          </Link>
          <Link to="/instructors" className={`nav-item ${location.pathname === '/instructors' ? 'active' : ''}`}>
            <FaChalkboardTeacher className="nav-icon" />
            <span>Instructors</span>
          </Link>
          <Link to="/courses" className={`nav-item ${location.pathname === '/courses' ? 'active' : ''}`}>
            <FaBook className="nav-icon" />
            <span>Courses</span>
          </Link>
          <Link to="/attendance" className={`nav-item ${location.pathname === '/attendance' ? 'active' : ''}`}>
            <FaClipboardList className="nav-icon" />
            <span>Attendance</span>
          </Link>
          <Link to="/reports" className={`nav-item ${location.pathname === '/reports' ? 'active' : ''}`}>
            <FaChartBar className="nav-icon" />
            <span>Reports</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/settings" className={`settings-link ${location.pathname === '/settings' ? 'active' : ''}`}>
            <FaCog className="settings-icon" />
            <span>SETTINGS/PROFILE</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {/* Header */}
          <div className="students-header">
            <h1 className="students-title">
              {viewMode === 'students' ? 'Students' : 'Students & Courses'}
            </h1>
            <div className="view-toggle">
              <button 
                className={`toggle-button ${viewMode === 'students' ? 'active' : ''}`}
                onClick={() => setViewMode('students')}
              >
                Students
              </button>
              <button 
                className={`toggle-button ${viewMode === 'courses' ? 'active' : ''}`}
                onClick={() => setViewMode('courses')}
              >
                Students & Courses
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          {viewMode === 'students' ? (
            <div className="search-filter-section">
              <div className="filter-group">
                <div className="select-wrapper">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="department-select"
                  >
                    <option value="">DEPARTMENT</option>
                    <option value="Software Eng.">Software Eng.</option>
                    <option value="Computer Eng.">Computer Eng.</option>
                    <option value="Electrical Eng.">Electrical Eng.</option>
                    <option value="Industrial Eng.">Industrial Eng.</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Law">Law</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Sociology">Sociology</option>
                  </select>
                  <FaChevronDown className="select-arrow" />
                </div>
                <div className="search-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search name, surname,ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="search-button">Search</button>
              </div>
            </div>
          ) : (
            <div className="search-filter-section">
              <div className="filter-group">
                <div className="search-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search name, surname, ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaChevronDown className="select-arrow" style={{ right: '1rem' }} />
                </div>
                <div className="select-wrapper">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="department-select"
                  >
                    <option value="">Course</option>
                    <option value="CSE-410">CSE-410 - Software Architecture</option>
                    <option value="SOC-101">SOC-101 - Introduction to Sociology</option>
                    <option value="CSE-320">CSE-320 - Database Management System</option>
                    <option value="BUS-101">BUS-101 - Principles of Management</option>
                    <option value="EEE-210">EEE-210 - Circuit Analysis</option>
                    <option value="ARC-130">ARC-130 - Design Studio</option>
                    <option value="IE-330">IE-330 - Operations Research</option>
                    <option value="LAW-210">LAW-210 - Constitutional Law</option>
                    <option value="MED-120">MED-120 - Human Anatomy</option>
                  </select>
                  <FaChevronDown className="select-arrow" />
                </div>
                <button className="search-button">Search</button>
              </div>
            </div>
          )}

          {/* Table */}
          {viewMode === 'students' ? (
            <div className="table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Photo Path</th>
                    <th>Face Data</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.surname}</td>
                      <td>{student.email}</td>
                      <td>{student.department}</td>
                      <td className="photo-path">{student.photoPath}</td>
                      <td className="face-data">{student.faceData}</td>
                      <td>
                        {student.id === '01' ? (
                          <a href="#" className="view-link">view &gt;</a>
                        ) : (
                          <button className="enroll-face-button">Enroll Face</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Student Surname</th>
                    <th>Course ID</th>
                    <th>Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudentsCourses.map((item, index) => (
                    <tr key={`${item.studentId}-${item.courseId}-${index}`}>
                      <td>{item.studentId}</td>
                      <td>{item.name}</td>
                      <td>{item.surname}</td>
                      <td className="course-id">{item.courseId}</td>
                      <td>{item.courseName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* AI AAS Logo */}
        <div className="ai-aas-logo">
          <button className="ai-aas-button">AI-AAS</button>
        </div>
      </main>
    </div>
  );
}

export default Students;

