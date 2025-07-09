import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db.js';
import eventRouter from './routes/events.js';
const app = express();
app.use(express.json());


app.use('/api', eventRouter)
app.post('/', async (req, res) => {
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

app.listen(4000, () => console.log('API on http://localhost:4000'));

