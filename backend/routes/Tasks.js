const express = require("express")
const {
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
    getTaskById
} = require("../controllers/tasksController")
const verifyAccessToken = require("../middleware/verifyAccessToken")
const router = express.Router()

router.post('/createTask', verifyAccessToken, createTask)
router.patch('/updateTask/:taskId', verifyAccessToken, updateTask)
router.delete('/deleteTask/:taskId', verifyAccessToken, deleteTask)
router.get('/getAllTasks/:userId', getAllTasks)
router.get('/getTaskById/:taskId', getTaskById)

module.exports = router