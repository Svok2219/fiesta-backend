const { Orders } = require("../Model/Order");
// import { User } from "../Model/User";
const express = require("express");
const Router = express.Router();

Router.get('/', async (req,res)=>{
  const AllOrders = await Orders.find()
if(AllOrders) return res.status(200).json({success:true,content:AllOrders})
              return res.send("Couldn’t Patch the Order Boss")
})
Router.get('/:id', async (req,res)=>{
    // console.log(req.params.id)
    const OrderOfTheUser = await Orders.find({CustomerEmail:req.params.id})
  if(OrderOfTheUser) return res.status(200).json({success:true,content:OrderOfTheUser})
                     return res.send("Couldn’t Patch the Order Boss")  
})
Router.get('/Description/:id', async (req,res)=>{
  // console.log(req.params.id)
  const OrderOfTheUser = await Orders.findById(req.params.id)
if(OrderOfTheUser) return res.status(200).json({success:true,content:OrderOfTheUser})
                   return res.send("Couldn’t find the Order Boss")  
})
Router.delete("/:id",(req,res)=>{
    Orders.findByIdAndRemove(req.params.id)
      .then((result)=>{
        if(result){res.send(result)}
        else{res.send("Couldn’t delete the Request Boss")}
        })
        .catch((err)=>res.send(err))
 })
 Router.patch('/:id',(req,res)=>{
   console.log(req.params.id)
    Orders.findByIdAndUpdate(req.params.id,{
        // CustomerName:req.body.CustomerName,
        // CustomerID:req.body.CustomerID,
        OrderStatus:req.body.OrderStatus,
        // Description:req.body.Description,
       
    })
    // console.log(req.body.images)
    .then((result)=>{
            if(result) return res.send(result);console.log(result)
                return res.send("Couldn’t Patch the Order Boss")
    })
    .catch((err)=>{res.send(err);console.log(err)})
 })
 Router.post('/',(req,res)=>{
    // const OrderforPost=re?q.body
       const OrderforPost= new Orders({
        Name:req.body.Name,
        Email:req.body.Email,
        // OrderStatus:req.body.OrderStatus,
        PassingYear:req.body.PassingYear,
        Roll:req.body.Roll,
        Description:req.body.Description
       })  

    OrderforPost.save()
    
    .then((result)=>{
      console.log(result._id)
      if(!result) return res.status(400).json({content:"A Problem Occured"})
                  return res.status(200).json({content:result._id})
                
    })
    .catch((err)=>{res.send(err);console.log(err)})
 })
 module.exports = Router;
