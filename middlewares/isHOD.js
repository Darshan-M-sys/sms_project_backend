const isHOD=(req,res,next)=>{
   if(req.session.role==="hod"){
     next()
   }else{
    res.status(401).json({msg:"Unauthorized Access"})
   }
}
module.export=isHOD;