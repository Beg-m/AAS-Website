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
  FaChevronDown,
  FaFilePdf,
  FaFileExcel
} from 'react-icons/fa';
import { reportsAPI, coursesAPI, departmentsAPI } from '../utils/api';
import './Reports.css';

function Reports() {
  const location = useLocation();
  const [reportType, setReportType] = useState('Attendance sum...');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [dateRange, setDateRange] = useState('15.11.2025');
  const [reportOutputData, setReportOutputData] = useState([]);
  const [attendanceRateData, setAttendanceRateData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
    loadDepartments();
    loadReports();
  }, []);

  useEffect(() => {
    loadReports();
  }, [selectedCourse, selectedDepartment]);

  const loadCourses = async () => {
    try {
      const data = await coursesAPI.getAll();
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const loadDepartments = async () => {
    try {
      const data = await departmentsAPI.getAll();
      setDepartments(data);
    } catch (error) {
      console.error('Error loading departments:', error);
    }
  };

  const loadReports = async () => {
    setLoading(true);
    try {
      const [summary, rates] = await Promise.all([
        reportsAPI.getAttendanceSummary(selectedCourse, selectedDepartment),
        reportsAPI.getAttendanceRate(selectedCourse, selectedDepartment)
      ]);
      setReportOutputData(summary);
      setAttendanceRateData(rates);
    } catch (error) {
      console.error('Error loading reports:', error);
      setReportOutputData([]);
      setAttendanceRateData([]);
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
          <div className="reports-header">
            <h1 className="reports-title">Reports</h1>
          </div>

          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-group">
              <div className="select-wrapper">
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="filter-select"
                >
                  <option value="Attendance sum...">Attendance sum...</option>
                  <option value="Daily Attendance">Daily Attendance</option>
                  <option value="Weekly Attendance">Weekly Attendance</option>
                  <option value="Monthly Attendance">Monthly Attendance</option>
                </select>
                <FaChevronDown className="select-arrow" />
              </div>
              <div className="select-wrapper">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Course</option>
                  {courses.map(course => (
                    <option key={course.course_id} value={course.course_name}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="select-arrow" />
              </div>
              <div className="select-wrapper">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Department</option>
                  {departments.map(dept => (
                    <option key={dept.department_id} value={dept.department_name}>
                      {dept.department_name}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="select-arrow" />
              </div>
              <div className="select-wrapper">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="filter-select"
                >
                  <option value="15.11.2025">15.11.2025</option>
                  <option value="16.11.2025">16.11.2025</option>
                  <option value="17.11.2025">17.11.2025</option>
                </select>
                <FaChevronDown className="select-arrow" />
              </div>
              <button className="filter-button" onClick={loadReports}>Filter</button>
            </div>
          </div>

          {/* Report Cards */}
          <div className="reports-grid">
            {/* Report Output Card */}
            <div className="report-card">
              <h2 className="card-title">Report Output</h2>
              <div className="table-container">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td>
                      </tr>
                    ) : reportOutputData.length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No data available</td>
                      </tr>
                    ) : (
                      reportOutputData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.course}</td>
                          <td>{row.startDate}</td>
                          <td>{row.endDate}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Attendance Rate Card */}
            <div className="report-card">
              <h2 className="card-title">Attendance Rate</h2>
              <div className="attendance-rate-list">
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
                ) : attendanceRateData.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>No data available</div>
                ) : (
                  attendanceRateData.map((item, index) => (
                    <div key={index} className="rate-item">
                      <span className="rate-course">{item.course}</span>
                      <span className="rate-percentage">{item.rate}%</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Export Report Card */}
          <div className="report-card export-card">
            <h2 className="card-title">Report Output</h2>
            <div className="export-buttons">
              <button className="export-button pdf-button">
                <FaFilePdf className="export-icon" />
                <span>Export as PDF</span>
              </button>
              <button className="export-button excel-button">
                <FaFileExcel className="export-icon" />
                <span>Export as EXCEL</span>
              </button>
            </div>
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

export default Reports;

