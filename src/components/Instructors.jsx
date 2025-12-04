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
import './Instructors.css';

// Sample instructor data
const sampleInstructors = [
  { id: '16', name: 'Daniel', surname: 'Stevens', email: 'd.stevens@university.edu', department: 'Software Eng.' },
  { id: '17', name: 'Laura', surname: 'Kim', email: 'laura.kim@university.edu', department: 'Law' },
  { id: '18', name: 'Michael', surname: 'Roberts', email: 'm.roberts@university.edu', department: 'Medicine' },
  { id: '19', name: 'Sarah', surname: 'Collins', email: 's.collins@university.edu', department: 'Medicine' },
  { id: '20', name: 'William', surname: 'Scott', email: 'w.scott@university.edu', department: 'Computer Eng.' },
  { id: '21', name: 'Rebecca', surname: 'Foster', email: 'r.foster@university.edu', department: 'Business Administration' },
  { id: '22', name: 'Anthony', surname: 'Wright', email: 'anthony.w@university.edu', department: 'Architecture' },
  { id: '23', name: 'Victoria', surname: 'Hughes', email: 'v.hughes@university.edu', department: 'Sociology' },
  { id: '24', name: 'Benjamin', surname: 'Reed', email: 'b.reed@university.edu', department: 'Architecture' },
  { id: '25', name: 'Katherine', surname: 'Morgan', email: 'k.morgan@university.edu', department: 'Industrial Eng.' },
  { id: '26', name: 'Jonathan', surname: 'Price', email: 'j.price@university.edu', department: 'Electrical Eng.' },
  { id: '27', name: 'Olivia', surname: 'Barnes', email: 'o.barnes@university.edu', department: 'Electrical Eng.' },
  { id: '28', name: 'Hannah', surname: 'Peterson', email: 'peterson_h@university.edu', department: 'Software Eng.' },
  { id: '29', name: 'Robert', surname: 'William', email: 'will_rob@university.edu', department: 'Architecture' }
];

function Instructors() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const filteredInstructors = sampleInstructors.filter(instructor => {
    const matchesSearch = searchQuery === '' || 
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.id.includes(searchQuery);
    const matchesDepartment = selectedDepartment === '' || instructor.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
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
                {filteredInstructors.map((instructor) => (
                  <tr key={instructor.id}>
                    <td>{instructor.id}</td>
                    <td>{instructor.name}</td>
                    <td>{instructor.surname}</td>
                    <td>{instructor.email}</td>
                    <td>{instructor.department}</td>
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

export default Instructors;

