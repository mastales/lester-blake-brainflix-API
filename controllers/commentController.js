const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Write, read and parse the JSON file
const readJSONFile = (filePath) => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeJSONFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Define the file path for JSON file
const filePath = path.resolve(__dirname, '..', 'data', 'video-details.json');

const commentController = {
  create: (req, res) => {
    try {
      const { name, comment } = req.body;
      const videos = readJSONFile(filePath);
      
      const video = videos.find((video) => video.id === req.params.id);

      if (!video) return res.status(404).json({ message: 'No video with that id exists' });
      
      const newComment = {
        id: uuidv4(),
        name,
        comment,
        likes: 0,
        timestamp: Date.now()
      };
      
      video.comments.push(newComment);
      writeJSONFile(filePath, videos);
      
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = commentController;
