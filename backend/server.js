const express = require('express') // packages express
const mongoose = require('mongoose') // base de donnees mongo
const bodyParser = require('body-parser');
const cors = require("cors")
const cookieParser = require('cookie-parser');


require('dotenv').config()
const app = express() 

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
})
.then(() => console.log("db is connected"))
.catch((err) => console.log("db is not connected ... !", err))

// middlewares
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors())
app.use(cookieParser())

// routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const articleRoutes = require('./routes/articleRoutes')
const adminRoutes = require('./routes/adminRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/article",articleRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/category",categoryRoutes)


app.get("/",async (req, res) => {
    return res.send("Sever is running ... !!!!!")
})



app.listen(4000, () => { // 4000 port a utiliser
    console.log("sever is running on port 4000")
})                                                                    