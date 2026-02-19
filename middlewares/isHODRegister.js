const isHODRegister=(req,res,next)=>{
 const roles=["admin","principal"];
  if(roles.includes(req.session.role)){
    next();
  }else{
    res.status(400).json({msg:"Unauthorized Access!"})
  }
}

module.exports= isHODRegister;