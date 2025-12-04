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
  FaUser,
  FaCheckCircle,
  FaExclamationCircle,
  FaCamera
} from 'react-icons/fa';
import './Dashboard.css';

function Dashboard() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('manual');
  const [photoTab, setPhotoTab] = useState('capture');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [importMethod, setImportMethod] = useState('csv');
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    surname: '',
    department: '',
    email: ''
  });

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
      email: ''
    });
    if (tab === 'face') {
      setSelectedStudent(sampleStudent);
    } else {
      setSelectedStudent(null);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setSelectedStudent(sampleStudent);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Form submission logic will be implemented later
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
                    >
                      <option value="">Select department</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="engineering">Engineering</option>
                      <option value="business">Business</option>
                      <option value="arts">Arts</option>
                    </select>
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

                <button type="submit" className="save-button">
                  Save Student
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

                {/* Student Information Card */}
                {selectedStudent && (
                  <div className="student-info-card">
                    <div className="student-photo-section">
                      <div className="student-photo">
                        <FaUser className="photo-placeholder-icon" />
                      </div>
                      <div className="student-name">{selectedStudent.name}</div>
                    </div>
                    <div className="student-details">
                      <div className="detail-item">
                        <span className="detail-label">Student ID:</span>
                        <span className="detail-value">{selectedStudent.id}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">E-mail:</span>
                        <span className="detail-value">{selectedStudent.email}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Enrolled Course:</span>
                        <span className="detail-value">{selectedStudent.course}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Department:</span>
                        <span className="detail-value">{selectedStudent.department}</span>
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

