const express = require('express');
const router = express.Router();
const venueControllers = require('../controllers/venueController');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * /api/venue/add:
 *   post:
 *     summary: Add a new venue
 *     tags:
 *       - Venues
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *               - map_data
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               map_data:
 *                 type: object
 *                 example: { "lat": -1.9441, "lng": 30.0619 }
 *               capacity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Venue added successfully
 *       400:
 *         description: Missing fields
 *       500:
 *         description: Server error
 */
router.post('/add', authenticateToken, venueControllers.addVenue);

/**
 * @swagger
 * /api/venue/getVenue:
 *   get:
 *     tags:
 *       - Venues
 *     summary: Get all venues
 *     description: Returns a list of all venues
 *     responses:
 *       200:
 *         description: A list of venues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   venue_id:
 *                     type: string
 *                   admin_id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *                   map_data:
 *                     type: object
 *                     properties:
 *                       lat:
 *                         type: number
 *                       lng:
 *                         type: number
 *                   capacity:
 *                     type: integer
 *       500:
 *         description: Failed to fetch venues
 */
router.get('/getVenue', venueControllers.getVenue);

module.exports = router;