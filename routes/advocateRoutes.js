const express = require('express');
const { createAdvocate, AdvocateSignIn,getChatUsers,findAdvocate } = require('../controllers/advocateAuthControllers');
const { tokenAuth } = require('../utils/tokenAuth');
const { advocateTokenAuth } = require('../utils/advocateTokenAuth');
const {protect} = require('../utils/chatAuthMiddleware');
const router = express.Router();
router.post('/createadvocate',createAdvocate)
router.post('/advocatesignin',AdvocateSignIn)
router.get('/chatusers',getChatUsers)
router.get('/advocateauth',advocateTokenAuth);
router.get('/findadvocate',findAdvocate)
module.exports = router