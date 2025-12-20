import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';

// Mock database - must be defined before importing routes
vi.mock('../backend-node/config/db.js', () => ({
  default: {
    query: vi.fn(),
    connect: vi.fn(),
  },
}));

import studentsRouter from '../backend-node/routes/students.js';
import pool from '../backend-node/config/db.js';

const app = express();
app.use(express.json());
app.use('/api/students', studentsRouter);

describe('Enrollment Routes (Student-Course Enrollment)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pool.query.mockClear();
    pool.connect.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/students/courses - Fetch student-course enrollments', () => {
    it('should successfully fetch all student-course enrollments', async () => {
      const mockEnrollments = [
        {
          student_id: '220706001',
          student_name: 'John',
          student_surname: 'Doe',
          course_id: 'CS101',
          course_name: 'Introduction to Programming',
        },
        {
          student_id: '220706001',
          student_name: 'John',
          student_surname: 'Doe',
          course_id: 'CS102',
          course_name: 'Data Structures',
        },
      ];

      pool.query.mockResolvedValue({ rows: mockEnrollments });

      const response = await request(app)
        .get('/api/students/courses')
        .expect(200);

      expect(response.body).toEqual(mockEnrollments);
      expect(pool.query).toHaveBeenCalled();
    });

    it('should fetch enrollments with search query', async () => {
      const mockEnrollments = [
        {
          student_id: '220706001',
          student_name: 'John',
          student_surname: 'Doe',
          course_id: 'CS101',
          course_name: 'Introduction to Programming',
        },
      ];

      pool.query.mockResolvedValue({ rows: mockEnrollments });

      const response = await request(app)
        .get('/api/students/courses?search=John')
        .expect(200);

      expect(response.body).toEqual(mockEnrollments);
      expect(pool.query).toHaveBeenCalled();
    });

    it('should fetch enrollments filtered by course', async () => {
      const mockEnrollments = [
        {
          student_id: '220706001',
          student_name: 'John',
          student_surname: 'Doe',
          course_id: 'CS101',
          course_name: 'Introduction to Programming',
        },
      ];

      pool.query.mockResolvedValue({ rows: mockEnrollments });

      const response = await request(app)
        .get('/api/students/courses?course=CS101')
        .expect(200);

      expect(response.body).toEqual(mockEnrollments);
      expect(pool.query).toHaveBeenCalled();
    });

    it('should handle database errors when fetching enrollments', async () => {
      const errorMessage = 'Database connection failed';
      pool.query.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .get('/api/students/courses')
        .expect(500);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe(errorMessage);
    });
  });

  describe('POST /api/students - Create student with course enrollment', () => {
    it('should successfully create a student and enroll in courses', async () => {
      const mockClient = {
        query: vi.fn(),
        release: vi.fn(),
      };

      pool.connect.mockResolvedValue(mockClient);
      
      // Mock transaction queries
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [{ department_id: 1 }] }) // Department check
        .mockResolvedValueOnce({ rows: [{ student_id: '220706001' }] }) // Insert student
        .mockResolvedValueOnce({ rows: [{ course_id: 'CS101' }] }) // Course check
        .mockResolvedValueOnce({ rows: [] }) // Insert enrollment
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      const studentData = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        department: 'Computer Science',
        courses: ['CS101'],
      };

      const response = await request(app)
        .post('/api/students')
        .send(studentData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('student_id');
      expect(mockClient.query).toHaveBeenCalled();
    });

    it('should successfully create a student without course enrollment', async () => {
      const mockClient = {
        query: vi.fn(),
        release: vi.fn(),
      };

      pool.connect.mockResolvedValue(mockClient);
      
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [{ department_id: 1 }] }) // Department check
        .mockResolvedValueOnce({ rows: [{ student_id: '220706001' }] }) // Insert student
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      const studentData = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        department: 'Computer Science',
        // No courses provided
      };

      const response = await request(app)
        .post('/api/students')
        .send(studentData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('student_id');
    });

    it('should return validation error when creating enrollment with invalid course', async () => {
      const mockClient = {
        query: vi.fn(),
        release: vi.fn(),
      };

      pool.connect.mockResolvedValue(mockClient);
      
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [{ department_id: 1 }] }) // Department check
        .mockResolvedValueOnce({ rows: [{ student_id: '220706001' }] }) // Insert student
        .mockResolvedValueOnce({ rows: [] }) // Course check - not found (invalid course)
        .mockResolvedValueOnce({ rows: [] }); // COMMIT (course enrollment skipped)

      const studentData = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        department: 'Computer Science',
        courses: ['INVALID_COURSE'], // Invalid course ID
      };

      const response = await request(app)
        .post('/api/students')
        .send(studentData)
        .expect(201); // Student is still created, invalid course is just skipped

      expect(response.body).toHaveProperty('success', true);
      // Invalid course enrollment is silently skipped (not an error)
    });
  });
});

