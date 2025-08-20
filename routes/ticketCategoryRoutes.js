const express = require('express');
const router = express.Router();
const ticketCategoryControllers = require('../controllers/ticketCategoryController');

/**
 * @swagger
 * /api/ticketcategory:
 *   get:
 *     summary: Get all ticket categories
 *     tags: [Ticket Categories]
 *     responses:
 *       200:
 *         description: List of all ticket categories
 *       500:
 *         description: Server error
 */
router.get('/', ticketCategoryControllers.getAllTicketCategories);

/**
 * @swagger
 * /api/ticketcategory:
 *   post:
 *     summary: Create a new ticket category
 *     tags: [Ticket Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: double
 *               section_id:
 *                 type: string
 *             required:
 *               - event_id
 *               - name
 *     responses:
 *       201:
 *         description: Ticket category created successfully
 *       400:
 *         description: Missing fields or invalid data
 *       500:
 *         description: Server error
 */
router.post('/', ticketCategoryControllers.createTicketCategory);

/**
 * @swagger
 * /api/ticketcategory/{id}:
 *   get:
 *     summary: Get a ticket category by ID
 *     tags: [Ticket Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Ticket category details
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/:id', ticketCategoryControllers.getCategoryById);

/**
 * @swagger
 * /api/ticketcategory/{id}:
 *   put:
 *     summary: Update a ticket category
 *     tags: [Ticket Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: double
 *               section_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.put('/:id', ticketCategoryControllers.updateCategory);

/**
 * @swagger
 * /api/ticketcategory/{id}:
 *   delete:
 *     summary: Delete a ticket category
 *     tags: [Ticket Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Ticket category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', ticketCategoryControllers.deleteCategory);

module.exports = router;
