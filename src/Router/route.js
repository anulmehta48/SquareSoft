const express=require('express');
const router=express.Router();
const { CreateUser, GetUser, GetByUserId, GetAllUser, DeleteUser } = require('../Controller/userController');


router.get('/test-me',(req,res)=>{
    res.send("My First Api")
})

router.post('/CreateUser',CreateUser)
router.get('/get',GetUser)
router.get('/getByid',GetByUserId)
router.get('/getAlluser',GetAllUser)
router.delete('/delete',DeleteUser)




router.all('/*',(req,res)=>{
    res.status(400).send({status:false,message:"Make sure your end point is correct !!!"})
})

module.exports=router;
