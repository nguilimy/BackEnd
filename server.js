const express = require('express');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const app = express();
const db= require('./db');
const userRoutes = require('./routes/userRoutes');
const meRoutes = require('./routes/profileRoutes');
const resetPasswordRoute = require('./routes/resetPassordRoute');
const eventRouter = require('./routes/events');
const ticketRoute = require('./routes/ticketRoute');

dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());

// Event
app.use('/events', eventRouter);
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
    INSERT INTO event (
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

// User
app.use('/api/user', userRoutes);
app.use('/api/me', meRoutes);
app.use('/api/resetPassword', resetPasswordRoute);

// Ticket
app.use('/api/ticket', ticketRoute);
// Ticket Category

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});