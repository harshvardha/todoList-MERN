import { useState, useContext, useEffect } from "react"
import { RiCloseCircleFill } from "react-icons/ri"
import { TodoListContext } from "../context/TodoListContext"
import { tasks } from "../services/supplier"
import "./TaskModal.css"

const TaskModal = ({ type, setIsModalOpen, setAllTasks, task }) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const { accessToken } = useContext(TodoListContext)


    // this will be called when props.type === 1
    const updateTask = async (event) => {
        event.preventDefault()
        if (!name || !description || !startDate || !endDate) {
            return window.alert("Please enter all the required information")
        }
        const taskDetails = {
            name,
            description,
            startDate,
            endDate
        }
        const response = await tasks.updateTask(accessToken, task.taskId, taskDetails)
        if (response.status === 201) {
            const updatedTask = response.data.updatedTask
            console.log("updated task: ", updatedTask)
            setAllTasks(prevState => {
                let newTaskArray = []
                prevState.map(item => {
                    if (item._id === task.taskId) {
                        item = { ...item, ...updatedTask }
                    }
                    newTaskArray.push(item)
                })
                console.log(newTaskArray)
                return newTaskArray
            })
            window.alert("Task updated")
            setIsModalOpen(false)
        } else {
            window.alert("Task not updated")
        }
    }

    // this will be call when props.type === 0
    const createTask = async (event) => {
        event.preventDefault()
        if (!name || !description || !startDate || !endDate) {
            return window.alert("Please enter all required information")
        }
        const taskDetails = {
            name,
            description,
            startDate,
            endDate
        }
        console.log("accessToken: ", accessToken)
        const response = await tasks.createTask(accessToken, taskDetails)
        if (response.status === 201) {
            const newTask = response.data.task
            console.log("created task: ", newTask)
            setAllTasks(prevState => [...prevState, newTask])
            window.alert("Task created")
            setIsModalOpen(false)
        }
        else {
            window.alert("Task Not Created")
        }
    }

    useEffect(() => {
        if (type === 1) {
            setName(task.name)
            setDescription(task.description)
            setStartDate(task.startDate.split("T")[0])
            setEndDate(task.endDate.split("T")[0])
        }
    }, [])

    return (
        <div className="overlay">
            <div className="taskModal">
                <div className="taskModal--form">
                    <form onSubmit={type === 1 ? updateTask : createTask}>
                        <div className="taskModal--inputs">
                            <label htmlFor="name">Name</label>
                            <input
                                name="name"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="taskModal--inputs">
                            <label htmlFor="description">Description</label>
                            <input
                                name="description"
                                type="text"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                        <div className="taskModal--inputs">
                            <label htmlFor="startDate">Start Date</label>
                            <input
                                name="startDate"
                                type="date"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                            />
                        </div>
                        <div className="taskModal--inputs">
                            <label htmlFor="endDate">End Date</label>
                            <input
                                name="endDate"
                                type="date"
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)}
                            />
                        </div>
                        <div id="formButtonContainer">
                            <button type="submit" id="formButton">{type === 1 ? "update" : "create"}</button>
                        </div>
                    </form>
                </div>
                <div id="closeButtonContainer">
                    <button type="button" onClick={() => setIsModalOpen(false)} id="closeButton"><RiCloseCircleFill id="closeIcon" /></button>
                </div>
            </div>
        </div>
    )
}

export default TaskModal