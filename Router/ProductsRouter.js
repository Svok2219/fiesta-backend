const { Product } = require("../Model/Product");
const express = require("express");
const Router = express.Router();

Router.post('/',async (req,res)=>{
  // console.log(req.body)
    const ProductForPost = new Product({
      name:req.body.name,
      price:req.body.price,
      // DelPrice:req.body.DelPrice,
      // InitialStock:req.body.InitialStock,
      Category:req.body.Category,
      Size:req.body.Size,
            image:req.body.image,
      // Description:req.body.Description,
      // images:req.body.images
  })
  const postedProduct = await ProductForPost.save()
  if(!postedProduct) return res.status(400).json({success:false})
  res.status(200).json({success:true,content:postedProduct})
    })

Router.patch('/:id', (req,res)=>{
  // console.log(req)
    Product.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        price:req.body.price,
        // DelPrice:req.body.DelPrice,
        // InitialStock:req.body.InitialStock,
        Category:req.body.Category,
        // sold:req.body.sold,
        image:req.body.image,
        // Description:req.body.Description,
        // images:req.body.images
    })
    // console.log(req.body.images)
    .then((result)=>{
            if(result) return res.status(200).send(result);console.log(result)
                return res.status(400).json({succes:false})
    })
    .catch((err)=>{res.send(err);console.log(err)})
})

  Router.get("/", async (req,res)=>{
    const Products = await Product.find().populate('Category')
    if(!Products) return res.status(400).send("Couldn’t get anything for you")
    res.status(200).send(Products)
  })
  Router.get("/:id", async (req,res)=>{
    // console.log(req.params.id)
    const Products = await Product.find({_id:req.params.id}).populate('Category')
    if(!Products) return res.status(400).send("Couldn’t get anything for you")
    res.status(200).send(Products)
  })
  Router.get("/FindByCategory/:id", async (req,res)=>{
    const specifiedProduct = await Product.find({Category:req.params.id})
    if(!specifiedProduct) return res.status(400).send("Couldn’t get anything for you")
    res.status(200).send(specifiedProduct)
  })

  Router.get("/:id", async (req,res)=>{
    // console.log(req.s)
    const specifiedProduct = await Product.findById(req.params.id)
      //  console.log(specifiedProduct)
    if(!specifiedProduct) return res.status(400).send("Couldn’t get anything for you")
    res.status(200).json({success:true,content:specifiedProduct})
  })
 
  Router.delete("/:id",(req,res)=>{
     Product.findByIdAndRemove(req.params.id)
       .then((result)=>{
         if(result){res.send(result)}
         else{res.send("Couldn’t delete the Request Boss")}
         })
         .catch((err)=>res.send(err))
  })

module.exports = Router;
