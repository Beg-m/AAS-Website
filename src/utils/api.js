const API_BASE_URL = '/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      const errorMessage = data.error || data.message || `API request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    // If it's already an Error object, re-throw it
    if (error instanceof Error) {
      throw error;
    }
    // Otherwise, wrap it in an Error
    throw new Error(error.message || 'Network error or API unavailable');
  }
}

// Authentication API
export const authAPI = {
  login: async (username, password) => {
    return apiCall('/login', {
      method: 'POST',
      body: { username, password },
    });
  },
  register: async (username, password, email, firstName, lastName) => {
    return apiCall('/register', {
      method: 'POST',
      body: { username, password, email, firstName, lastName },
    });
  },
};

// Students API
export const studentsAPI = {
  getAll: async (search = '', department = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (department) params.append('department', department);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall(`/students${query}`);
  },
  getById: async (id) => {
    return apiCall(`/students/${id}`);
  },
  create: async (studentData) => {
    return apiCall('/students', {
      method: 'POST',
      body: studentData,
    });
  },
  update: async (id, studentData) => {
    return apiCall(`/students/${id}`, {
      method: 'PUT',
      body: studentData,
    });
  },
  delete: async (id) => {
    return apiCall(`/students/${id}`, {
      method: 'DELETE',
    });
  },
  getStudentsCourses: async (search = '', course = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (course) params.append('course', course);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall(`/students/courses${query}`);
  },
};

// Instructors API
export const instructorsAPI = {
  getAll: async (search = '', department = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (department) params.append('department', department);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall(`/instructors${query}`);
  },
  create: async (instructorData) => {
    return apiCall('/instructors', {
      method: 'POST',
      body: instructorData,
    });
  },
  delete: async (id) => {
    return apiCall(`/instructors/${id}`, {
      method: 'DELETE',
    });
  },
};

// Courses API
export const coursesAPI = {
  getAll: async (search = '', instructorId = '') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (instructorId) params.append('instructor_id', instructorId);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall(`/courses${query}`);
  },
  create: async (courseData) => {
    return apiCall('/courses', {
      method: 'POST',
      body: courseData,
    });
  },
  delete: async (id) => {
    return apiCall(`/courses/${id}`, {
      method: 'DELETE',
    });
  },
};

// Attendance API
export const attendanceAPI = {
  getAll: async (nameSurname = '', course = '', date = '', search = '') => {
    const params = new URLSearchParams();
    if (nameSurname) params.append('name_surname', nameSurname);
    if (course) params.append('course', course);
    if (date) params.append('date', date);
    if (search) params.append('search', search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall(`/attendance${query}`);
  },
  create: async (attendanceData) => {
    return apiCall('/attendance', {
      method: 'POST',
      body: attendanceData,
    });
  },
};

// Reports API
export const reportsAPI = {
  getAttendanceSummary: async (course = '', department = '', startDate = '', endDate = '') => {
    const params = new URLSearchParams();
    if (course) params.append('course', course);
    if (department) params.append('department', department);
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall(`/reports/attendance-summary${query}`);
  },
  getAttendanceRate: async (course = '', department = '') => {
    const params = new URLSearchParams();
    if (course) params.append('course', course);
    if (department) params.append('department', department);
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall(`/reports/attendance-rate${query}`);
  },
};

// Departments API
export const departmentsAPI = {
  getAll: async () => {
    return apiCall('/departments');
  },
};

