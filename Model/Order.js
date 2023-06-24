const mongoose = require("mongoose");
const OrderModel = mongoose.Schema({
    Name: { type: String, required: true },
    Email: {type:String,required:true},
    PassingYear:{type:Number,required:true},
    Roll: {type:String,required:true},
       Description : [{
    type: Object, required: true
    }],
    OrderStatus: { type: String, default:'Pending'},
    Payment:{type:String,required:false}
  });
  exports.Orders=mongoose.model('Orders',OrderModel)