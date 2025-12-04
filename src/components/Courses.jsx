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
import './Courses.css';

// Sample courses data
const sampleCourses = [
  { instructorId: '22', courseId: 'ARC-130', name: 'Design Studio' },
  { instructorId: '16', courseId: 'CSE-410', name: 'Software Architecture' },
  { instructorId: '29', courseId: 'ARC-130', name: 'Design Studio' },
  { instructorId: '25', courseId: 'IE-330', name: 'Operations Research' },
  { instructorId: '20', courseId: 'CSE-320', name: 'Database Management System' },
  { instructorId: '19', courseId: 'MED-120', name: 'Human Anatomy' },
  { instructorId: '21', courseId: 'BUS-101', name: 'Principles of Management' },
  { instructorId: '17', courseId: 'LAW-210', name: 'Constitutional Law' },
  { instructorId: '24', courseId: 'ARC-130', name: 'Design Studio' },
  { instructorId: '16', courseId: 'CSE-410', name: 'Software Architecture' },
  { instructorId: '23', courseId: 'SOC-101', name: 'Introduction to Sociology' },
  { instructorId: '28', courseId: 'CSE-401', name: 'Software Validation and Analysis' },
  { instructorId: '27', courseId: 'EEE-210', name: 'Circuit Analysis' },
  { instructorId: '20', courseId: 'CSE-320', name: 'Database Management System' }
];

function Courses() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const filteredCourses = sampleCourses.filter(course => {
    const matchesSearch = searchQuery === '' || 
      course.courseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructorId.includes(searchQuery);
    return matchesSearch;
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      // Sample instructor selection
      setSelectedInstructor({ id: '22', name: 'Anthony', surname: 'Wright' });
    } else {
      setSelectedInstructor(null);
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
                {filteredCourses.map((course, index) => (
                  <tr key={`${course.instructorId}-${course.courseId}-${index}`}>
                    <td>{course.instructorId}</td>
                    <td className="course-id">{course.courseId}</td>
                    <td>{course.name}</td>
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

export default Courses;

