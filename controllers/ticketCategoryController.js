// controllers/ticketCategoryController.js
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

// Create new ticket category
exports.createTicketCategory = async (req, res) => {
  try {
    const { event_id, name, price, section_id } = req.body;
    if (!event_id || !name) {
      return res.status(400).json({ message: "Event ID and Name are required" });
    }

    const category_id = uuidv4();
    await pool.query(
      `INSERT INTO ticketcategory (category_id, event_id, name, price, section_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [category_id, event_id, name, price || null, section_id || null]
    );

    res.status(201).json({ message: "Category created", category_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all categories
exports.getAllTicketCategories = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ticketcategory");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM ticketcategory WHERE category_id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Category not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { event_id, name, price, section_id } = req.body;

    const [result] = await pool.query(
      `UPDATE ticketcategory SET event_id = ?, name = ?, price = ?, section_id = ?
       WHERE category_id = ?`,
      [event_id, name, price, section_id, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM ticketcategory WHERE category_id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
