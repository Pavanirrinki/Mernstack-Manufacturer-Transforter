const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Userroutes = require("./Routes/Userroutes")
const Manufacturerroutes = require('./Routes/Manufacturerroute')
require("dotenv").config()


const app= express()


app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.use(express.json());
app.use("/",Userroutes)
app.use("/",Manufacturerroutes)
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then
(()=>console.log("DB CONNECTED8"))


const PORT =process.env.PORT|| 7890
console.log(PORT)
app.listen(PORT,()=>{
    return console.log("server running")
})











