import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { search, instructor_id } = req.query;
    
    let query = `
      SELECT c.course_id, c.course_name, c.instructor_id,
             i.instructor_name, i.instructor_surname
      FROM course c
      LEFT JOIN instructor i ON c.instructor_id = i.instructor_id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (search) {
      query += ` AND (c.course_id ILIKE $${paramCount} OR c.course_name ILIKE $${paramCount + 1} OR CAST(c.instructor_id AS TEXT) ILIKE $${paramCount + 2})`;
      params.push(`%${search}%`);
      params.push(`%${search}%`);
      params.push(`%${search}%`);
      paramCount += 3;
    }

    if (instructor_id) {
      query += ` AND c.instructor_id = $${paramCount}`;
      params.push(parseInt(instructor_id));
      paramCount++;
    }

    query += ' ORDER BY c.course_id';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

