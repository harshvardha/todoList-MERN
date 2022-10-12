import { useEffect, useState, useContext } from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import { tasks } from "../services/supplier"
import { TodoListContext } from "../context/TodoListContext"
import TaskCard from "../components/TaskCard"
import TaskModal from "../components/TaskModal"
import "./Tasks.css"

const Tasks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState(0)
    const [allTasks, setAllTasks] = useState([])
    const [task, setTask] = useState({})
    const { userId, userName } = useContext(TodoListContext)

    const toggleModal = () => {
        setModalType(0)
        if (modalType === 0) {
            setIsModalOpen(true)
        }
    }

    useEffect(() => {
        const getData = async () => {
            const response = await tasks.getAllTasks(userId)
            console.log("all tasks: ", response.data)
            setAllTasks(response.data.tasks)
        }
        getData()
    }, [userId, tasks.getAllTasks])

    return (
        <>
            <div className="tasks">
                <div className="tasks--header">
                    <h2>Hello, {userName}</h2>
                    <button type="button" id="addTaskButton" onClick={toggleModal}><AiFillPlusCircle id="addTaskIcon" /></button>
                </div>
                <div className="tasks--tasks">
                    {allTasks.map(task => (
                        <TaskCard
                            key={task._id}
                            taskId={task._id}
                            setIsModalOpen={setIsModalOpen}
                            setModalType={setModalType}
                            name={task.name}
                            startDate={task.startDate}
                            endDate={task.endDate}
                            description={task.description}
                            setTask={setTask}
                            setAllTasks={setAllTasks}
                        />
                    ))}
                </div>
            </div>
            {isModalOpen && <TaskModal
                type={modalType}
                setIsModalOpen={setIsModalOpen}
                setAllTasks={setAllTasks}
                task={task}
            />}
        </>

    )
}

export default Tasks