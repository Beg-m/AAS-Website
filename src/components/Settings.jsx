import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaBook, 
  FaClipboardList, 
  FaChartBar,
  FaCog,
  FaUser,
  FaEdit
} from 'react-icons/fa';
import './Settings.css';

function Settings() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    console.log('Password update:', { currentPassword, newPassword, repeatPassword });
    // Password update logic will be implemented later
  };

  const handleLogout = () => {
    // Logout logic will be implemented later
    console.log('Logout clicked');
    // Navigate to login page
    navigate('/login');
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
          <div className="settings-header">
            <h1 className="settings-title">Setting/Profile</h1>
          </div>

          {/* Employee Information Card */}
          <div className="employee-info-card">
            <div className="employee-content">
              <div className="profile-photo">
                <FaUser className="profile-icon" />
              </div>
              <div className="employee-details">
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">Harvey</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Surname:</span>
                  <span className="detail-value">Collins</span>
                </div>
                <div className="detail-row">
                  <span className="admin-badge">Admin</span>
                </div>
              </div>
            </div>
            <button className="edit-profile-button">
              <FaEdit className="edit-icon" />
              Edit Profile
            </button>
          </div>

          {/* Change Password Section */}
          <div className="settings-section">
            <h2 className="section-title">Change Password</h2>
            <form className="password-form" onSubmit={handlePasswordUpdate}>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Repeat New Password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="update-password-button">
                Update Password
              </button>
            </form>
          </div>

          {/* Two-Factor Authentication Section */}
          <div className="settings-section">
            <div className="two-factor-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Enable Two-Factor Authentication</span>
              </label>
              <p className="two-factor-description">
                For higher security, login will require a one verification code.
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="settings-section">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
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

export default Settings;

