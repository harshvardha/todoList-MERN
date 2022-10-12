import { tasks } from "../services/supplier"
import { useContext } from "react"
import { TodoListContext } from "../context/TodoListContext"
import "./TaskCard.css"

const TaskCard = ({ setModalType, setIsModalOpen, setTask, setAllTasks, taskId, name, startDate, endDate, description }) => {
    const { accessToken } = useContext(TodoListContext)

    const updateTask = () => {
        setModalType(1)
        const task = {
            taskId,
            name,
            description,
            startDate,
            endDate
        }
        setTask(task)
        setIsModalOpen(true)
    }

    const deleteTask = async () => {
        if (taskId) {
            const response = await tasks.deleteTask(accessToken, taskId)
            if (response.status === 200) {
                setAllTasks(prevState => prevState.filter(task => task._id !== taskId))
                window.alert("Task deleted")
            }
        } else {
            window.alert("Problem deleting the task")
        }
    }

    return (
        <div className="taskCard">
            <div className="taskCard--about">
                <div>
                    <h4>{description}</h4>
                    <p className="taskCard--subText">{name}</p>
                </div>
            </div>
            <hr style={{ height: "10px" }} />
            <div className="taskCard--duration">
                <div>
                    <h4>Started On</h4>
                    <p className="taskCard--subText">{startDate.split("T")[0]}</p>
                </div>
                <div>
                    <h4>End On</h4>
                    <p className="taskCard--subText">{endDate.split("T")[0]}</p>
                </div>
            </div>
            <div className="taskCard--buttons">
                <button type="button" onClick={updateTask}>update</button>
                <button type="button" onClick={deleteTask}>delete</button>
            </div>
        </div>
    )
}

export default TaskCard