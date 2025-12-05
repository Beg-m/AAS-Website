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
import { instructorsAPI, departmentsAPI } from '../utils/api';
import './Instructors.css';

function Instructors() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    loadInstructors();
  }, [searchQuery, selectedDepartment]);

  const loadDepartments = async () => {
    try {
      const depts = await departmentsAPI.getAll();
      setDepartments(depts);
    } catch (error) {
      console.error('Error loading departments:', error);
    }
  };

  const loadInstructors = async () => {
    setLoading(true);
    try {
      const data = await instructorsAPI.getAll(searchQuery, selectedDepartment);
      setInstructors(data);
    } catch (error) {
      console.error('Error loading instructors:', error);
      setInstructors([]);
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
          <div className="instructors-header">
            <h1 className="instructors-title">Instructors</h1>
          </div>

          {/* Search and Filter */}
          <div className="search-filter-section">
            <div className="filter-group">
              <div className="select-wrapper">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="department-select"
                  >
                    <option value="">DEPARTMENT</option>
                    {departments.map(dept => (
                      <option key={dept.department_id} value={dept.department_name}>
                        {dept.department_name}
                      </option>
                    ))}
                  </select>
                <FaChevronDown className="select-arrow" />
              </div>
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search name, surname, ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="search-button">Search</button>
            </div>
          </div>

          {/* Instructors Table */}
          <div className="table-container">
            <table className="instructors-table">
              <thead>
                <tr>
                  <th>Instructor ID</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td>
                  </tr>
                ) : instructors.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No instructors found</td>
                  </tr>
                ) : (
                  instructors.map((instructor) => (
                    <tr key={instructor.instructor_id}>
                      <td>{instructor.instructor_id}</td>
                      <td>{instructor.instructor_name}</td>
                      <td>{instructor.instructor_surname}</td>
                      <td>{instructor.instructor_email}</td>
                      <td>{instructor.department}</td>
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

export default Instructors;

