const express = require('express');
const usersController = require('../controllers/users');
const presenceController= require('../controllers/arduino.js')
const router = express.Router();

// Define routes and link them to controller methods
router.get('/users', usersController.getUsers);
router.post('/users', usersController.createUsers);
// router.post('/another-endpoint-example', endpointController.controllerFunction);
router.get('/presenceToServer', presenceController.presenceToServer);


module.exports = router;