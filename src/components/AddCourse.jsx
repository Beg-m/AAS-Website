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
import { coursesAPI, instructorsAPI } from '../utils/api';
import './AddCourse.css';

function AddCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Form states
  const [formData, setFormData] = useState({
    course_id: '',
    course_name: '',
    instructor_id: ''
  });
  
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    try {
      const instructorsData = await instructorsAPI.getAll();
      setInstructors(instructorsData);
    } catch (error) {
      console.error('Error loading instructors:', error);
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
      if (!formData.course_id || !formData.course_name || !formData.instructor_id) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Submit to API
      const courseData = {
        course_id: formData.course_id,
        course_name: formData.course_name,
        instructor_id: formData.instructor_id
      };

      await coursesAPI.create(courseData);
      
      setSuccess('Course added successfully!');
      
      // Reset form
      setFormData({
        course_id: '',
        course_name: '',
        instructor_id: ''
      });

      // Navigate back to courses page after 2 seconds
      setTimeout(() => {
        navigate('/courses');
      }, 2000);

    } catch (error) {
      console.error('Error adding course:', error);
      setError(error.message || 'Failed to add course');
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
          <button className="back-button" onClick={() => navigate('/courses')}>
            <FaArrowLeft /> Back to Courses
          </button>

          <div className="add-course-container">
            <h2 className="form-title">Add New Course</h2>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} className="add-course-form">
              <div className="form-group">
                <label htmlFor="course_id">Course ID</label>
                <input
                  type="text"
                  id="course_id"
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleInputChange}
                  placeholder="Enter course ID (e.g., CS101)"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="course_name">Course Name</label>
                <input
                  type="text"
                  id="course_name"
                  name="course_name"
                  value={formData.course_name}
                  onChange={handleInputChange}
                  placeholder="Enter course name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="instructor_id">Assign Instructor</label>
                <select
                  id="instructor_id"
                  name="instructor_id"
                  value={formData.instructor_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select instructor</option>
                  {instructors.map(instructor => (
                    <option key={instructor.instructor_id} value={instructor.instructor_id}>
                      {instructor.instructor_id} - {instructor.instructor_name} {instructor.instructor_surname}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Saving...' : 'Save Course'}
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

export default AddCourse;

