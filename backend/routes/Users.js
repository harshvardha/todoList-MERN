const express = require("express")
const {
    registerUser,
    loginUser,
    updateUser
} = require("../controllers/usersController")

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/update/:userId', updateUser)

module.exports = router