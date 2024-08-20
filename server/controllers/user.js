import User from "../models/User.js";



const postSignup = async (req,res)=>{

    const  {fullname,password,email,dob} = req.body

    const user = new User({
        fullname,
        password,
        email,
        dob:new Date(dob)
    })

      try{
    const saveduser = await user.save();

    res.json({
        success:true,
        data:saveduser,
        message:"signup succesfully"
    })

      }

      catch(e){
        res.json({
            success:false,
            data:e.message,
            message:"failed to sign up"
        })
      }


   }

   const postLogin = async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({
      email:email,
      password:password
    })
    
    if(user){
      res.json({
        success:true,
        data:user,
        message:"login successfully"
      })
    }

    if(!user){
      res.json({
        success:false,
        message:"invalid email or password",
        data:null

      })
    }
    
 }





   export {postSignup,postLogin};


