const crypto = require('crypto')
const secretKey = crypto.randomBytes(384).toString('base64');
console.log("This is the First one",secretKey,"END.............")
module.exports={
    secretKey:secretKey
}