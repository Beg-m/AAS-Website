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
import { studentsAPI, departmentsAPI, coursesAPI } from '../utils/api';
import './AddStudent.css';

function AddStudent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('manual');
  
  // Form states
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    surname: '',
    department: '',
    courses: [],
    email: ''
  });
  
  // Face enrollment states
  const [selectedStudent, setSelectedStudent] = useState('');
  const [facePhoto, setFacePhoto] = useState(null);
  const [facePhotoPreview, setFacePhotoPreview] = useState('');
  
  // Import states
  const [importFile, setImportFile] = useState(null);
  const [importPreview, setImportPreview] = useState([]);
  
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadDepartments();
    loadCourses();
    loadStudents();
  }, []);

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
      setCourses(coursesData);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const loadStudents = async () => {
    try {
      const studentsData = await studentsAPI.getAll();
      setStudents(studentsData);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  // Face enrollment handlers
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFacePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFacePhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaceEnrollment = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!selectedStudent || !facePhoto) {
        setError('Please select a student and upload a photo');
        setLoading(false);
        return;
      }

      // TODO: Implement face enrollment API call
      console.log('Face enrollment for student:', selectedStudent, facePhoto);
      
      setSuccess('Face data enrolled successfully!');
      setSelectedStudent('');
      setFacePhoto(null);
      setFacePhotoPreview('');

    } catch (error) {
      console.error('Error enrolling face:', error);
      setError(error.message || 'Failed to enroll face data');
    } finally {
      setLoading(false);
    }
  };

  // Import handlers
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImportFile(file);
      // Parse CSV/Excel file for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target.result;
          const lines = text.split('\n');
          const preview = lines.slice(0, 6).map(line => line.split(','));
          setImportPreview(preview);
        } catch (error) {
          console.error('Error parsing file:', error);
          setError('Failed to parse file. Please use CSV format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImport = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!importFile) {
        setError('Please select a file to import');
        setLoading(false);
        return;
      }

      // TODO: Implement bulk import API call
      console.log('Importing students from file:', importFile);
      
      setSuccess(`Successfully imported students from ${importFile.name}`);
      setImportFile(null);
      setImportPreview([]);

    } catch (error) {
      console.error('Error importing students:', error);
      setError(error.message || 'Failed to import students');
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const template = 'student_id,name,surname,email,department_id\n220706001,John,Doe,john@example.com,1\n220706002,Jane,Smith,jane@example.com,2';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      courses: selectedOptions
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate form
      if (!formData.student_id || !formData.name || !formData.surname || !formData.department || !formData.email) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Submit to API
      const studentData = {
        student_id: formData.student_id,
        student_name: formData.name,
        student_surname: formData.surname,
        student_email: formData.email,
        department_id: formData.department,
        courses: formData.courses
      };

      await studentsAPI.create(studentData);
      setSuccess('Student added successfully!');
      
      // Reset form
      setFormData({
        student_id: '',
        name: '',
        surname: '',
        department: '',
        courses: [],
        email: ''
      });

      // Navigate back to students page after 2 seconds
      setTimeout(() => {
        navigate('/students');
      }, 2000);

    } catch (error) {
      console.error('Error adding student:', error);
      setError(error.message || 'Failed to add student');
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
          <button className="back-button" onClick={() => navigate('/students')}>
            <FaArrowLeft /> Back to Students
          </button>

          {/* Tabs */}
          <div className="add-student-tabs">
            <button 
              className={`tab-button ${activeTab === 'manual' ? 'active' : ''}`}
              onClick={() => setActiveTab('manual')}
            >
              Add Student Manually
            </button>
            <button 
              className={`tab-button ${activeTab === 'face' ? 'active' : ''}`}
              onClick={() => setActiveTab('face')}
            >
              Face Enrollment
            </button>
            <button 
              className={`tab-button ${activeTab === 'import' ? 'active' : ''}`}
              onClick={() => setActiveTab('import')}
            >
              Import from Admin System
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'manual' && (
            <div className="tab-content">
              <h2 className="form-title">Add Student Manually</h2>
              
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <form onSubmit={handleSubmit} className="add-student-form">
                <div className="form-group">
                  <label htmlFor="student_id">Student ID</label>
                  <input
                    type="text"
                    id="student_id"
                    name="student_id"
                    value={formData.student_id}
                    onChange={handleInputChange}
                    placeholder="Enter student ID"
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

                <div className="form-group">
                  <label htmlFor="courses">Courses</label>
                  <select
                    id="courses"
                    name="courses"
                    multiple
                    value={formData.courses}
                    onChange={handleCourseSelect}
                    className="courses-select"
                  >
                    <option value="" disabled>Select courses (hold Ctrl/Cmd for multiple)</option>
                    {courses.map(course => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_id} - {course.course_name}
                      </option>
                    ))}
                  </select>
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

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Student'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'face' && (
            <div className="tab-content">
              <h2 className="form-title">Face Enrollment</h2>
              
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <form onSubmit={handleFaceEnrollment} className="add-student-form">
                <div className="form-group">
                  <label htmlFor="selectedStudent">Select Student</label>
                  <select
                    id="selectedStudent"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    required
                  >
                    <option value="">Select a student</option>
                    {students.map(student => (
                      <option key={student.student_id} value={student.student_id}>
                        {student.student_id} - {student.student_name} {student.student_surname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="facePhoto">Upload Face Photo</label>
                  <input
                    type="file"
                    id="facePhoto"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    required
                  />
                  <p className="helper-text">Upload a clear front-facing photo for facial recognition</p>
                </div>

                {facePhotoPreview && (
                  <div className="photo-preview">
                    <label>Photo Preview:</label>
                    <img src={facePhotoPreview} alt="Face preview" className="preview-image" />
                  </div>
                )}

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Processing...' : 'Enroll Face Data'}
                </button>
              </form>

              <div className="info-box">
                <h3>Face Enrollment Requirements:</h3>
                <ul>
                  <li>Photo must be clear and well-lit</li>
                  <li>Face should be front-facing</li>
                  <li>No glasses or face coverings</li>
                  <li>Neutral expression recommended</li>
                  <li>Supported formats: JPG, PNG</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="tab-content">
              <h2 className="form-title">Import from Admin System</h2>
              
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="import-section">
                <div className="import-header">
                  <p>Upload a CSV file to import multiple students at once</p>
                  <button 
                    type="button" 
                    className="download-template-button"
                    onClick={downloadTemplate}
                  >
                    📥 Download CSV Template
                  </button>
                </div>

                <form onSubmit={handleImport} className="add-student-form">
                  <div className="form-group">
                    <label htmlFor="importFile">Select CSV File</label>
                    <input
                      type="file"
                      id="importFile"
                      accept=".csv,.xlsx"
                      onChange={handleFileUpload}
                      required
                    />
                    <p className="helper-text">
                      File should contain: student_id, name, surname, email, department_id
                    </p>
                  </div>

                  {importPreview.length > 0 && (
                    <div className="import-preview">
                      <h3>File Preview (First 5 rows):</h3>
                      <div className="preview-table-container">
                        <table className="preview-table">
                          <tbody>
                            {importPreview.map((row, index) => (
                              <tr key={index} className={index === 0 ? 'header-row' : ''}>
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="submit-button" disabled={loading || !importFile}>
                    {loading ? 'Importing...' : 'Import Students'}
                  </button>
                </form>

                <div className="info-box">
                  <h3>Import Instructions:</h3>
                  <ul>
                    <li>Download the CSV template above</li>
                    <li>Fill in student information (one student per row)</li>
                    <li>Make sure student IDs are unique</li>
                    <li>Department IDs must match existing departments</li>
                    <li>Save the file and upload it here</li>
                  </ul>
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

export default AddStudent;

