const Task = require("../models/Tasks")
const { StatusCodes } = require("http-status-codes")
require("dotenv").config()

const createTask = async (req, res) => {
    try {
        const { name, startDate, endDate, description } = req.body
        if (!name || !startDate || !endDate || !description) {
            return res.sendStatus(StatusCodes.BAD_REQUEST)
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}