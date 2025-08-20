const express = require('express');
const router = express.Router();
const ticketControllers = require('../controllers/ticketController');

/**
 * @swagger
 * /api/ticket/:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: List of all tickets
 *       500:
 *         description: Server error
 */
router.get('/', ticketControllers.getAllTickets);

/**
 * @swagger
 * /api/ticket:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *               category_id:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: double
 *               seat_number:
 *                 type: string
 *             required:
 *               - event_id
 *               - category_id
 *               - price
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Missing fields or invalid data
 *       500:
 *         description: Server error
 */
router.post('/', ticketControllers.createTicket);

module.exports = router;