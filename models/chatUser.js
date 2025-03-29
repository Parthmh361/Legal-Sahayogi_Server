const mongoose = require('mongoose');
const chatUser = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },

  password:{
    type:String,
    required:true
  },
  picture:{
    type:String,
    required:true,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRweo6tutmx-kK5IMZClXEujQ6I6AJXGgBa8w&s",
  
  }
},{
    timestamps:true
});
const Chatuser = mongoose.model('Chatuser',chatUser);
module.exports = Chatuser;