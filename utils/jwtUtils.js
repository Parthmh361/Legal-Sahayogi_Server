const jwt = require("jsonwebtoken"); 
const crypto = require('crypto');
const secretKey = require("../configuration/jwtConfig");
const sk = secretKey.secretKey;
function generateToken(user){
    const payload = {
        id: user._id,
        email: user.email
    }
    const options = {
        expiresIn: "30d"
    }
    return jwt.sign(payload, sk, options)
    

}
module.exports = {generateToken}