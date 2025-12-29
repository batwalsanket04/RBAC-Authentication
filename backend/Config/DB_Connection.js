const mongoose=require('mongoose')

const connection=async()=>{
 try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("DB Connected Successfull");
    console.log(mongoose.connection.readyState)
 } catch (error) {
    console.log(error)
    console.log("DB Connection Failed..")
 }
}

connection();

module.exports=connection;