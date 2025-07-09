const express = require('express');
const dotenv = require('dotenv');
const app = express();
const db= require('./db')
const userRoutes = require('./routes/userRoutes')
const meRoutes = require('./routes/profileRoutes')

dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/me', meRoutes);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})