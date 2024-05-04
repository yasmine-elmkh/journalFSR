const jwt = require("jsonwebtoken")
const User = require("../models/userModels");
// signUp
const signUp = async (req, res) => {
    try{
        const {firstName, lastName, email, role, password} = req.body;
        console.log(firstName, lastName, email, role, password)
         
        if(!password || !role || !email || !firstName || !lastName){
            return res.status(400).json({
                message: "all field are required"
            })
        }
        const matchedUser = await User.findOne({email});

        if(matchedUser){
            return res.status(401).json({
                message: "email already exist!"
            })
        }

        const user = new User({
            firstName,
            lastName,
            email, 
            password,
            role
        })

        await user.save()

        res.status(200).json({
            message: "registration succeed"
        })

    }catch(err){
        console.log(err)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}
//signIn
const signIn = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!password || !email){
            return res.status(400).json({
                message: "all field are required"
            })
        }
      
        const user = await User.findOne({email})
                            .select("_id lastName firstName email role createdAt password")

        if(!user){
            return res.status(400).json({
                message: "Email or Password incorrect"
            })
        }

        if(user?.password !== password){
            return res.status(401).json({
                message: "Email or Password incorrect"
            })
        }

        // json web token

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
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message: "Server Error"
        })
} }  
module.exports = {
  signIn, 
  signUp
}
