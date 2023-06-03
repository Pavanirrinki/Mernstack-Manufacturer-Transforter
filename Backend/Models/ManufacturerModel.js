const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    where: { type: String, required: true },
    destination: {type: String, required: true },
    Address: { type: String, required: true },

Transporter:{
type:mongoose.Schema.Types.ObjectId,
   ref:"User"
  } ,
 createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quantity:{
      type:String,
      required:true
  },
  price:{
    type:Number,
    default:0
  },
  acceptedOrders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer'
  }]
 });
  
  const orders= mongoose.model('Manufacturer', orderSchema);
  
  module.exports = orders;
  