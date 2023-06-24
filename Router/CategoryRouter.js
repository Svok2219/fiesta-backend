const express = require('express');
const {Category} =require('../Model/Category');
const router = express.Router();

router.post('/', async (req,res)=>{
    console.log(req.body)
    const CategoryBody = new Category({
      name:req.body.Category,
  })
  const PostedCategoryBody = await CategoryBody.save() 
  if(!PostedCategoryBody) return res.status(400).json({success:false})
                                 res.status(200).json({success:true,content:PostedCategoryBody})
})

router.get('/getAllCategories', async (req,res)=>{
const Categories = await Category.find()
if(!Categories) return res.status(400).json({success:false})
                return res.status(200).json({success:true,content:Categories})
})

router.get('/:id', async (req,res)=>{
Category.findById(req.params.id)
.then((theCategory)=>{
    if(!theCategory){
     res.status(404).json({success:false,message:'the User does not exists'})
    }
    else{
    res.status(200).send(theCategory)
    }
})
.catch((err=>{
    res.status(400).json({success:false,error:err})
}))
})

router.delete('/:id',(req,res)=>{
    console.log(req.params.id)
    Category.findByIdAndRemove(req.params.id)
    .then((result)=>{
        if(!result){
            res.status(404).json({success:false,message:'the User does not exists'})
           }
           else{
           res.status(200).send(Category)
           }
    })
    .catch((err)=>{res.status(400).json({success:false,error:err})
})
})
module.exports = router;