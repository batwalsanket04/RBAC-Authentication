const jwt=require('jsonwebtoken')
const userModel=require('../model/userSchema')

const isAdmin=async(req,res,next)=>{
try {
    const token=req.cookie.token;

    if(!token)
    {
        return res.status(401).json({message:"Unothorized: No token provided"})
    }

    const decode=jwt.verify(token,process.env.MY_SECRET_KEY)
    const user=await userModel.findById(decode.id)

    if(!user){
        return res.status(401).json({message:"User not found"})
    }

    if(user.role!=="admin"){
        return res.status(403).json({message:"Unothorized:User is not an admin"})
    }

    req.user=user.next()
    
} catch (error) {
    
}
}


module.exports={
    isAdmin
}