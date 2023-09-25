const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController  = require('../controllers/commentController');

router.post('/', commentController.create);

module.exports = router;
