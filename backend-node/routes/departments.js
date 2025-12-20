import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all departments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT department_id, department_name FROM department ORDER BY department_name'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

