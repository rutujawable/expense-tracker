import { Schema,model } from "mongoose";

const transactionSchema = new Schema(
    {


      title:{
        type:String,
        default:"no title"

      },
      
      amount :{
        type:Number,
        required:true
      },


      cateogary:{
        type:String,
        default:"others"

      },


    type:{

       type:String,
        required:true
      },


      user:{
        type:Schema.Types.ObjectId,
        ref:"User"
      }

      



    },{
        timestamps:true
    }
)

const Transaction = model("Transaction", transactionSchema)

export default Transaction;
