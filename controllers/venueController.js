const { v4: uuidv4 } = require('uuid');
const db = require('../db');

exports.addVenue = async (req, res) => {
    const { name, location, map_data, capacity } = req.body;
    const { user_id, role } = req.user;

    if (!name || !location || !map_data || !capacity) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied: only admins can add venues' });
    }

    try {
        const venue_id = uuidv4();
        const mapDataString = JSON.stringify(map_data);

        const sql = `
            INSERT INTO venue (venue_id, admin_id, name, location, map_data, capacity)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await db.promise().query(sql, [
            venue_id,
            user_id,
            name,
            location,
            mapDataString,
            capacity
        ]);

        return res.status(201).json({ message: 'Venue added successfully', venue_id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
