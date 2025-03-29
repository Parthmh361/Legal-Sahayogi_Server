const jwt = require('jsonwebtoken');   
const Client = require('../models/clientModel');
const secretKey = require("../configuration/jwtConfig")
const sk = secretKey.secretKey
async function tokenAuth(req, res, next){
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
      console.log(token)
        //decodes token id
        const decoded = jwt.verify(token,sk);
        req.user = await Client.findById(decoded.id).select("-password");
        res.json({"mssg":"All OKKK BRO"})
        next();
      } catch (error) {
        res.status(401);
        console.log(error)
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
  
  module.exports = {tokenAuth};