import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all attendance records (including students without attendance records)
router.get('/', async (req, res) => {
  try {
    const { name_surname, course, date, search } = req.query;
    
    // Build base query to get all students with their attendance records (if any)
    // If no date filter, show all students. If date filter exists, show only students with attendance on that date
    const params = [];
    let paramCount = 1;
    const hasDateFilter = !!date;
    
    let query = `
      SELECT
        s.student_id,
        s.student_name,
        s.student_surname,
        COALESCE(c.course_name, 'No course assigned') as course,
        a.attendance_date,
        COALESCE(a.status::text, 'No attendance record yet') as status,
        CASE WHEN a.attendance_id IS NULL THEN true ELSE false END as has_no_attendance
      FROM student s
      LEFT JOIN attendance a ON s.student_id = a.student_id ${hasDateFilter ? `AND a.attendance_date = $${paramCount}` : ''}
      LEFT JOIN course c ON a.course_id = c.course_id
      WHERE 1=1
    `;
    
    if (hasDateFilter) {
      params.push(date);
      paramCount++;
    }

    // Apply filters
    if (name_surname) {
      const searchTerm = `%${name_surname}%`;
      const normalizedSearch = name_surname.toLowerCase()
        .replace(/ü/g, 'u')
        .replace(/ö/g, 'o')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
        .replace(/ı/g, 'i');
      
      query += ` AND (
        s.student_name ILIKE $${paramCount} OR s.student_surname ILIKE $${paramCount + 1} OR
        LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(s.student_name, 'ü', 'u'), 'ö', 'o'), 'ş', 's'), 'ç', 'c'), 'ğ', 'g'), 'ı', 'i')) ILIKE $${paramCount + 2} OR
        LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(s.student_surname, 'ü', 'u'), 'ö', 'o'), 'ş', 's'), 'ç', 'c'), 'ğ', 'g'), 'ı', 'i')) ILIKE $${paramCount + 3}
      )`;
      params.push(searchTerm);
      params.push(searchTerm);
      params.push(`%${normalizedSearch}%`);
      params.push(`%${normalizedSearch}%`);
      paramCount += 4;
    }

    if (course) {
      // If course filter is applied, show students with attendance records for that course
      // or students enrolled in that course (via student_course table)
      query += ` AND (
        c.course_name = $${paramCount} OR 
        s.student_id IN (
          SELECT sc.student_id 
          FROM student_course sc 
          JOIN course co ON sc.course_id = co.course_id 
          WHERE co.course_name = $${paramCount}
        )
      )`;
      params.push(course);
      paramCount++;
    } else {
      // If no course filter, show all students (with or without attendance)
      // This is already handled by LEFT JOIN, so no additional filter needed
    }

    // Date filter is now handled in the JOIN clause above

    if (search) {
      const searchTerm = `%${search}%`;
      const normalizedSearch = search.toLowerCase()
        .replace(/ü/g, 'u')
        .replace(/ö/g, 'o')
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
        .replace(/ı/g, 'i');
      
      query += ` AND (
        s.student_name ILIKE $${paramCount} OR s.student_surname ILIKE $${paramCount + 1} OR 
        COALESCE(c.course_name, '') ILIKE $${paramCount + 2} OR
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

    // If date filter is applied, only show students with attendance records on that date
    // Otherwise, show all students (with or without attendance)

    query += ` ORDER BY 
      CASE WHEN a.attendance_date IS NULL THEN 1 ELSE 0 END,
      COALESCE(a.attendance_date, '1900-01-01'::date) DESC, 
      s.student_name`;

    const result = await pool.query(query, params);
    
    // Format the response
    const formatted = result.rows.map(record => ({
      studentName: record.student_name,
      studentSurname: record.student_surname,
      course: record.course,
      date: record.attendance_date ? new Date(record.attendance_date).toLocaleDateString('tr-TR') : 'N/A',
      status: record.status === 'No attendance record yet' 
        ? 'No attendance record yet' 
        : record.status.charAt(0).toUpperCase() + record.status.slice(1),
      hasNoAttendance: record.has_no_attendance
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create attendance record
router.post('/', async (req, res) => {
  try {
    const { student_id, course_id, attendance_date, status } = req.body;

    if (!student_id || !course_id || !attendance_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO attendance (student_id, course_id, attendance_date, status)
       VALUES ($1, $2, $3, $4)
       RETURNING attendance_id`,
      [student_id, course_id, attendance_date, status || 'present']
    );

    res.status(201).json({
      success: true,
      attendance_id: result.rows[0].attendance_id
    });
  } catch (error) {
    console.error('Create attendance error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

