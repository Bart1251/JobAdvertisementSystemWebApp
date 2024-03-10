import { React, useContext } from 'react'
import UserContext from '../../contexts/UserContext'

export default function Login() {
    let {loginUser} = useContext(UserContext)
    return (
        <form onSubmit={loginUser}>
            <input type="text" name="username" placeholder="Enter Username" />
            <input type="password" name="password" placeholder="Enter Password" />
            <input type="submit"/>
        </form>
    )
}