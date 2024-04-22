const express = require("express")

const {deleteUserById,getUsers} = require("../controllers/adminControllers")

const router = express.Router()

router.delete("/deleteUser",deleteUserById)
router.get("/users",getUsers)


module.exports = router