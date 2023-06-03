const express = require("express")
const router = express.Router();
const manufacturer = require("../Models/Manufacturermodel")
const User = require("../Models/Usermodel")

//Manufacturer place the order and save into that particular transporter user model
router.post("/manufacturer-order", async (req, res) => {
  const { orderId, where, destination, Address, Transporter, quantity,createdBy} = req.body;
  try {
   
    const data = new manufacturer({ orderId, where, destination, Address, Transporter, quantity,createdBy });

    const user_order = await User.findById(Transporter);

    
    const savedData = await data.save();
 ;
    
    user_order.orders.push(savedData._id);
    user_order.save()

    res.status(201).json({ message: "Order created successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});


//All the orders get by particular transporter

router.get('/Transporter-orders', async (req, res) => {

  const { orderId } = req.query;

  try {
    const allOrders = await manufacturer.find({ _id: { $in: orderId } });

    res.status(200).json({ allOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update-price", async (req, res) => {
  const { id,price} = req.body;
 try {
    const manufacturerprice = await manufacturer.findByIdAndUpdate(id, { price }, { new: true });
if (!manufacturerprice) {
      return res.status(404).json({ error: "Manufacturer not found" });
    }
res.json({ message: "Price updated successfully", manufacturerprice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get("/all-orders-of-manufacturer/:id",async(req,res)=>{
  const {id} = req.params;
  try{
const allordersofmanufacturer = await manufacturer.find({createdBy:id})
res.status(200).json({allordersofmanufacturer})
  }catch(e){
    res.status(500).json({ error: error.message });
  }
})
module.exports = router