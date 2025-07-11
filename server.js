const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const eventRouter = require('./routes/events');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
  const id = uuidv4();
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
    INSERT INTO events (
      event_id, title, description, date_time,
      venue_id, admin_id, category, artist_lineup, promo_video_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [result] = await db.promise().query(sql, [
      id,
      title,
      description,
      date_time,
      venue_id,
      admin_id,
      category,
      artist_lineup_json,
      promo_video_url
    ]);
    res.status(201).json({ message: 'Event created', event_id: id });
  } catch (error) {
    console.error('Insert Error:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.use('/events', eventRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
