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
  FaChevronDown,
  FaFilePdf,
  FaFileExcel
} from 'react-icons/fa';
import './Reports.css';

// Sample report data
const reportOutputData = [
  { course: 'Design Studio', startDate: '15.10.2025', endDate: '15.01.2026' },
  { course: 'Software Architecture', startDate: '10.10.2025', endDate: '10.01.2026' },
  { course: 'Human Anatomy', startDate: '12.10.2025', endDate: '12.02.2026' },
  { course: 'Operations Research', startDate: '05.10.2025', endDate: '05.01.2026' },
  { course: 'Circuit Analysis', startDate: '08.10.2025', endDate: '08.01.2026' }
];

const attendanceRateData = [
  { course: 'Design Studio', rate: 87 },
  { course: 'Software Architecture', rate: 92 },
  { course: 'Human Anatomy', rate: 78 },
  { course: 'Operations Research', rate: 85 },
  { course: 'Circuit Analysis', rate: 90 }
];

function Reports() {
  const location = useLocation();
  const [reportType, setReportType] = useState('Attendance sum...');
  const [selectedCourse, setSelectedCourse] = useState('Course');
  const [selectedDepartment, setSelectedDepartment] = useState('Department');
  const [dateRange, setDateRange] = useState('15.11.2025');

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
                  <option value="Course">Course</option>
                  <option value="Design Studio">Design Studio</option>
                  <option value="Software Architecture">Software Architecture</option>
                  <option value="Human Anatomy">Human Anatomy</option>
                  <option value="Operations Research">Operations Research</option>
                  <option value="Circuit Analysis">Circuit Analysis</option>
                </select>
                <FaChevronDown className="select-arrow" />
              </div>
              <div className="select-wrapper">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="filter-select"
                >
                  <option value="Department">Department</option>
                  <option value="Software Eng.">Software Eng.</option>
                  <option value="Computer Eng.">Computer Eng.</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Industrial Eng.">Industrial Eng.</option>
                  <option value="Electrical Eng.">Electrical Eng.</option>
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
              <button className="filter-button">Filter</button>
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
                    {reportOutputData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.course}</td>
                        <td>{row.startDate}</td>
                        <td>{row.endDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Attendance Rate Card */}
            <div className="report-card">
              <h2 className="card-title">Attendance Rate</h2>
              <div className="attendance-rate-list">
                {attendanceRateData.map((item, index) => (
                  <div key={index} className="rate-item">
                    <span className="rate-course">{item.course}</span>
                    <span className="rate-percentage">{item.rate}%</span>
                  </div>
                ))}
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

