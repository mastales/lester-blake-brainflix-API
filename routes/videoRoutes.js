const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.list);
router.get('/videos/:id', videoController.detail);
router.post('/videos/', videoController.create);
router.put('/videos/:id/likes', videoController.likeVideo);

module.exports = router;
