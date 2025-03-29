const Advocate = require('../models/advocateModel');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils');
const User = require('../models/userModel');
async function createAdvocate(req,res){

    try{
        const {name,email,password,phone,address,specialization,about} = req.body
        const AdvocateE = await Advocate.findOne({email});
        if(AdvocateE){
          return res.status(500).json({message:"User already exist"})
        }
        const hash_password = await bcrypt.hash(password,10)
          const newAdvocate = (await Advocate.create({name,email,password:hash_password,phone,address,specialization,about})).save()
          console.log(newAdvocate)
          const newUser = (await User.create({_id:(await newAdvocate)._id,name,email, password:hash_password,role:'advocate'})).save()

          res.status(200).json({mssg:"user Created",user:newAdvocate})
        }catch(e){
            console.log(e)
          res.status(400).json(e)
        }
}
async function AdvocateSignIn(req,res){
    try{
        const {email,password} = req.body;
        const AdvocateE = await Advocate.findOne({email});
        if(!AdvocateE){
          return res.status(500).json({message:"User not found"})
        }
        const match = await bcrypt.compare(password, AdvocateE.password);
        if(!match){
            return res.status(500).json({message:"Wrong password"})
        }
        const token = generateToken(AdvocateE)
      
        res.status(200).json({mssg:"user Logged In", user:{
            _id:AdvocateE._id,
            name:AdvocateE.name,
            email:AdvocateE.email,
            phone:AdvocateE.phone,
            address:AdvocateE.address,
            specialization:AdvocateE.specialization,
            about:AdvocateE.about,
            token
        }})
        }catch(e){
            console.log(e)
          res.status(400).json(e)
        }
}
async function getChatUsers(req,res){

  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req._id } });
  res.send(users);
}
async function findAdvocate(req, res){
 

    const keyword = req.query.search
      ? {
          $or: [
            { specialization: { $regex: req.query.search, $options: "i" } },
            // { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await Advocate.find(keyword).find({ _id: { $ne: req._id } });
    res.send(users);
  
}

module.exports = {
    createAdvocate,
    AdvocateSignIn,
    getChatUsers,
    findAdvocate,
}
