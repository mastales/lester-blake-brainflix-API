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

const filePath = path.resolve(__dirname, '..', 'data', 'video-details.json');

const videoController = {
    list: (req, res) => {
        try {
            console.log(filePath); // DEBUGGING Log the file path to the console
            const videos = readJSONFile(filePath);
            const returnedVideos = videos.map(({ id, title, channel, image }) => ({ id, title, channel, image }));
            res.json(returnedVideos);
        } catch (error) {
            console.error(error); // DEBUGGING Log the error to the console
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    detail: (req, res) => {
        try {
            console.log(filePath);
            const videos = readJSONFile(filePath);
            const video = videos.find((video) => video.id === req.params.id);

            if (!video) return res.status(404).json({ message: 'No video with that id exists' });

            res.json(video);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    create: (req, res) => {
        try {
            const { title, channel, image, description } = req.body;
            const videos = readJSONFile(filePath);

            const newVideo = {
                id: uuidv4(),
                title,
                channel,
                image,
                description,
                views: '0',
                likes: '0',
                timestamp: Date.now(),
                comments: []
            };

            videos.push(newVideo);
            writeJSONFile(filePath, videos);

            res.status(201).json(newVideo);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    likeVideo: (req, res) => {
        try {
          const videos = readJSONFile(filePath);
          const video = videos.find(video => video.id === req.params.id);
    
          if (!video) return res.status(404).json({ message: 'No video with that id exists' });
          
          video.likes++;
          writeJSONFile(filePath, videos);
          
          res.status(200).json({ message: 'Video liked', likes: video.likes });
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
};

module.exports = videoController;
