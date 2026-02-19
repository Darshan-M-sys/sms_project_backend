const isStudent=(req,res,next)=>{
   if(req.session.role==="student"){
     next()
   }else{
    res.status(401).json({msg:"Unauthorized Access"})
   }
}
module.export=isStudent;