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
  FaChevronDown
} from 'react-icons/fa';
import { coursesAPI } from '../utils/api';
import './Courses.css';

function Courses() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, [searchQuery]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await coursesAPI.getAll(searchQuery);
      setCourses(data);
      
      // Set selected instructor if search matches
      if (searchQuery.length > 0 && data.length > 0) {
        const firstCourse = data[0];
        if (firstCourse.instructor_name) {
          setSelectedInstructor({
            id: firstCourse.instructor_id,
            name: firstCourse.instructor_name,
            surname: firstCourse.instructor_surname
          });
        }
      } else {
        setSelectedInstructor(null);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
          <div className="courses-header">
            <h1 className="courses-title">Courses</h1>
          </div>

          {/* Search Section */}
          <div className="search-filter-section">
            <div className="filter-group">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search name, surname,ID"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <FaChevronDown className="select-arrow" style={{ right: '1rem' }} />
              </div>
              {selectedInstructor && (
                <div className="search-result">
                  <FaSearch className="result-icon" />
                  <span>{selectedInstructor.id} {selectedInstructor.name} {selectedInstructor.surname}</span>
                </div>
              )}
              <button className="search-button">Search</button>
            </div>
          </div>

          {/* Courses Table */}
          <div className="table-container">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Instructor ID</th>
                  <th>Course ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td>
                  </tr>
                ) : courses.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No courses found</td>
                  </tr>
                ) : (
                  courses.map((course, index) => (
                    <tr key={`${course.instructor_id}-${course.course_id}-${index}`}>
                      <td>{course.instructor_id}</td>
                      <td className="course-id">{course.course_id}</td>
                      <td>{course.course_name}</td>
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

export default Courses;

