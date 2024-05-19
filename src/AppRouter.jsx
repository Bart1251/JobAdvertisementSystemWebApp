import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound"
import Offer from "./pages/Offer/Offer"
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Logout from './pages/Logout/Logout';
import useAuthTokenRefresher from './hooks/useAuthTokenRefresher';

export default function AppRouter() {
    useAuthTokenRefresher();
    
    return (
        <Routes>
            <Route index element={<Home/>}/>
            <Route path='Offer/:Id' element={<Offer/>}/>
            <Route path='Profile/*' element={<Profile/>}/>
            <Route path='Login' element={<Login/>}/>
            <Route path='Register' element={<Register/>}/>
            <Route path='Logout' element={<Logout/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    );
}