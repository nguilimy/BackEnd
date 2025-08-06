const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { category_id, attendee_id, seat_id, qr_code, status } = req.body;

    if (!category_id || !attendee_id) {
      return res.status(400).json({ error: 'category_id and attendee_id are required' });
    }

    const ticket_id = uuidv4();
    const sql = `
      INSERT INTO ticket (ticket_id, category_id, attendee_id, seat_id, qr_code, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.promise().query(sql, [
      ticket_id,
      category_id,
      attendee_id,
      seat_id ,
      qr_code || null,
      status || 'Active'
    ]);

    res.status(201).json({ message: 'Ticket created successfully', ticket_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM ticket');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No tickets found' });
    }
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};
