const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require('../Models/Usermodel');




router.post("/signup",async(req,res)=>{
const { firstname,lastname,email,password,Role,Address} = req.body;
    try{
const user = await User.findOne({email})
if(!user){
    const userdata = new User({
        firstname,lastname,email,password,Role,Address
    })
    userdata.save()
    res.status(200).json({userdata})
}else{
    res.status(500).send("User With Same Email Already Exists")
}
    }catch(e){
        res.status(500).json(e)
    }
})


router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
      const existingUser = await User.findOne({ email });
      if(existingUser){
        if(existingUser.password == password){
          let payload={ 
            user:{
                id:existingUser.id
            }
           
        }
        
        jwt.sign(payload,"jwtpassword",(error,token)=>{
         if(error) throw error
       return res.json({token,existingUser})
        
        })
        }else{
          return res.status(400).send("password wrong")
        }
      }else{
        return  res.status(400).send("email wrong")
      }
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
  
//searching for transporters
router.get("/transporter-profiles", async(req,res)=>{
  try{
const profiles = await User.find({Role:"Transporter"});
res.status(200).json({profiles})
  }catch(e){
    res.status(500).json(e)
  }
})

router.get("/profile/:id",async (req,res)=>{
  const {id} = req.params;
  try{
const usersprofile = await User.findById(id)
res.status(200).json(usersprofile)
  }catch(e){
    res.status(500).json(e)
  }
})


module.exports = router;