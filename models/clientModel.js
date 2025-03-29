const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    picture:{
        type:String,
         default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRweo6tutmx-kK5IMZClXEujQ6I6AJXGgBa8w&s",

    },
    addedBy:{
        type:Schema.Types.ObjectId,
        ref:'Advocate'
    }
},{
    timestamps:true
}) 
module.exports = mongoose.model('Client', ClientSchema)