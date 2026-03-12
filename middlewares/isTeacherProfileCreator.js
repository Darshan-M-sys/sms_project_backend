const isTeacherProfileCreator= (req,res,next)=>{
 const roles=['admin',"teacher"]
 if(roles.includes(req.session.role)){
  next()
 }else{
  return res.status(400).json({msg:"Unauthorized Access"})
 }
}

module.exports=isTeacherProfileCreator;