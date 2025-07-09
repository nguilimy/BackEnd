import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';

const router = Router();

router.get('/events', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM events');
    res.json(rows);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }

});

router.get('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.promise().query('SELECT * FROM events WHERE event_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});


router.put('/events/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    date_time,
    venue_id,
    admin_id,
    category,
    artist_lineup,
    promo_video_url
  } = req.body;

  const artist_lineup_json = JSON.stringify(artist_lineup);

  const sql = `
    UPDATE events SET
      title = ?, description = ?, date_time = ?, venue_id = ?, admin_id = ?, 
      category = ?, artist_lineup = ?, promo_video_url = ?
    WHERE event_id = ?`;

  try {
    const [result] = await db.promise().query(sql, [
      title,
      description,
      date_time,
      venue_id,
      admin_id,
      category,
      artist_lineup_json,
      promo_video_url,
      id
    ]);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Event not found' });

    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});


router.delete('/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.promise().query('DELETE FROM events WHERE event_id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;