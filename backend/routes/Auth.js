const express=require('express');
const { register, login } = require('../controller/userController');

const AuthRoute=express.Router();

AuthRoute.post("/register",register)
AuthRoute.post("/login",login)




module.exports=AuthRoute;