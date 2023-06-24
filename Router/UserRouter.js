const { User } = require("../Model/User");
const express = require("express");
const Router = express.Router();

Router.get('/',async (req,res)=>{
    const Users = await User.find()
    if(!Users) return res.status(400).json({success:false})
               return res.status(200).json({success:true,content:Users})
})
Router.get('/:id',async (req,res)=>{
    const Users = await User.findById(req.params.id)
    
    if(!Users) return res.status(400).json({success:false})
               return res.status(200).json({success:true,content:Users})
})
Router.get('/getone/:id',async (req,res)=>{
    const Users = await User.find({Email:req.params.id})
    // console.log(Users)
    if(!Users) return res.status(400).json({success:false})
               return res.status(200).json({user:Users})
})
Router.delete('/:id',async (req,res)=>{
    const Users = await  User.findByIdAndRemove(req.params.id)
    if(!Users) return res.status(400).json({success:false})
               return res.status(200).json({success:true,content:Users})
})
Router.post('/',async (req,res)=>{
    const UserForPost =  new User({
        FullName:req.body.FullName,
        PassingYear:req.body.PassingYear,
        RoleNumber:req.body.RoleNumber,
        Email:req.body.Email,
  })
  const UserPosted = await UserForPost.save()
  console.log(UserPosted)
  if(!UserPosted) return res.status(400).json({success:false})
  res.status(200).json({success:true,content:UserPosted})
    })
    
module.exports = Router;
