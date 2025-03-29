const mongoose = require('mongoose');   
const Schema = mongoose.Schema;
const advocateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRweo6tutmx-kK5IMZClXEujQ6I6AJXGgBa8w&s"
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    specialization: [{
        type: String,
        required: true
    }],
    about:{
     type:String,
     required:true
    },
    role: {
        type: String,
        default: "advocate"
    }
});
module.exports = mongoose.model('Advocate', advocateSchema)