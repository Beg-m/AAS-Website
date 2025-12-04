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
  FaChevronDown,
  FaCalendarAlt
} from 'react-icons/fa';
import './Attendance.css';

// Sample attendance data
const sampleAttendance = [
  { studentName: 'Emily', studentSurname: 'Dawson', course: 'Introduction to Sociology', date: '16.11.2025', status: 'Present' },
  { studentName: 'Ethan', studentSurname: 'Cooper', course: 'Database Management System', date: '15.10.2025', status: 'Absent' },
  { studentName: 'Liam', studentSurname: 'Carter', course: 'Software Architecture', date: '14.11.2025', status: 'Present' },
  { studentName: 'Noah', studentSurname: 'Mitchell', course: 'Database Management System', date: '15.10.2025', status: 'Present' },
  { studentName: 'Ava', studentSurname: 'Reynolds', course: 'Principles of Management', date: '13.11.2025', status: 'Absent' },
  { studentName: 'Sophia', studentSurname: 'Bennett', course: 'Circuit Analysis', date: '12.11.2025', status: 'Present' },
  { studentName: 'Mason', studentSurname: 'Turner', course: 'Introduction to Sociology', date: '16.11.2025', status: 'Present' },
  { studentName: 'Isabella', studentSurname: 'Hayes', course: 'Design Studio', date: '11.11.2025', status: 'Absent' },
  { studentName: 'Logan', studentSurname: 'Brooks', course: 'Software Architecture', date: '14.11.2025', status: 'Present' },
  { studentName: 'Olivia', studentSurname: 'Parker', course: 'Principles of Management', date: '13.11.2025', status: 'Present' }
];

function Attendance() {
  const location = useLocation();
  const [nameSurname, setNameSurname] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAttendance = sampleAttendance.filter(record => {
    const matchesName = nameSurname === '' || 
      record.studentName.toLowerCase().includes(nameSurname.toLowerCase()) ||
      record.studentSurname.toLowerCase().includes(nameSurname.toLowerCase());
    const matchesCourse = selectedCourse === '' || record.course === selectedCourse;
    const matchesDate = selectedDate === '' || record.date === selectedDate;
    const matchesSearch = searchQuery === '' || 
      record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.studentSurname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesName && matchesCourse && matchesDate && matchesSearch;
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
          <div className="attendance-header">
            <h1 className="attendance-title">Attendance</h1>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-group">
              <input
                type="text"
                className="filter-input"
                placeholder="Name,Surname"
                value={nameSurname}
                onChange={(e) => setNameSurname(e.target.value)}
              />
              <div className="select-wrapper">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Course</option>
                  <option value="Introduction to Sociology">Introduction to Sociology</option>
                  <option value="Database Management System">Database Management System</option>
                  <option value="Software Architecture">Software Architecture</option>
                  <option value="Principles of Management">Principles of Management</option>
                  <option value="Circuit Analysis">Circuit Analysis</option>
                  <option value="Design Studio">Design Studio</option>
                </select>
                <FaChevronDown className="select-arrow" />
              </div>
              <input
                type="text"
                className="filter-input date-input"
                placeholder="Date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="E..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="table-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Surname</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((record, index) => (
                  <tr key={`${record.studentName}-${record.studentSurname}-${record.date}-${index}`}>
                    <td>{record.studentName}</td>
                    <td>{record.studentSurname}</td>
                    <td>{record.course}</td>
                    <td>{record.date}</td>
                    <td>
                      <span className={`status-badge ${record.status.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI AAS Logo */}
        <div className="ai-aas-logo">
          <button className="ai-aas-button">AI-AAS</button>
        </div>
      </main>
    </div>
  );
}

export default Attendance;

