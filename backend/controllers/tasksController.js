const Task = require("../models/Tasks")
const mongoose = require("mongoose")
const { StatusCodes } = require("http-status-codes")
require("dotenv").config()

const createTask = async (req, res) => {
    try {
        const { name, startDate, endDate, description } = req.body
        const owner = req.user
        if (!name || !startDate || !endDate || !description) {
            return res.sendStatus(StatusCodes.BAD_REQUEST)
        }
        await Task.create({
            name,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            description,
            owner
        })
        res.sendStatus(StatusCodes.CREATED)
    } catch (error) {
        console.log(error)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params
        const { name, startDate, endDate, description } = req.body
        if (!name || !startDate || !endDate || !description) {
            return res.sendStatus(StatusCodes.BAD_REQUEST)
        }
        await Task.updateOne({ _id: mongoose.Types.ObjectId(taskId) }, {
            name,
            startDate,
            endDate,
            description
        })
        res.sendStatus(StatusCodes.CREATED)
    } catch (error) {
        console.log(error)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params
        await Task.deleteOne({ _id: mongoose.Types.ObjectId(taskId) })
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        console.log(error)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const getAllTasks = async (req, res) => {
    try {
        const { userId } = req.params
        const tasks = await Task.find({ owner: mongoose.Types.ObjectId(userId) })
        res.status(StatusCodes.OK).json({ tasks })
    } catch (error) {
        console.log(error)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params
        const task = await Task.findById(taskId)
        await task.populate("owner")
        console.log(task)
        res.status(StatusCodes.OK).json({ task })
    } catch (error) {
        console.log(error)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
    getTaskById
}