import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT


 const connection = async ()=>{
    const mongoConnection = await mongoose.connect(process.env.MONGO_URL)
    if(mongoConnection){
        console.log("mongoDB connected successfully")
    }
 }
 
 connection ()

 app.get("/", (req,res)=>{
    res.json({
        success:true,
        message: "welcome to expense tracker"

    })
 })


app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}` )
})