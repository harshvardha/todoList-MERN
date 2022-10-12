import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authentication } from "../services/supplier"
import { TodoListContext } from "../context/TodoListContext"
import "./authentication.css"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setAccessToken, setUserId, setUserName } = useContext(TodoListContext)
    const navigate = useNavigate()

    const loginUser = async (event) => {
        event.preventDefault()
        if (!email || !password) {
            return window.alert("Please enter all required credentials")
        }
        const loginDetails = {
            email,
            password
        }
        const response = await authentication.login(loginDetails)
        if (response.status === 200) {
            console.log(response.data)
            setAccessToken("Bearer " + response.data.accessToken)
            setUserId(response.data.userId)
            setUserName(response.data.userName)
            navigate("/tasks")
        }
        else {
            window.alert("Please enter correct credentials")
        }
    }

    return (
        <div className="authentication">
            <h1 className="authentication--title">Login</h1>
            <form onSubmit={loginUser}>
                <div className="authentication--input">
                    <h4>Email</h4>
                    <input
                        name="email"
                        type="email"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="authentication--input">
                    <h4>Password</h4>
                    <input
                        name="password"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="authentication--buttons">
                    <button type="submit" >Login</button>
                    <Link to={"/register"} ><button>Register</button></Link>
                </div>
            </form>
        </div>
    )
}

export default Login