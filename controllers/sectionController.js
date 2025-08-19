const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// Create a new section
exports.createSection = async (req, res) => {
  const { venue_id, parent_section_id, name, description, seat_map } = req.body;

  if (!venue_id || !name) {
    return res.status(400).json({ error: 'venue_id and name are required' });
  }

  try {
    const section_id = uuidv4();
    const sql = `
      INSERT INTO Section (section_id, venue_id, parent_section_id, name, description, seat_map)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.promise().query(sql, [
      section_id,
      venue_id,
      parent_section_id || null,
      name,
      description || null,
      seat_map ? JSON.stringify(seat_map) : null,
    ]);

    res.status(201).json({ message: 'Section created successfully', section_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retrieve all sections
exports.getAllSections = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM Section');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Retrieve a section by its ID
exports.getSectionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.promise().query('SELECT * FROM Section WHERE section_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a section by its ID
exports.updateSection = async (req, res) => {
  const { id } = req.params;
  const { name, description, seat_map } = req.body;

  // Validate at least one field is provided
  if (!name && !description && !seat_map) {
    return res.status(400).json({ error: 'At least one field (name, description, or seat_map) is required' });
  }

  try {
    // Build dynamic update query
    const updateFields = [];
    const values = [];

    if (name) {
      updateFields.push('name = ?');
      values.push(name);
    }

    if (description !== undefined) {
      updateFields.push('description = ?');
      values.push(description);
    }

    if (seat_map !== undefined) {
      updateFields.push('seat_map = ?');
      values.push(seat_map ? JSON.stringify(seat_map) : null);
    }

    values.push(id);  // Add ID for WHERE clause

    const sql = `
      UPDATE Section
      SET ${updateFields.join(', ')}
      WHERE section_id = ?
    `;

    const [result] = await db.promise().query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }

    res.json({ message: 'Section updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a section by its ID
exports.deleteSection = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.promise().query('DELETE FROM Section WHERE section_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json({ message: 'Section deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
