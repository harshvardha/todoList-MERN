import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authentication } from "../services/supplier"
import "./authentication.css"

const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const registerUser = async (event) => {
        event.preventDefault()
        if (!firstName || !lastName || !userName || !email || !password) {
            return window.alert("Please enter correct credentials")
        }
        const registrationDetails = {
            firstName,
            lastName,
            userName,
            email,
            password
        }
        const response = await authentication.register(registrationDetails)
        if (response.status === 201)
            navigate("/")
        else
            window.alert("Some problem occured during user registration")
    }

    return (
        <div className="authentication">
            <h1 className="authentication--title">Register</h1>
            <form onSubmit={registerUser}>
                <div className="authentication--input">
                    <h4>Firstname</h4>
                    <input
                        name="firstName"
                        type="text"
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>
                <div className="authentication--input">
                    <h4>Lastname</h4>
                    <input
                        name="lastName"
                        type="text"
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>
                <div className="authentication--input">
                    <h4>Username</h4>
                    <input
                        name="userName"
                        type="text"
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
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
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register