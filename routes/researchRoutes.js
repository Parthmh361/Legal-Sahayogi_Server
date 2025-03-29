const express = require ('express');
const { research } = require('../controllers/researchController');
const router = express.Router();
router.route('/').get(research);
module.exports = router;