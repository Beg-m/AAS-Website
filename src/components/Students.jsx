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
import { studentsAPI, departmentsAPI, coursesAPI } from '../utils/api';
import './Students.css';
function Students() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [viewMode, setViewMode] = useState('students');
  const [students, setStudents] = useState([]);
  const [studentsCourses, setStudentsCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDepartments();
    loadCourses();
    // Initial load - show all students and courses
    const initialLoad = async () => {
      setLoading(true);
      try {
        const [studentsData, coursesData] = await Promise.all([
          studentsAPI.getAll('', ''),
          studentsAPI.getStudentsCourses('', '')
        ]);
        console.log('Initial load - Students:', studentsData, 'Courses:', coursesData);
        console.log('Students count:', studentsData?.length, 'Courses count:', coursesData?.length);
        setStudents(Array.isArray(studentsData) ? studentsData : []);
        setStudentsCourses(Array.isArray(coursesData) ? coursesData : []);
      } catch (error) {
        console.error('Error in initial load:', error);
        setStudents([]);
        setStudentsCourses([]);
      } finally {
        setLoading(false);
      }
    };
    initialLoad();
  }, []);

  // Reload data when navigating to this page
  useEffect(() => {
    if (location.pathname === '/students') {
      if (viewMode === 'courses') {
        loadStudentsCourses();
      } else {
        loadStudents();
      }
    }
  }, [location.pathname]);

  // Reload data when page becomes visible (for auto-refresh after student creation)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        if (viewMode === 'courses') {
          loadStudentsCourses();
        } else {
          loadStudents();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also reload when window gains focus
    const handleFocus = () => {
      if (viewMode === 'courses') {
        loadStudentsCourses();
      } else {
        loadStudents();
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [viewMode]);

  const handleSearch = () => {
    if (viewMode === 'students') {
      loadStudents();
    } else {
      loadStudentsCourses();
    }
  };

  // Auto-search with debounce when search query or filters change
  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      try {
        if (viewMode === 'students') {
          console.log('Auto-loading students with search:', searchQuery, 'department:', selectedDepartment);
          const data = await studentsAPI.getAll(searchQuery || '', selectedDepartment || '');
          console.log('Students loaded:', data);
          setStudents(Array.isArray(data) ? data : []);
        } else {
          console.log('Auto-loading students courses with search:', searchQuery, 'course:', selectedCourse);
          const data = await studentsAPI.getStudentsCourses(searchQuery || '', selectedCourse || '');
          console.log('Students courses loaded:', data, 'Type:', typeof data, 'IsArray:', Array.isArray(data));
          setStudentsCourses(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        if (viewMode === 'students') {
          setStudents([]);
        } else {
          setStudentsCourses([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedDepartment, selectedCourse, viewMode]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Remove duplicate useEffect - already handled in the debounce useEffect above

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
    setLoading(true);
    try {
      // Use current state values directly
      const currentSearch = searchQuery;
      const currentDept = selectedDepartment;
      console.log('Loading students with search:', currentSearch, 'department:', currentDept);
      const data = await studentsAPI.getAll(currentSearch, currentDept);
      console.log('Students loaded:', data);
      setStudents(data || []);
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const loadStudentsCourses = async () => {
    setLoading(true);
    try {
      // Use current state values directly
      const currentSearch = searchQuery;
      const currentCourse = selectedCourse;
      console.log('Loading students courses with search:', currentSearch, 'course:', currentCourse);
      const data = await studentsAPI.getStudentsCourses(currentSearch, currentCourse);
      console.log('Students courses loaded:', data);
      setStudentsCourses(data || []);
    } catch (error) {
      console.error('Error loading students courses:', error);
      setStudentsCourses([]);
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
          <div className="students-header">
            <h1 className="students-title">
              {viewMode === 'students' ? 'Students' : 'Students & Courses'}
            </h1>
            <div className="view-toggle">
              <button 
                className={`toggle-button ${viewMode === 'students' ? 'active' : ''}`}
                onClick={() => setViewMode('students')}
              >
                Students
              </button>
              <button 
                className={`toggle-button ${viewMode === 'courses' ? 'active' : ''}`}
                onClick={() => setViewMode('courses')}
              >
                Students & Courses
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          {viewMode === 'students' ? (
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
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <button className="search-button" onClick={handleSearch}>Search</button>
              </div>
            </div>
          ) : (
            <div className="search-filter-section">
              <div className="filter-group">
                <div className="search-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search name, surname, ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <FaChevronDown className="select-arrow" style={{ right: '1rem' }} />
                </div>
                <div className="select-wrapper">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="department-select"
                  >
                    <option value="">Course</option>
                    {courses.map(course => (
                      <option key={course.course_id} value={course.course_id}>
                        {course.course_id} - {course.course_name}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="select-arrow" />
                </div>
                <button className="search-button" onClick={handleSearch}>Search</button>
              </div>
            </div>
          )}

          {/* Table */}
          {viewMode === 'students' ? (
            <div className="table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Photo Path</th>
                    <th>Face Data</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No students found</td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student.student_id}>
                        <td>{student.student_id.toString().padStart(2, '0')}</td>
                        <td>{student.student_name}</td>
                        <td>{student.student_surname}</td>
                        <td>{student.student_email}</td>
                        <td>{student.department}</td>
                        <td className="photo-path">{student.photo_path || 'N/A'}</td>
                        <td className="face-data">{student.face_data ? student.face_data.substring(0, 30) + '...' : 'N/A'}</td>
                        <td>
                          {student.face_data ? (
                            <a href="#" className="view-link">view &gt;</a>
                          ) : (
                            <button className="enroll-face-button">Enroll Face</button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Student Surname</th>
                    <th>Course ID</th>
                    <th>Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td>
                    </tr>
                  ) : studentsCourses.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No data found</td>
                    </tr>
                  ) : (
                    studentsCourses.map((item, index) => (
                      <tr key={`${item.student_id}-${item.course_id}-${index}`}>
                        <td>{String(item.student_id || '').padStart(2, '0')}</td>
                        <td>{item.student_name || 'N/A'}</td>
                        <td>{item.student_surname || 'N/A'}</td>
                        <td className="course-id">{item.course_id || 'N/A'}</td>
                        <td>{item.course_name || 'N/A'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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

export default Students;

