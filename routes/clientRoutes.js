const express = require('express');
const {tokenAuth }= require('../utils/tokenAuth');
const router = express.Router();
const {createClient, ClientSignIn, addClient} = require('../controllers/clientAuthControllers');
const { protect } = require('../utils/chatAuthMiddleware');
router.post('/createclient',createClient);
router.post('/clientsignin',ClientSignIn)
router.get('/clientauth',tokenAuth);
router.post('/addclient',protect,addClient);
module.exports = router;