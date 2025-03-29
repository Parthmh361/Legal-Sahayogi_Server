const Client = require('../models/clientModel');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils');
async function createClient(req,res){

    try{
        const {name,email,password} = req.body;
        const ClientE = await Client.findOne({email});
        if(ClientE){
          return res.status(500).json({message:"User already exist"})
        }
        const hash_password = await bcrypt.hash(password,10)
          const newClient = (await Client.create({name,email,password:hash_password})).save()
          res.status(200).json({mssg:"user Created",user:newClient})
        }catch(e){
            console.log(e)
          res.status(400).json(e)
        }
}
async function ClientSignIn(req,res){
    try{
        const {email,password} = req.body;
        const ClientE = await Client.findOne({email});
        if(!ClientE){
          return res.status(500).json({message:"User not found"})
        }
        const match = await bcrypt.compare(password, ClientE.password);
        if(!match){
            return res.status(500).json({message:"Wrong password"})
        }
        const token = generateToken(ClientE)
      
        res.status(200).json({mssg:"user Logged In", user:{
            name:ClientE.name,
            email:ClientE.email,
            token
        }})
        }catch(e){
            console.log(e)
          res.status(400).json(e)
        }
}
async function addClient(req, res){
    try{
        const {name,email,password,id} =req.body;
        const ClientE = await Client.findOne({email});
        if(ClientE){
          return res.status(500).json({message:"User already exist"})
        }
        const hash_password = await bcrypt.hash(password, 10)
          const newClient = (await Client.create({name, email, password:hash_password,addedBy:id})).save()
          res.status(200).json({mssg:"user Created", user:newClient})
        }catch(e){
            console.log(e)
          res.status(400).json(e)
        }
}
module.exports = {
    createClient,
    ClientSignIn,
    addClient,
}
