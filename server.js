const express = require('express');
const dotenv = require('dotenv');
const app = express();
const db= require('./db')
const userRoutes = require('./routes/userRoutes')

dotenv.config();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use('/api/user', userRoutes);

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})