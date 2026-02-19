const mongoose=require("mongoose");

const connectedDb=()=>{
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>console.log("The Database Is connected")).catch((err)=>console.log(err))
}

module.exports=connectedDb