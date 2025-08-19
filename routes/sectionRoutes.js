const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

/**
 * @swagger
 * tags:
 *   name: Section
 *   description: API to manage sections
 */

/**
 * @swagger
 * /api/section/add:
 *   post:
 *     summary: Create a new section
 *     tags: [Section]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - venue_id
 *               - name
 *             properties:
 *               venue_id:
 *                 type: string
 *                 format: uuid
 *               parent_section_id:
 *                 type: string
 *                 format: uuid
 *                 nullable: true
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *               seat_map:
 *                 type: object
 *                 nullable: true
 *             example:
 *               venue_id: "123e4567-e89b-12d3-a456-426614174000"
 *               parent_section_id: null
 *               name: "Section A"
 *               description: "Section description"
 *               seat_map: {"rows": 5, "cols": 10}
 *     responses:
 *       201:
 *         description: Section successfully created
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */
router.post('/add', sectionController.createSection);

/**
 * @swagger
 * /api/section/getSection:
 *   get:
 *     summary: Retrieve all sections
 *     tags: [Section]
 *     responses:
 *       200:
 *         description: List of sections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/getSection', sectionController.getAllSections);

/**
 * @swagger
 * /api/section/getSection/{id}:
 *   get:
 *     summary: Retrieve a section by ID
 *     tags: [Section]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Section ID
 *     responses:
 *       200:
 *         description: Section details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Section not found
 *       500:
 *         description: Server error
 */
router.get('/getSection/:id', sectionController.getSectionById);

/**
 * @swagger
 * /api/section/updateSection/{id}:
 *   put:
 *     summary: Update a section by ID
 *     tags: [Section]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Section ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               seat_map:
 *                 type: object
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Section successfully updated
 *       400:
 *         description: Invalid fields
 *       404:
 *         description: Section not found
 *       500:
 *         description: Server error
 */
router.put('/updateSection/:id', sectionController.updateSection);

/**
 * @swagger
 * /api/section/deleteSection/{id}:
 *   delete:
 *     summary: Delete a section by ID
 *     tags: [Section]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Section ID
 *     responses:
 *       200:
 *         description: Section successfully deleted
 *       404:
 *         description: Section not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteSection/:id', sectionController.deleteSection);

module.exports = router;
