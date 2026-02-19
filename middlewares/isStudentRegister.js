const isStudentRegister= (req,res,next)=>{
 const roles=['admin',"principal","officeStaff"]
 if(roles.includes(req.session.role)){
  next()
 }else{
  return res.status(400).json({msg:"Unauthorized Access"})
 }
}

module.exports=isStudentRegister;