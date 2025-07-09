const express = require('express');
const db = require('../db');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.get('/getUser',authenticateToken, (req, res) => {
    const userId = req.user.user_id;

    const sql = `SELECT user_id, email, phone_number, name, profile_photo, role, preferences FROM users WHERE user_id = ?`;
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) { return res.status(404).json({ error: 'User not found' }); }
        res.json(results[0]);
    });
});

router.put('/updateProfile',authenticateToken, (req, res) => {
    const userId = req.user.user_id;
    const { name, profile_photo, preferences } = req.body;
    const sql = `UPDATE users SET name = ?, profile_photo = ?, preferences = ? WHERE user_id = ?`;
    const preferencesStr = preferences ? JSON.stringify(preferences) : null;
    db.query(sql, [name, profile_photo, preferencesStr, userId], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Profile updated successfully' });
    });
});

module.exports = router;