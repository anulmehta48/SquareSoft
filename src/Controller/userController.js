const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");

const CreateUser = async function (req, res) {
  try {
        const user = req.body;
        if (Object.keys(user).length == 0) return res.status(400).send({ status: false, message: "Please provide details" });
        if (!user.name) return res.status(400).send({ status: false, message: "UserName is required " });
        if (!user.email) return res.status(400).send({ status: false, message: "User Email is required " });
        if (!user.dob) return res.status(400).send({ status: false, message: "User DOB is required " });
        if (!user.password) return res.status(400).send({ status: false, message: "User Password is required " });
        const usercreated = await userModel.create(user);

        const token = jwt.sign(
        {
            userId: usercreated._id,
            userEmail: usercreated.email,
        },
        "SQUARE-INFOSOFT"
        );

        res.status(201).send({ message: "Access token of the created user", Token: token });

  } catch (error) {
        res.status(500).send({ status: false, message: error.message });
  }
};


const GetUser = async function (req, res) {
  try {
        const requestedToken = req.headers["pass-access-token"];
        if(!requestedToken) return res.status(404).send({status:false,message:"Token must be present"})

        const tokenVerify = jwt.verify(requestedToken, "SQUARE-INFOSOFT");
        const userID = tokenVerify.userId;
        const userDetails = await userModel.findById({ _id: userID });

        res.status(200).send({ message:"User Object", User: userDetails });

  } catch (error) {
         res.status(500).send({ status: false, message: error.message });
  }
};

const GetByUserId = async function (req, res) {
  try {
        const data=req.query
        if(!data.user_id) return res.status(400).send({status:false,message:"Please proved user_id"})
        const userid=data.user_id

        const requestedToken = req.headers["pass-access-token"];
        if(!requestedToken) return res.status(404).send({status:false,message:"Token must be present"})
        const tokenVerify = jwt.verify(requestedToken, "SQUARE-INFOSOFT");
        const userID = tokenVerify.userId;
        if(userID != userid) return res.status(401).send({status:false,message:"User is Unauthorized "})

        const userDetails = await userModel.findById({ _id: userID });
        res.status(200).send({message:"User Object",User:userDetails})

  } catch (error) {
        res.status(500).send({ status: false, message: error.message });
  }
};


const GetAllUser=async function(req,res){
    try {
        const requestedToken = req.headers["pass-access-token"];
        if(!requestedToken) return res.status(404).send({status:false,message:"Token must be present"})

        const tokenVerify = jwt.verify(requestedToken, "SQUARE-INFOSOFT");
        const userID = tokenVerify.userId;
        const checked=await userModel.findById({_id:userID})
        if(!checked) return res.status(403).send({status:false,message:"you are unauthorized "})

        const allUser=await userModel.find()
        res.status(200).send({message:"List of user",User:allUser})
        
        
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const DeleteUser=async function(req,res){
    try {
        const data=req.query
        if(!data.user_id) return res.status(400).send({status:false,message:"Please proved user_id"})
        const userid=data.user_id

        const requestedToken = req.headers["pass-access-token"];
        if(!requestedToken) return res.status(404).send({status:false,message:"Token must be present"})
        const tokenVerify = jwt.verify(requestedToken, "SQUARE-INFOSOFT");
        const userID = tokenVerify.userId;
        if(userID != userid) return res.status(401).send({status:false,message:"User is Unauthorized "})
        
        const checked=await userModel.findById({_id:userID})
        if(!checked) return res.status(404).send({status:false,message:"This User Data is Already deteted"})

        const deletedUser=await userModel.findByIdAndDelete({_id:userID})
        res.status(200).send({message:"success"})
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
    
}


module.exports.CreateUser = CreateUser;
module.exports.GetUser = GetUser;
module.exports.GetByUserId = GetByUserId;
module.exports.GetAllUser = GetAllUser;
module.exports.DeleteUser = DeleteUser;
