const User = require("../models/Users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const BadRequestError = require("../error/badRequestError")
const { StatusCodes } = require("http-status-codes")
require("dotenv").config()

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, email, password } = req.body
        if (!firstName || !lastName || !userName || !email || !password) {
            res.sendStatus(StatusCodes.BAD_REQUEST)
        }
        const userExist = await User.find({ email: email })
        if (userExist) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        await User.create({
            firstName,
            lastName,
            userName,
            email,
            hashedPassword
        })
        res.sendStatus(StatusCodes.CREATED)
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.sendStatus(StatusCodes.BAD_REQUEST)
        }
        const userExist = await User.findOne({ email: email })
        if (!userExist) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" })
        }
        const passwordsMatched = await bcrypt.compare(password, userExist.password)
        if (!passwordsMatched) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide correct password" })
        }
        const accessToken = jwt.sign({
            email,
            "username": userExist.userName
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
        userExist.accessToken = accessToken
        userExist.save()
        res.status(StatusCodes.OK).json({ accessToken })
    } catch (error) {
        console.log(error)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, email } = req.body
        const userId = req.params
        if (!firstName || !lastName || !userName || !email) {
            return res.sendStatus(StatusCodes.BAD_REQUEST)
        }
        await User.updateOne({ _id: userId }, {
            firstName,
            lastName,
            userName,
            email
        })
        res.sendStatus(StatusCodes.CREATED)
    } catch (error) {
        console.log(error)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser
}