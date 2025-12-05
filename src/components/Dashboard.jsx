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
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
  FaCamera
} from 'react-icons/fa';
import { studentsAPI, departmentsAPI, coursesAPI } from '../utils/api';
import './Dashboard.css';

function Dashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('manual');
  const [photoTab, setPhotoTab] = useState('capture');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [importMethod, setImportMethod] = useState('csv');
  const [selectedFile, setSelectedFile] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    surname: '',
    department: '',
    email: '',
    courses: []
  });

  useEffect(() => {
    loadDepartments();
    loadCourses();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (coursesDropdownOpen && !event.target.closest('.custom-select-wrapper')) {
        setCoursesDropdownOpen(false);
      }
    };

    if (coursesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [coursesDropdownOpen]);

  const loadDepartments = async () => {
    try {
      const depts = await departmentsAPI.getAll();
      setDepartments(depts);
    } catch (error) {
      console.error('Error loading departments:', error);
    }
  };

  const loadCourses = async () => {
    try {
      const coursesData = await coursesAPI.getAll();
      console.log('Courses loaded:', coursesData);
      setCourses(coursesData);
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourses([]);
    }
  };

  // Sample student data
  const sampleStudent = {
    id: '05',
    name: 'Ethan Cooper',
    email: 'ethan_c@university.edu',
    course: 'Database Management System',
    department: 'Computer Eng.',
    photo: null
  };

  // Reset form when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({
      studentId: '',
      name: '',
      surname: '',
      department: '',
      email: '',
      courses: []
    });
    if (tab === 'face') {
      setSelectedStudent(null);
      setSearchQuery('');
    } else {
      setSelectedStudent(null);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      try {
        const students = await studentsAPI.getAll(query);
        if (students.length > 0) {
          const student = students[0];
          
          // Get student's courses
          let studentCourses = [];
          try {
            const coursesData = await studentsAPI.getStudentsCourses(query);
            // Filter courses for this specific student
            const studentIdStr = student.student_id.toString();
            studentCourses = coursesData
              .filter(item => item.student_id.toString() === studentIdStr)
              .map(item => item.course_name);
          } catch (error) {
            console.error('Error loading student courses:', error);
          }
          
          setSelectedStudent({
            id: student.student_id.toString().padStart(2, '0'),
            name: `${student.student_name} ${student.student_surname}`,
            email: student.student_email,
            course: studentCourses.length > 0 ? studentCourses.join(', ') : 'No courses enrolled',
            department: student.department,
            photo: student.photo_path
          });
        } else {
          setSelectedStudent(null);
        }
      } catch (error) {
        console.error('Error searching students:', error);
        setSelectedStudent(null);
      }
    } else {
      setSelectedStudent(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseChange = (courseId) => {
    setFormData(prev => {
      const currentCourses = prev.courses;
      const isSelected = currentCourses.includes(courseId);
      
      if (isSelected) {
        // Remove course
        return {
          ...prev,
          courses: currentCourses.filter(id => id !== courseId)
        };
      } else {
        // Add course
        return {
          ...prev,
          courses: [...currentCourses, courseId]
        };
      }
    });
  };

  const toggleCoursesDropdown = () => {
    setCoursesDropdownOpen(!coursesDropdownOpen);
  };

  const getSelectedCoursesText = () => {
    if (formData.courses.length === 0) {
      return 'Select courses';
    }
    const selectedCourseNames = formData.courses.map(courseId => {
      const course = courses.find(c => c.course_id === courseId);
      return course ? course.course_name : '';
    }).filter(name => name !== '');
    
    if (selectedCourseNames.length === 0) {
      return 'Select courses';
    }
    if (selectedCourseNames.length === 1) {
      return selectedCourseNames[0];
    }
    return `${selectedCourseNames.length} courses selected`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await studentsAPI.create({
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        department: formData.department,
        courses: formData.courses
      });
      
      setMessage({ type: 'success', text: 'Student added successfully!' });
      setFormData({
        studentId: '',
        name: '',
        surname: '',
        department: '',
        email: '',
        courses: []
      });
    } catch (error) {
      console.error('Error adding student:', error);
      let errorMessage = 'Failed to save student. Please try again or check backend connection.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      setMessage({ type: 'error', text: errorMessage });
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
          {/* Tabs */}
          <div className="tabs-container">
            <button 
              className={`tab-button ${activeTab === 'manual' ? 'active' : ''}`}
              onClick={() => handleTabChange('manual')}
            >
              Add Student Manually
            </button>
            <button 
              className={`tab-button ${activeTab === 'face' ? 'active' : ''}`}
              onClick={() => handleTabChange('face')}
            >
              Face Enrollment
            </button>
            <button 
              className={`tab-button ${activeTab === 'import' ? 'active' : ''}`}
              onClick={() => handleTabChange('import')}
            >
              Import from Admin System
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'manual' && (
            <div className="form-card">
              <h2 className="form-title">Add Student Manually</h2>
              
              {message.text && (
                <div className={`message ${message.type}`} style={{
                  padding: '10px',
                  marginBottom: '20px',
                  borderRadius: '4px',
                  backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                  color: message.type === 'success' ? '#155724' : '#721c24'
                }}>
                  {message.text}
                </div>
              )}
              
              <form className="student-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label htmlFor="studentId" className="form-label">Student ID</label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter student ID"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter name"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="surname" className="form-label">Surname</label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter surname"
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="department" className="form-label">Department</label>
                  <div className="select-wrapper">
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select department</option>
                      {departments.map(dept => (
                        <option key={dept.department_id} value={dept.department_name}>
                          {dept.department_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="courses" className="form-label">Courses</label>
                  <div className={`custom-select-wrapper ${coursesDropdownOpen ? 'open' : ''}`}>
                    <div 
                      className="custom-select-trigger"
                      onClick={toggleCoursesDropdown}
                    >
                      <span className={formData.courses.length === 0 ? 'placeholder' : ''}>
                        {getSelectedCoursesText()}
                      </span>
                      <span className="custom-select-arrow">▼</span>
                    </div>
                    {coursesDropdownOpen && (
                      <div className="custom-select-dropdown">
                        {courses.length > 0 ? (
                          courses.map(course => {
                            const isSelected = formData.courses.includes(course.course_id);
                            return (
                              <div
                                key={course.course_id}
                                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleCourseChange(course.course_id)}
                              >
                                <span className="custom-checkbox">
                                  {isSelected && '✓'}
                                </span>
                                <span>{course.course_name}</span>
                              </div>
                            );
                          })
                        ) : (
                          <div className="custom-select-option disabled">Loading courses...</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter email"
                  />
                </div>

                <button type="submit" className="save-button" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Student'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'face' && (
            <div className="face-enrollment-container">
              {/* Select Student Section */}
              <div className="form-card">
                <h2 className="form-title">Select Student</h2>
                <div className="search-container">
                  <div className="search-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search by ID, name, surname"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                  {selectedStudent && (
                    <div className="search-result">
                      <FaSearch className="result-icon" />
                      <span>{selectedStudent.name}</span>
                    </div>
                  )}
                </div>

                {/* Student Information Card - ID Card Style */}
                {selectedStudent && (
                  <div className="student-id-card">
                    <div className="id-card-header">
                      <div className="id-card-logo">
                        <img src="/universitelogo_mor%202.png" alt="University Logo" className="id-card-logo-img" />
                      </div>
                      <div className="id-card-title">STUDENT ID CARD</div>
                    </div>
                    <div className="id-card-body">
                      <div className="id-card-photo-section">
                        <div className="id-card-photo">
                          {selectedStudent.photo ? (
                            <img src={selectedStudent.photo} alt={selectedStudent.name} />
                          ) : (
                            <FaUser className="id-card-photo-icon" />
                          )}
                        </div>
                        <div className="id-card-id">ID: {selectedStudent.id}</div>
                      </div>
                      <div className="id-card-info-section">
                        <div className="id-card-name">{selectedStudent.name}</div>
                        <div className="id-card-divider"></div>
                        <div className="id-card-details">
                          <div className="id-card-detail-row">
                            <span className="id-card-label">Department:</span>
                            <span className="id-card-value">{selectedStudent.department || 'N/A'}</span>
                          </div>
                          <div className="id-card-detail-row">
                            <span className="id-card-label">Email:</span>
                            <span className="id-card-value">{selectedStudent.email}</span>
                          </div>
                          <div className="id-card-detail-row courses-row">
                            <span className="id-card-label">Courses:</span>
                            <div className="id-card-courses">
                              {selectedStudent.course && selectedStudent.course !== 'No courses enrolled' ? (
                                selectedStudent.course.split(', ').map((course, index) => (
                                  <span key={index} className="course-badge">{course}</span>
                                ))
                              ) : (
                                <span className="no-courses">No courses enrolled</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Photo Enrollment Section */}
              {selectedStudent && (
                <div className="form-card">
                  <div className="photo-tabs">
                    <button
                      className={`photo-tab ${photoTab === 'capture' ? 'active' : ''}`}
                      onClick={() => setPhotoTab('capture')}
                    >
                      Capture Photo
                    </button>
                    <button
                      className={`photo-tab ${photoTab === 'upload' ? 'active' : ''}`}
                      onClick={() => setPhotoTab('upload')}
                    >
                      Upload Photo
                    </button>
                  </div>

                  {photoTab === 'capture' && (
                    <div className="capture-photo-section">
                      <div className="camera-placeholder">
                        <FaUser className="camera-icon" />
                      </div>
                      <button className="take-photo-button">
                        Take Photo
                      </button>
                    </div>
                  )}

                  {photoTab === 'upload' && (
                    <div className="upload-photo-section">
                      <div className="status-box">
                        <div className="status-item checking">
                          <FaExclamationCircle className="status-icon" />
                          <span>Checking image: single face, image quality, alignment</span>
                        </div>
                        <div className="status-item success">
                          <FaCheckCircle className="status-icon" />
                          <span>Single face detected</span>
                        </div>
                        <div className="status-item success">
                          <FaCheckCircle className="status-icon" />
                          <span>Image quality: OK</span>
                        </div>
                      </div>
                      <button className="save-face-button">
                        Save Face Data
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'import' && (
            <div className="form-card">
              <h2 className="import-title">Import from Admin System</h2>
              <p className="import-subtitle">Import students via CSV / from central system</p>
              
              <div className="import-options">
                <div className="import-option">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="importMethod"
                      value="csv"
                      checked={importMethod === 'csv'}
                      onChange={(e) => setImportMethod(e.target.value)}
                      className="radio-input"
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-text">Upload CSV file</span>
                  </label>
                  {importMethod === 'csv' && (
                    <div className="file-upload-section">
                      <input
                        type="file"
                        id="csvFile"
                        accept=".csv"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        className="file-input"
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('csvFile').click()}
                        className="choose-file-button"
                      >
                        Choose file
                      </button>
                      {selectedFile && (
                        <span className="file-name">{selectedFile.name}</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="import-option">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="importMethod"
                      value="api"
                      checked={importMethod === 'api'}
                      onChange={(e) => setImportMethod(e.target.value)}
                      className="radio-input"
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-text">Connect to AdminSystem API(mock)</span>
                  </label>
                </div>
              </div>
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

export default Dashboard;

