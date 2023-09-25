
// require dotenv and pull in the variables
require('dotenv').config()

const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize express and cors
const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/images', express.static(path.join(__dirname, 'images'))); 

// Importing routes and controllers
const videoRoutes = require('./routes/videoRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Using the routes
app.use('/videos', videoRoutes);
app.use('/videos/:id/comments', commentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
