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
import "./styles.css"

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route index element={<Home/>}/>
            <Route path='Offer' element={<Offer/>}/>
            <Route path='Profile' element={<Profile/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);