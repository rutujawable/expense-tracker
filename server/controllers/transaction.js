import Transaction from "../models/Transaction.js";
import User from "../models/User.js";


const postTransaction =  async(req,res)=>{

    const {title,amount,cateogary,type,user} = req.body

    const transaction = new Transaction({
     title,
     amount,
     cateogary,
     type,
     user


    })

    const savedtransaction = await transaction.save()

    if(savedtransaction){
          res.json({
           success:true,
           message:"transaction saved succesfully",
           data:savedtransaction
          })
         }
     
      else {
     res.json({
      success:false,
      message:"transaction does not  saved succesfully",
      data:null
     })

}

}


const getTransaction = async (req,res)=>{
    const {userID} = req.query;

    const user = await User.findById(userID)
    if(!user){
        res.json({
            success:false,
            message:"user not found"
        })



    }
    

    const transaction = await Transaction.find({user:userID})
    if(transaction){
        res.json({
        success:true,
        data:transaction
    })
    }

   


}


const deleteTransaction = async (req, res) => {
    const {id} = req.params;
  
    await Transaction.deleteOne({_id: id});
  
    res.json({
      success: true,
      message: `Transaction deleted successfully`,
      data: null
    })
  }






export {postTransaction,getTransaction,deleteTransaction}


