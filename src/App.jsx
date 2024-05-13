import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext';
import "./styles.css"
import AppRouter from './AppRouter';
import { ValidationProvider } from './contexts/ValidationContext';
import { ApiProvider } from './contexts/ApiContext';

export default function App() {
    return (
        <BrowserRouter>
            <ApiProvider>
                <ValidationProvider>
                    <UserProvider>
                        <AppRouter/>
                    </UserProvider>
                </ValidationProvider>
            </ApiProvider>
        </BrowserRouter>
    );
}
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);