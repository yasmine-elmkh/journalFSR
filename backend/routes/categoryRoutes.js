const express = require("express")

const {createCategory, deleteCategory, getAllCategory, updateCategory} = require("../controllers/categoryControllers")

const router = express.Router()

router.post("/create",createCategory)
router.delete("/delete",deleteCategory)
router.put("/update", updateCategory)
router.get("/allCategory",getAllCategory)










module.exports = router