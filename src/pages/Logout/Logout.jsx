import { useUser } from '../../contexts/UserContext'

export default function Logout() {
    const { logoutUser } = useUser();
    logoutUser()
    return (<></>)
}