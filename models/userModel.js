const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require("dotenv").config()
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const userSchema = new Schema({

   name:{
    type:String,
    required: true,
    
   },
    email: {
       type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture:{
        type:String,
        required:true,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRweo6tutmx-kK5IMZClXEujQ6I6AJXGgBa8w&s",
      },
      role:{
        type:String,
       required:true
      }
},{
    
        timestamps:true
    
});


module.exports = mongoose.model('User', userSchema);
  

