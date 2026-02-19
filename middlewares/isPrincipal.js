const isPrincipal=(req,res,next)=>{
   if(req.session.role==="principal"){
     next()
   }else{
    res.status(401).json({msg:"Unauthorized Access"})
   }
}
module.exports=isPrincipal;