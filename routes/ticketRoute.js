const express = require('express');
const router = express.Router();
const ticketControllers = require('../controllers/ticketController');

// Routes
router.get('/', ticketControllers.getAllTickets); // GET all tickets
router.post('/', ticketControllers.createTicket); // POST create ticket

module.exports = router;