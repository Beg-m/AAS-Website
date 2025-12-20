import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';

// Mock database - must be defined before importing routes
vi.mock('../backend-node/config/db.js', () => ({
  default: {
    query: vi.fn(),
  },
}));

import coursesRouter from '../backend-node/routes/courses.js';
import pool from '../backend-node/config/db.js';

const app = express();
app.use(express.json());
app.use('/api/courses', coursesRouter);

describe('Course Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    pool.query.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/courses - Fetch all courses', () => {
    it('should successfully fetch all courses', async () => {
      const mockCourses = [
        {
          course_id: 'CS101',
          course_name: 'Introduction to Programming',
          instructor_id: 'INS001',
          instructor_name: 'John',
          instructor_surname: 'Smith',
        },
        {
          course_id: 'CS102',
          course_name: 'Data Structures',
          instructor_id: 'INS002',
          instructor_name: 'Jane',
          instructor_surname: 'Doe',
        },
      ];

      pool.query.mockResolvedValue({ rows: mockCourses });

      const response = await request(app)
        .get('/api/courses')
        .expect(200);

      expect(response.body).toEqual(mockCourses);
      expect(pool.query).toHaveBeenCalled();
    });

    it('should fetch courses with search query', async () => {
      const mockCourses = [
        {
          course_id: 'CS101',
          course_name: 'Introduction to Programming',
          instructor_id: 'INS001',
        },
      ];

      pool.query.mockResolvedValue({ rows: mockCourses });

      const response = await request(app)
        .get('/api/courses?search=CS101')
        .expect(200);

      expect(response.body).toEqual(mockCourses);
      expect(pool.query).toHaveBeenCalled();
    });

    it('should handle database errors when fetching courses', async () => {
      const errorMessage = 'Database connection failed';
      pool.query.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .get('/api/courses')
        .expect(500);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe(errorMessage);
    });
  });

  describe('POST /api/courses - Create course', () => {
    it('should successfully create a course with valid input', async () => {
      // Mock course check (not exists)
      pool.query
        .mockResolvedValueOnce({ rows: [] }) // Course ID check
        .mockResolvedValueOnce({ rows: [{ instructor_id: 'INS001' }] }) // Instructor check
        .mockResolvedValueOnce({ rows: [{ course_id: 'CS101' }] }); // Insert course

      const courseData = {
        course_id: 'CS101',
        course_name: 'Introduction to Programming',
        instructor_id: 'INS001',
      };

      const response = await request(app)
        .post('/api/courses')
        .send(courseData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('course_id', 'CS101');
      expect(pool.query).toHaveBeenCalledTimes(3);
    });

    it('should return validation error when required fields are missing', async () => {
      const invalidData = {
        course_id: 'CS101',
        // Missing course_name and instructor_id
      };

      const response = await request(app)
        .post('/api/courses')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Missing required fields');
      expect(pool.query).not.toHaveBeenCalled();
    });

    it('should return error when course ID already exists', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ course_id: 'CS101' }] }); // Course exists

      const courseData = {
        course_id: 'CS101',
        course_name: 'Introduction to Programming',
        instructor_id: 'INS001',
      };

      const response = await request(app)
        .post('/api/courses')
        .send(courseData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Course ID already exists');
    });

    it('should return error when instructor does not exist', async () => {
      pool.query
        .mockResolvedValueOnce({ rows: [] }) // Course ID check - not exists
        .mockResolvedValueOnce({ rows: [] }); // Instructor check - not found

      const courseData = {
        course_id: 'CS101',
        course_name: 'Introduction to Programming',
        instructor_id: 'NONEXISTENT',
      };

      const response = await request(app)
        .post('/api/courses')
        .send(courseData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Instructor not found');
    });
  });

  describe('DELETE /api/courses/:id - Delete course', () => {
    it('should successfully delete a course', async () => {
      pool.query.mockResolvedValue({ rows: [{ course_id: 'CS101' }] });

      const response = await request(app)
        .delete('/api/courses/CS101')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(pool.query).toHaveBeenCalled();
    });

    it('should return 404 when course is not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      const response = await request(app)
        .delete('/api/courses/NONEXISTENT')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Course not found');
    });
  });
});

