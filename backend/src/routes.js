const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/likes/:targetDevId', LikeController.store);
routes.post('/devs/dislikes/:targetDevId', DislikeController.store);

module.exports = routes;