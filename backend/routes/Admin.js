const express=require('express');
const { isAdmin } = require('../middleware/VerifyToken');
const { getAdmin, deleteUser } = require('../controller/AdminController');

const AdminRoute=express.Router()

AdminRoute.get('/getuser',isAdmin,getAdmin)
AdminRoute.get('/delete/:id',isAdmin,deleteUser)




module.exports=AdminRoute;