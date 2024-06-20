const { isValidObjectId } = require('mongoose')
const User = require('../models/userModels')
const jwt = require("jsonwebtoken")

//-- isAdmin --
const isAdmin = async (req,res)=>{
    try{
        const {email, password} = req.body
        console.log(email,password)
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required!"
            })
        }
        const user = await User.findOne({email});
    
            if (!user) {
                return res.status(401).json({
                    message: "not found!"
                });
            }
            if (user.role !== "admin" || user.password !== password ) {
                return res.status(402).json({
                    message: "Missing email or password!"
                });
            }

            const userInfo = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
            const token = jwt.sign(userInfo, "qkjhrnxlqJEFBZONKEHQWFGZNOUG2BMENFHWEO2", {
                expiresIn: '7d' // Example: Expires in 7 days
            });
            
            // Set the token as a cookie in the response
            res.cookie('token', token, {
                sameSate: true,
                httpOnly: false, // Prevent client-side JavaScript from accessing the cookie
                maxAge: 7 * 24 * 60 * 60 * 1000, // Example: Expires in 7 days
                // Other cookie options can be added here, such as 'secure', 'domain', etc.
            });
            
            res.status(200).json(userInfo)
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
    }

// -- deleteUserById --
const deleteUserById = async (req,res)=>{
    try{
        const adminId = req.body.adminId
        const userId = req.body.userId
        if(!isValidObjectId(adminId) || !isValidObjectId(userId)){
            return res.status(400).json({
                message:"user id not valid!"
            })
        }
        const admin = await User.findById(adminId);
    
            if (!admin || admin.role !== "admin") {
                return res.status(401).json({
                    message: "You must be the admin!"
                });
            }
        const deleteUser = await User.findByIdAndDelete(userId)

        if(!deleteUser){
            return res.status(401).json({
                message:"user did not deleted!"
            })
        }

        res.json({
            message:"user deleted" 
        })
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })

    }
}
   
//getUsers
const getUsers = async (req,res) => {
    try{
       
    const allUsers = await User.find()
    if(!allUsers){
        return res.status(403).json({
            message: "users not found!" 
        })
    }
     res.status(200).json(allUsers)
     
    }catch(Error){  
        console.log(Error)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}

module.exports = {
    isAdmin,
    deleteUserById,
    getUsers
}