import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Students from './components/Students'
import AddStudent from './components/AddStudent'
import Instructors from './components/Instructors'
import AddInstructor from './components/AddInstructor'
import Courses from './components/Courses'
import AddCourse from './components/AddCourse'
import Attendance from './components/Attendance'
import Reports from './components/Reports'
import Settings from './components/Settings'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/instructors" element={<Instructors />} />
        <Route path="/instructors/add" element={<AddInstructor />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/add" element={<AddCourse />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
