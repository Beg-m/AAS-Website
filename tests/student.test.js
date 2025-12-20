import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';

// Mock database - must be defined before importing routes
const mockPool = {
  query: vi.fn(),
  connect: vi.fn(),
};

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

describe('Student Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock implementations
    pool.query.mockClear();
    pool.connect.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/students - Fetch all students', () => {
    it('should successfully fetch all students', async () => {
      const mockStudents = [
        {
          student_id: '220706001',
          student_name: 'John',
          student_surname: 'Doe',
          student_email: 'john.doe@example.com',
          department: 'Computer Science',
        },
        {
          student_id: '220706002',
          student_name: 'Jane',
          student_surname: 'Smith',
          student_email: 'jane.smith@example.com',
          department: 'Mathematics',
        },
      ];

      pool.query.mockResolvedValue({ rows: mockStudents });

      const response = await request(app)
        .get('/api/students')
        .expect(200);

      expect(response.body).toEqual(mockStudents);
      expect(pool.query).toHaveBeenCalled();
    });

    it('should fetch students with search query', async () => {
      const mockStudents = [
        {
          student_id: '220706001',
          student_name: 'John',
          student_surname: 'Doe',
          student_email: 'john.doe@example.com',
          department: 'Computer Science',
        },
      ];

      pool.query.mockResolvedValue({ rows: mockStudents });

      const response = await request(app)
        .get('/api/students?search=John')
        .expect(200);

      expect(response.body).toEqual(mockStudents);
      expect(pool.query).toHaveBeenCalled();
    });

    it('should handle database errors when fetching students', async () => {
      const errorMessage = 'Database connection failed';
      pool.query.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .get('/api/students')
        .expect(500);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe(errorMessage);
    });
  });

  describe('POST /api/students - Create student', () => {
    it('should successfully create a student with valid input', async () => {
      const mockClient = {
        query: vi.fn(),
        release: vi.fn(),
      };

      pool.connect.mockResolvedValue(mockClient);
      
      // Mock department query
      mockClient.query
        .mockResolvedValueOnce({ rows: [{ department_id: 1 }] }) // BEGIN
        .mockResolvedValueOnce({ rows: [{ department_id: 1 }] }) // Department check
        .mockResolvedValueOnce({ rows: [{ student_id: '220706001' }] }) // Insert student
        .mockResolvedValueOnce({ rows: [] }); // COMMIT

      const studentData = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        department: 'Computer Science',
      };

      const response = await request(app)
        .post('/api/students')
        .send(studentData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('student_id');
      expect(mockClient.query).toHaveBeenCalled();
    });

    it('should return validation error when required fields are missing', async () => {
      const mockClient = {
        query: vi.fn(),
        release: vi.fn(),
      };

      pool.connect.mockResolvedValue(mockClient);
      mockClient.query.mockResolvedValueOnce({ rows: [] }); // BEGIN
      mockClient.query.mockResolvedValueOnce({ rows: [] }); // ROLLBACK

      const invalidData = {
        name: 'John',
        // Missing surname, email, department
      };

      const response = await request(app)
        .post('/api/students')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Missing required fields');
    });

    it('should return error when department does not exist', async () => {
      const mockClient = {
        query: vi.fn(),
        release: vi.fn(),
      };

      pool.connect.mockResolvedValue(mockClient);
      mockClient.query
        .mockResolvedValueOnce({ rows: [] }) // BEGIN
        .mockResolvedValueOnce({ rows: [] }) // Department check - not found
        .mockResolvedValueOnce({ rows: [] }); // ROLLBACK

      const studentData = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        department: 'NonExistent Department',
      };

      const response = await request(app)
        .post('/api/students')
        .send(studentData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('not found');
    });
  });

  describe('GET /api/students/:id - Get student by ID', () => {
    it('should successfully fetch a student by ID', async () => {
      const mockStudent = {
        student_id: '220706001',
        student_name: 'John',
        student_surname: 'Doe',
        student_email: 'john.doe@example.com',
        department: 'Computer Science',
      };

      pool.query.mockResolvedValue({ rows: [mockStudent] });

      const response = await request(app)
        .get('/api/students/220706001')
        .expect(200);

      expect(response.body).toEqual(mockStudent);
      expect(pool.query).toHaveBeenCalled();
    });

    it('should return 404 when student is not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const response = await request(app)
        .get('/api/students/999999999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Student not found');
    });
  });
});

