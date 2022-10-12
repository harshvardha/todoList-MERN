import axios from "axios"

const api = axios.create()
const baseUrl = "http://localhost:5000"

// api calls for authentication
export const authentication = {
    register: (registrationDetails) => api.post(`${baseUrl}/users/register`, registrationDetails),
    login: (loginDetails) => api.post(`${baseUrl}/users/login`, loginDetails),
    updateUser: (accessToken, updateDetails) => {
        api.defaults.headers.common["authorization"] = accessToken
        return api.patch(`${baseUrl}/users/update`, updateDetails)
    }
}

// api calls for tasks
export const tasks = {
    createTask: (accessToken, taskDetails) => {
        console.log(taskDetails)
        api.defaults.headers.common["authorization"] = accessToken
        return api.post(`${baseUrl}/tasks/createTask`, taskDetails)
    },
    updateTask: (accessToken, taskId, taskDetails) => {
        api.defaults.headers.common["authorization"] = accessToken
        return api.patch(`${baseUrl}/tasks/updateTask/${taskId}`, taskDetails)
    },
    deleteTask: (accessToken, taskId) => {
        api.defaults.headers.common["authorization"] = accessToken
        return api.delete(`${baseUrl}/tasks/deleteTask/${taskId}`)
    },
    getAllTasks: (userId) => api.get(`${baseUrl}/tasks/getAllTasks/${userId}`),
    getTaskById: (taskId) => api.get(`${baseUrl}/tasks/getTaskById/${taskId}`)
}