import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all instructors
router.get('/', async (req, res) => {
  try {
    const { search, department } = req.query;
    
    let query = `
      SELECT i.instructor_id, i.instructor_name, i.instructor_surname,
             i.instructor_email, d.department_name as department
      FROM instructor i
      LEFT JOIN department d ON i.department_id = d.department_id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (search) {
      query += ` AND (i.instructor_name ILIKE $${paramCount} OR i.instructor_surname ILIKE $${paramCount} OR CAST(i.instructor_id AS TEXT) ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
      params.push(`%${search}%`);
      paramCount++;
      params.push(`%${search}%`);
      paramCount++;
    }

    if (department) {
      query += ` AND d.department_name = $${paramCount}`;
      params.push(department);
      paramCount++;
    }

    query += ' ORDER BY i.instructor_id';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get instructors error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

