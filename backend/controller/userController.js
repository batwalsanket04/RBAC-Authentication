require('dotenv').config();
const userModel=require('../model/userSchema')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken')

const register=async(req,res)=>{
try {

    const {name,email,password}=req.body;

    if(!name || !email || !password)
    {
       return res.status(400).json({message:"All field are required"})
    }

    const user=await userModel.findOne({email})
    
    if(user){
        return res.status(400).json({message:"User Already Exist"})
    }

    const regexPaass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!regexPaass.test(password))
    {
        return res.status(400).json({message:"password must be 8 character,1 lowercase,1 uppercase and symbol"})
    }
   
    const hashpass=await bcrypt.hash(password,10)

    
    const result=await userModel.create({name,email,password:hashpass})

     res.status(201).json({success:true,message:"User Register Successfully",user:result})
    
} catch (error) {
     res.status(500).json({success:false,message:"Registration failed.."})
}
}


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
 
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
 
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

 
    const token = JWT.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.MY_SECRET_KEY,
      { expiresIn: "2h" }
    );
 
    res.status(201).json({
  success: true,
  message: "User Login Successfully",token,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email
  }
});

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};





module.exports={register,login}