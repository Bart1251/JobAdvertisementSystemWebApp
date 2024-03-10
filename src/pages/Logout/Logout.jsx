import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'

export default function Logout() {
    let {logoutUser} = useContext(UserContext)
    logoutUser()
    return (<></>)
}