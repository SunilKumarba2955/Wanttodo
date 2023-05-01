// requiring module
const express = require('express');

// requiring Router module
const router = express.Router();
const homeController = require('../controllers/homecontroller');
router.use('/users',require('./users'));

router.get('/',homeController.home);
console.log('router is loaded');
module.exports = router;