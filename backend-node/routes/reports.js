import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get attendance summary
router.get('/attendance-summary', async (req, res) => {
  try {
    const { course, department, start_date, end_date } = req.query;
    
    let query = `
      SELECT DISTINCT c.course_name as course,
             MIN(a.attendance_date) as start_date,
             MAX(a.attendance_date) as end_date
      FROM attendance a
      JOIN course c ON a.course_id = c.course_id
      JOIN student s ON a.student_id = s.student_id
      JOIN department d ON s.department_id = d.department_id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (course) {
      query += ` AND c.course_name = $${paramCount}`;
      params.push(course);
      paramCount++;
    }

    if (department) {
      query += ` AND d.department_name = $${paramCount}`;
      params.push(department);
      paramCount++;
    }

    if (start_date) {
      query += ` AND a.attendance_date >= $${paramCount}`;
      params.push(start_date);
      paramCount++;
    }

    if (end_date) {
      query += ` AND a.attendance_date <= $${paramCount}`;
      params.push(end_date);
      paramCount++;
    }

    query += ' GROUP BY c.course_name ORDER BY c.course_name';

    const result = await pool.query(query, params);
    
    const formatted = result.rows.map(record => ({
      course: record.course,
      startDate: record.start_date ? new Date(record.start_date).toLocaleDateString('tr-TR') : '',
      endDate: record.end_date ? new Date(record.end_date).toLocaleDateString('tr-TR') : ''
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Get attendance summary error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get attendance rate
router.get('/attendance-rate', async (req, res) => {
  try {
    const { course, department } = req.query;
    
    let query = `
      SELECT c.course_name as course,
             COUNT(CASE WHEN a.status = 'present' THEN 1 END) * 100.0 / 
             NULLIF(COUNT(*), 0) as rate
      FROM attendance a
      JOIN course c ON a.course_id = c.course_id
      JOIN student s ON a.student_id = s.student_id
      JOIN department d ON s.department_id = d.department_id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (course) {
      query += ` AND c.course_name = $${paramCount}`;
      params.push(course);
      paramCount++;
    }

    if (department) {
      query += ` AND d.department_name = $${paramCount}`;
      params.push(department);
      paramCount++;
    }

    query += ' GROUP BY c.course_name ORDER BY c.course_name';

    const result = await pool.query(query, params);
    
    const formatted = result.rows.map(record => ({
      course: record.course,
      rate: Math.round(parseFloat(record.rate) || 0)
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Get attendance rate error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

