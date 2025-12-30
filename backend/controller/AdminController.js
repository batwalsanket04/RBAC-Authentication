const express=require('express')
const userModel=require('../model/userSchema')



const getAdmin=async(req,res)=>{
    try {
        const user=await userModel.find()
        res.status(200).json({user})
        
    } catch (error) {
        res.status(500).json({message:"Internal server Error"})
    }

}

const deleteUser=async(req,res)=>{
    try {
        const id=req.params.id;

        const CheckAdmin=await userModel.findById(id)
  

if(CheckAdmin.role=='admin')
{
    return res.status(400).json({message:"You cant delete yourself"})
}

        const result=await userModel.findByIdAndDelete(id)
        if(!result)
        {
            res.status(400).json({message:"User not found"})
        }
        res.status(200).json({message:"User deleted Successfully  "})
    } catch (error) {
        
    }
}

module.exports={
    getAdmin,deleteUser
}