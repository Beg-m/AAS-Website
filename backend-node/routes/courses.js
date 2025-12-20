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

// Create course
router.post('/', async (req, res) => {
  try {
    const { course_id, course_name, instructor_id } = req.body;

    if (!course_id || !course_name || !instructor_id) {
      return res.status(400).json({ 
        error: 'Missing required fields: course_id, course_name, and instructor_id are required' 
      });
    }

    // Check if course_id already exists
    const checkResult = await pool.query(
      'SELECT course_id FROM course WHERE course_id = $1',
      [course_id]
    );

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Course ID already exists' });
    }

    // Verify instructor exists
    const instructorCheck = await pool.query(
      'SELECT instructor_id FROM instructor WHERE instructor_id = $1',
      [instructor_id]
    );

    if (instructorCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Instructor not found' });
    }

    // Insert course
    const result = await pool.query(
      `INSERT INTO course (course_id, course_name, instructor_id)
       VALUES ($1, $2, $3)
       RETURNING course_id`,
      [course_id, course_name, instructor_id]
    );

    res.status(201).json({
      success: true,
      course_id: result.rows[0].course_id
    });
  } catch (error) {
    console.error('Create course error:', error);
    let errorMsg = error.message;
    if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
      errorMsg = 'A course with this ID already exists';
    }
    res.status(500).json({ error: errorMsg });
  }
});

// Delete course
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM course WHERE course_id = $1 RETURNING course_id',
      [id]
    );

    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

