import { useState, useEffect } from 'react';
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
import { attendanceAPI, coursesAPI } from '../utils/api';
import './Attendance.css';

function Attendance() {
  const location = useLocation();
  const [nameSurname, setNameSurname] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
    loadAttendance();
  }, []);

  // Reload data when navigating to this page
  useEffect(() => {
    if (location.pathname === '/attendance') {
      loadAttendance();
    }
  }, [location.pathname]);

  // Reload data when page becomes visible (for auto-refresh after student creation)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && location.pathname === '/attendance') {
        loadAttendance();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also reload when window gains focus
    const handleFocus = () => {
      if (location.pathname === '/attendance') {
        loadAttendance();
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [location.pathname]);

  useEffect(() => {
    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      loadAttendance();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [nameSurname, selectedCourse, selectedDate, searchQuery]);

  const loadCourses = async () => {
    try {
      const data = await coursesAPI.getAll();
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const loadAttendance = async () => {
    setLoading(true);
    try {
      // Convert date format from DD.MM.YYYY to YYYY-MM-DD if needed
      let dateParam = selectedDate;
      if (dateParam && dateParam.includes('.')) {
        const parts = dateParam.split('.');
        dateParam = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      
      console.log('Loading attendance with filters:', { nameSurname, selectedCourse, dateParam, searchQuery });
      const data = await attendanceAPI.getAll(nameSurname || '', selectedCourse || '', dateParam || '', searchQuery || '');
      console.log('Attendance loaded:', data, 'Count:', data?.length);
      setAttendance(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading attendance:', error);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

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
                  {courses.map(course => (
                    <option key={course.course_id} value={course.course_name}>
                      {course.course_name}
                    </option>
                  ))}
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
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td>
                  </tr>
                ) : attendance.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No attendance records found</td>
                  </tr>
                ) : (
                  attendance.map((record, index) => (
                    <tr key={`${record.studentName}-${record.studentSurname}-${record.date}-${index}`}>
                      <td>{record.studentName}</td>
                      <td>{record.studentSurname}</td>
                      <td>{record.course}</td>
                      <td>{record.date}</td>
                      <td>
                        <span className={`status-badge ${record.hasNoAttendance ? 'no-attendance' : record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
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

