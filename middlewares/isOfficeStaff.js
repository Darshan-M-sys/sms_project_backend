const isOfficeStaff=(req,res,next)=>{
   if(req.session.role==="officeStaff"){
     next()
   }else{
    res.status(401).json({msg:"Unauthorized Access"})
   }
}
module.exports=isOfficeStaff;