const express=require('express');
const app=express();
const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
const router=require('./Router/route')

app.use(express.json())

mongoose.connect("mongodb+srv://funupdb-first:VxaFh8Uez4zyv95l@cluster0.kizeuyb.mongodb.net/SquareInfoSoft?retryWrites=true&w=majority",
    {useNewUrlParser:true})
    .then(()=>console.log("MongoDB is connected"))
    .catch((error)=>console.log(error))

app.use('/',router)

app.listen(process.env.PORT||3000,()=>{
    console.log("Express is Running on PORT "+(process.env.PORT||3000))
})