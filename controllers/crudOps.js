const Agency  = require("../models/AgencyClient");
const Client = require("../models/Clients");
const User  = require("../models/User");
const expressJwt = require('express-jwt');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.createAgency = (req, res, next) => {
  const { Agc } = req.body;
  const { Clt } = req.body;

  const agencyData = new Agency(Agc);
  const clientData = new Client(Clt);

  agencyData.save((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        success: false,
        err: err.message,
      });
    }
    // const Cltdata = {...Clt, AgencyId:data._id} 
    // const clientData = new Client(Cltdata);
  clientData.save((err,data) => {
      if (err||!data){
        return res.status(400).json({
          success: false,
          err: err.message
        });
      };
    })
    return res.status(201).json({success:"True"});  
  });
};

exports.updateClient = async (req,res) =>{
  const { id }=req.query;
  console.log(id);
  const data = req.body;
  // console.log(data);
  await Client.findByIdAndUpdate(id,{"$set":data},{upsert:true},
    (err,updatedData)=>{
      if(err||!updatedData){
        console.log(err);
        return res.status(204).json({message:"Unsuccessful",error:err})
      }
      return res.status(200).json({message:"Successful",data:updatedData})
    }
    )
};

exports.getMaxBill = (req,res) => {
  Client.find({}).sort({"TotalBill":-1}).limit(1).populate("AgencyId", ["Name"]).select({'Name':1 , 'TotalBill':1}).exec((err,data)=>{
    if(err||!data){
      return res.status(400).json({msg:"unsuccess"});
    }
    return res.status(200).json(data);
  }
  )
}

exports.Signup = (req,res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password,10).then((hash)=>{
    const userModel = new User({
      Username: username,
      Email: email,
      Password: hash
    });
    userModel.save((err,data)=>{
      if(err||!data){
        return res.status(400).json({message:"Registration Unsuccessful", error: err})
      }
      return res.status(201).json({message:"Registration done!", data:{Username:data.Username}});
    })
  })
}

exports.SignIn = ( req,res ) => {
  const { username, password } = req.body;
  User.findOne({"Username":username}).exec((err,data)=>{
    if(err||!data){
      return res.status(400).json({message:"Username not found",error:err})
    }
    let tempUser = data;
    const passCheck = bcrypt.compareSync(password, data.Password)
    if(passCheck){
    let payload = {username: tempUser.Username, _id: tempUser._id}
    let jwtToken = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
    return res.status(200).json({message:"Successful Login!",token: jwtToken, expireIn:3600, data:tempUser})
    }
    else{
      return res.status(401).json({message:"Authentication Failed!"})
    }
  })
}

//custom middleware for checking if a user is signed-in

exports.isSignedIn = expressJwt({
  secret: process.env.JWT_SECRET_KEY,
  userProperty: "Authorization",
  algorithms: ["HS256"],
});