const express = require("express")
const {
    registerUser,
    loginUser,
    updateUser
} = require("../controllers/usersController")
const verifyAccessToken = require("../middleware/verifyAccessToken")

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/update/:userId', verifyAccessToken, updateUser)

module.exports = router