const express = require("express")

const {deleteUserById, getUsers, isAdmin} = require("../controllers/adminControllers")

const router = express.Router()

router.delete("/deleteUser",deleteUserById)
router.get("/users",getUsers)
router.post("/user",isAdmin)

module.exports = router