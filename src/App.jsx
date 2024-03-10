import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound"
import Offer from "./pages/Offer/Offer"
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Logout from './pages/Logout/Logout';
import { UserProvider } from './contexts/UserContext';
import "./styles.css"

export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path='Offer' element={<Offer/>}/>
                    <Route path='Profile' element={<Profile/>}/>
                    <Route path='Login' element={<Login/>}/>
                    <Route path='Register' element={<Register/>}/>
                    <Route path='Logout' element={<Logout/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);