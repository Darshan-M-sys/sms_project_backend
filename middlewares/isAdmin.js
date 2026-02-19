const isAdmin=(req,res,next)=>{
   if(req.session.role==="admin"){
     next()
   }else{
    res.status(401).json({msg:"Unauthorized Access"})
   }
}
module.exports=isAdmin;