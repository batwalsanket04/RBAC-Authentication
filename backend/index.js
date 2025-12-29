const express=require('express')
require('dotenv').config();
const cors=require('cors')
const app=express();


const PORT=3000;
 
// middlewares

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))

//connections

const conn=require('./Config/DB_Connection')
conn();
const userRoute=require('./routes/Auth')

app.use("/api/user",userRoute)

app.get("/",(req,res)=>{
    res.send("API Working")
})


app.listen(PORT,()=>{
    console.log(`Server is up:http://localhost:${PORT}`)
})