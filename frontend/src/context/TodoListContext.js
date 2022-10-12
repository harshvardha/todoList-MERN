import { useState } from "react"
import React from "react"

const TodoListContext = React.createContext()

const TodoListProvider = ({ children }) => {
    const [userId, setUserId] = useState("")
    const [userName, setUserName] = useState("")
    const [accessToken, setAccessToken] = useState("")

    return (
        <TodoListContext.Provider
            value={{
                userId,
                accessToken,
                userName,
                setUserId,
                setUserName,
                setAccessToken
            }}
        >
            {children}
        </TodoListContext.Provider>
    )
}

export { TodoListContext, TodoListProvider }