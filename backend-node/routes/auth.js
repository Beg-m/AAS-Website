import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    // Validate required fields
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    // Check if username already exists
    const usernameCheck = await pool.query(
      'SELECT employee_id FROM employee WHERE username = $1',
      [username]
    );

    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if email already exists
    const emailCheck = await pool.query(
      'SELECT employee_id FROM employee WHERE email = $1',
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Insert new user
    const result = await pool.query(
      `INSERT INTO employee (username, password, email, first_name, last_name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING employee_id, username, email, first_name, last_name`,
      [username, password, email, firstName || null, lastName || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Register error:', error);
    
    // Handle unique constraint violations
    if (error.code === '23505') {
      if (error.constraint.includes('username')) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      if (error.constraint.includes('email')) {
        return res.status(400).json({ error: 'Email already registered' });
      }
    }
    
    return res.status(500).json({ error: error.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const result = await pool.query(
      'SELECT employee_id, username, email, first_name, last_name FROM employee WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      return res.json({
        success: true,
        user: result.rows[0]
      });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;

