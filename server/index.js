import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import  User from "./models/User.js";
import { postLogin, postSignup } from "./controllers/user.js";
 import Transaction from "./models/Transaction.js";
import { postTransaction,getTransaction,deleteTransaction } from "./controllers/transaction.js";



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



   app.post("/signup", postSignup)


   app.post("/login", postLogin)


   app.post("/transaction", postTransaction)

   app.get("/transactions", getTransaction)

   app.delete("/transaction/:id", deleteTransaction)



app.listen(port,(req,res)=>{
    console.log(`server is running on port ${port}` )
})