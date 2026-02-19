const isTeacher=(req,res,next)=>{
   if(req.session.role==="teacher"){
     next()
   }else{
    res.status(401).json({msg:"Unauthorized Access"})
   }
}
module.export=isTeacher;