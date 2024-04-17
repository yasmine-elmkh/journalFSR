const User = require("../models/userModels");

const signUp = async (req, res) => {
    try{
        const {name, email, role, password} = req.body;
         
        if(!password || !name || !role || !email){
            return res.status(400).json({
                message: "all field are required"
            })
        }
        const matchedUser = await User.findOne({email});

        if(matchedUser){
            return res.status(400).json({
                message: "email already exist!"
            })
        }

        const user = new User({
            name,
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

const signIn = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!password || !email){
            return res.status(400).json({
                message: "all field are required"
            })
        }
      
        const user = await User.findOne({email})
                            .select("_id name email role createdAt password")

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

        res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        })
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message: "Server Error"
        })
} }  

const getUserById = async (req, res) => {
    try{


        
    }catch(err){
        console.log(err)
        return res.status(404).json({
            message: "Server Error"
        })
    }
}
module.exports = {
    signUp ,
    signIn,
    getUserById
}