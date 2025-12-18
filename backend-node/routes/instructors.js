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

// Create instructor
router.post('/', async (req, res) => {
  try {
    const { instructor_id, instructor_name, instructor_surname, instructor_email, department_id } = req.body;

    if (!instructor_id || !instructor_name || !instructor_surname || !instructor_email || !department_id) {
      return res.status(400).json({ 
        error: 'Missing required fields: instructor_id, name, surname, email, and department_id are required' 
      });
    }

    // Check if instructor_id already exists
    const checkResult = await pool.query(
      'SELECT instructor_id FROM instructor WHERE instructor_id = $1',
      [instructor_id]
    );

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Instructor ID already exists' });
    }

    // Insert instructor
    const result = await pool.query(
      `INSERT INTO instructor (instructor_id, instructor_name, instructor_surname, 
                               instructor_email, department_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING instructor_id`,
      [instructor_id, instructor_name, instructor_surname, instructor_email, department_id]
    );

    res.status(201).json({
      success: true,
      instructor_id: result.rows[0].instructor_id
    });
  } catch (error) {
    console.error('Create instructor error:', error);
    let errorMsg = error.message;
    if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
      if (error.message.includes('email')) {
        errorMsg = 'This email address is already registered';
      } else {
        errorMsg = 'An instructor with this information already exists';
      }
    }
    res.status(500).json({ error: errorMsg });
  }
});

// Delete instructor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM instructor WHERE instructor_id = $1 RETURNING instructor_id',
      [id]
    );

    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Instructor not found' });
    }
  } catch (error) {
    console.error('Delete instructor error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

