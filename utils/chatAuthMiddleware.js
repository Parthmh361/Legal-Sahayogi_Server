const jwt = require('jsonwebtoken');   
const Advocate = require('../models/advocateModel');
const secretKey = require("../configuration/jwtConfig")
const sk = secretKey.secretKey
async function protect(req, res, next){
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        //decodes token id
        const decoded = jwt.verify(token,sk);
        req.user = await Advocate.findById(decoded.id).select("-password");
        next();

      } catch (error) {
        console.log(error)
        res.status(401).json({err:"NOT VERIFYED"});
        
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
  
  module.exports = {protect};