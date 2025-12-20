import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaBook, 
  FaClipboardList, 
  FaChartBar,
  FaCog,
  FaArrowLeft
} from 'react-icons/fa';
import { instructorsAPI, departmentsAPI } from '../utils/api';
import './AddInstructor.css';

function AddInstructor() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Form states
  const [formData, setFormData] = useState({
    instructor_id: '',
    name: '',
    surname: '',
    email: '',
    department: ''
  });
  
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const depts = await departmentsAPI.getAll();
      setDepartments(depts);
    } catch (error) {
      console.error('Error loading departments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate form
      if (!formData.instructor_id || !formData.name || !formData.surname || !formData.email || !formData.department) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Submit to API
      const instructorData = {
        instructor_id: formData.instructor_id,
        instructor_name: formData.name,
        instructor_surname: formData.surname,
        instructor_email: formData.email,
        department_id: formData.department
      };

      await instructorsAPI.create(instructorData);
      
      setSuccess('Instructor added successfully!');
      
      // Reset form
      setFormData({
        instructor_id: '',
        name: '',
        surname: '',
        email: '',
        department: ''
      });

      // Navigate back to instructors page after 2 seconds
      setTimeout(() => {
        navigate('/instructors');
      }, 2000);

    } catch (error) {
      console.error('Error adding instructor:', error);
      setError(error.message || 'Failed to add instructor');
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
          <Link to="/students" className={`nav-item ${location.pathname.startsWith('/students') ? 'active' : ''}`}>
            <FaUserGraduate className="nav-icon" />
            <span>Students</span>
          </Link>
          <Link to="/instructors" className={`nav-item ${location.pathname.startsWith('/instructors') ? 'active' : ''}`}>
            <FaChalkboardTeacher className="nav-icon" />
            <span>Instructors</span>
          </Link>
          <Link to="/courses" className={`nav-item ${location.pathname.startsWith('/courses') ? 'active' : ''}`}>
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
          {/* Back Button */}
          <button className="back-button" onClick={() => navigate('/instructors')}>
            <FaArrowLeft /> Back to Instructors
          </button>

          <div className="add-instructor-container">
            <h2 className="form-title">Add New Instructor</h2>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="add-instructor-form">
              <div className="form-group">
                <label htmlFor="instructor_id">Instructor ID</label>
                <input
                  type="text"
                  id="instructor_id"
                  name="instructor_id"
                  value={formData.instructor_id}
                  onChange={handleInputChange}
                  placeholder="Enter instructor ID"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  placeholder="Enter surname"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept.department_id} value={dept.department_id}>
                      {dept.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Saving...' : 'Save Instructor'}
              </button>
            </form>
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

export default AddInstructor;

