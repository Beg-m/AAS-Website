import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get students with courses (must be before /:id route)
router.get('/courses', async (req, res) => {
  try {
    const { search, course } = req.query;
    
    let query = `
      SELECT s.student_id, s.student_name, s.student_surname,
             c.course_id, c.course_name
      FROM student_course sc
      JOIN student s ON sc.student_id = s.student_id
      JOIN course c ON sc.course_id = c.course_id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (search) {
      // Support Turkish characters in search
      const searchTerm = `%${search}%`;
      const normalizedSearch = search.toLowerCase()
        .replace(/ü/g, 'u')
        .replace(/ö/g, 'o')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
        .replace(/ı/g, 'i');
      
      query += ` AND (
        s.student_name ILIKE $${paramCount} OR s.student_surname ILIKE $${paramCount + 1} OR CAST(s.student_id AS TEXT) ILIKE $${paramCount + 2} OR
        LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(s.student_name, 'ü', 'u'), 'ö', 'o'), 'ş', 's'), 'ç', 'c'), 'ğ', 'g'), 'ı', 'i')) ILIKE $${paramCount + 3} OR
        LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(s.student_surname, 'ü', 'u'), 'ö', 'o'), 'ş', 's'), 'ç', 'c'), 'ğ', 'g'), 'ı', 'i')) ILIKE $${paramCount + 4}
      )`;
      params.push(searchTerm);
      params.push(searchTerm);
      params.push(searchTerm);
      params.push(`%${normalizedSearch}%`);
      params.push(`%${normalizedSearch}%`);
      paramCount += 5;
    }

    if (course) {
      query += ` AND (c.course_id = $${paramCount} OR c.course_name = $${paramCount + 1})`;
      params.push(course);
      params.push(course);
      paramCount += 2;
    }

    query += ' ORDER BY s.student_id, c.course_id';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get students courses error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const { search, department } = req.query;
    
    let query = `
      SELECT s.student_id, s.student_name, s.student_surname, s.student_email,
             s.photo_path, s.face_data, d.department_name as department
      FROM student s
      LEFT JOIN department d ON s.department_id = d.department_id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 1;

    if (search) {
      // Support Turkish characters in search
      const searchTerm = `%${search}%`;
      const normalizedSearch = search.toLowerCase()
        .replace(/ü/g, 'u')
        .replace(/ö/g, 'o')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
        .replace(/ı/g, 'i');
      
      query += ` AND (
        s.student_name ILIKE $${paramCount} OR s.student_surname ILIKE $${paramCount + 1} OR CAST(s.student_id AS TEXT) ILIKE $${paramCount + 2} OR
        LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(s.student_name, 'ü', 'u'), 'ö', 'o'), 'ş', 's'), 'ç', 'c'), 'ğ', 'g'), 'ı', 'i')) ILIKE $${paramCount + 3} OR
        LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(s.student_surname, 'ü', 'u'), 'ö', 'o'), 'ş', 's'), 'ç', 'c'), 'ğ', 'g'), 'ı', 'i')) ILIKE $${paramCount + 4}
      )`;
      params.push(searchTerm);
      params.push(searchTerm);
      params.push(searchTerm);
      params.push(`%${normalizedSearch}%`);
      params.push(`%${normalizedSearch}%`);
      paramCount += 5;
    }

    if (department) {
      query += ` AND d.department_name = $${paramCount}`;
      params.push(department);
      paramCount++;
    }

    query += ' ORDER BY s.student_id';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT s.student_id, s.student_name, s.student_surname, s.student_email,
              s.photo_path, s.face_data, d.department_name as department
       FROM student s
       LEFT JOIN department d ON s.department_id = d.department_id
       WHERE s.student_id = $1`,
      [id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create student
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { name, surname, email, department, photo_path, face_data, courses } = req.body;

    if (!name || !surname || !email || !department) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        error: 'Missing required fields: name, surname, email, and department are required' 
      });
    }

    // Get department_id
    const deptResult = await client.query(
      'SELECT department_id FROM department WHERE department_name = $1',
      [department]
    );

    if (deptResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: `Department "${department}" not found` });
    }

    const departmentId = deptResult.rows[0].department_id;

    // Insert student
    const result = await client.query(
      `INSERT INTO student (student_name, student_surname, student_email, 
                           photo_path, face_data, department_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING student_id`,
      [name, surname, email, photo_path || null, face_data || null, departmentId]
    );

    const studentId = result.rows[0].student_id;

    // Insert courses if provided
    if (courses && Array.isArray(courses) && courses.length > 0) {
      for (const courseId of courses) {
        // Verify course exists
        const courseCheck = await client.query(
          'SELECT course_id FROM course WHERE course_id = $1',
          [courseId]
        );
        
        if (courseCheck.rows.length > 0) {
          // Insert into student_course (ignore if already exists)
          await client.query(
            `INSERT INTO student_course (student_id, course_id)
             VALUES ($1, $2)
             ON CONFLICT (student_id, course_id) DO NOTHING`,
            [studentId, courseId]
          );
        }
      }
    }

    await client.query('COMMIT');
    
    res.status(201).json({
      success: true,
      student_id: studentId
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create student error:', error);
    let errorMsg = error.message;
    if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
      if (error.message.includes('email')) {
        errorMsg = 'This email address is already registered';
      } else {
        errorMsg = 'A student with this information already exists';
      }
    }
    res.status(500).json({ error: errorMsg });
  } finally {
    client.release();
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, email, department, photo_path, face_data } = req.body;

    let departmentId = null;
    if (department) {
      const deptResult = await pool.query(
        'SELECT department_id FROM department WHERE department_name = $1',
        [department]
      );
      if (deptResult.rows.length > 0) {
        departmentId = deptResult.rows[0].department_id;
      }
    }

    const result = await pool.query(
      `UPDATE student
       SET student_name = COALESCE($1, student_name),
           student_surname = COALESCE($2, student_surname),
           student_email = COALESCE($3, student_email),
           photo_path = COALESCE($4, photo_path),
           face_data = COALESCE($5, face_data),
           department_id = COALESCE($6, department_id)
       WHERE student_id = $7
       RETURNING student_id`,
      [name || null, surname || null, email || null, photo_path || null, 
       face_data || null, departmentId, id]
    );

    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM student WHERE student_id = $1 RETURNING student_id',
      [id]
    );

    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

