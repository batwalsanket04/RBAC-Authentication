const mongoose =require('mongoose')

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:3,
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        
    }
},
{timestamps:true}
)


const userModel=mongoose.model('user',userSchema)

module.exports=userModel;
