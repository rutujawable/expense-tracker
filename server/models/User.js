import { Schema,model } from "mongoose";

const userSchema = new Schema ({
    fullname:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    email:{
        type:String,
        reuired:true,
        unique:true
    },
    dob:{
        type:String,
        reuired:true


    }


},{
    timestamps:true
})

const User = model("User",userSchema)

export default User;