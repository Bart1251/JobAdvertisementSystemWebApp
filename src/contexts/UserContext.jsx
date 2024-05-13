import { createContext, useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { useApi } from './ApiContext';

const UserContext = createContext()

export const UserProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).accessToken).data.userId : null);

    const navigateTo = useNavigate();
    const { apiRequest } = useApi();

    let loginUser = async (data) => {
        let response = await apiRequest('http://127.0.0.1/login', "POST", {'email': data.email, 'password': data.password});
        
        if (response) {
            setAuthTokens(response);
            setUser(jwtDecode(response.accessToken).data.userId);
            localStorage.setItem('authTokens', JSON.stringify(response));
            navigateTo('/');
        }
        else {
            return false;
        }
    }

    let registerUser = async (data) => {
        let response = await apiRequest('http://127.0.0.1/register', "POST", {
            'email': data.email, 
            'password': data.password,
            'first_name': data.first_name,
            'last_name': data.last_name,
            'phone_number': data.phone_number
        });
        
        if (response) {
            setAuthTokens(response);
            setUser(jwtDecode(response.accessToken).data.userId);
            localStorage.setItem('authTokens', JSON.stringify(response));
            navigateTo('/');
        }
        else {
            return false;
        }
    }

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigateTo("/");
    }

    let updateToken = async () => {
        let response = await apiRequest('http://127.0.0.1/refresh', "POST", {
            'refreshToken': authTokens?.refreshToken,
        });
        
        if (response) {
            setAuthTokens(response);
            setUser(jwtDecode(response.accessToken).data.userId);
            localStorage.setItem('authTokens', JSON.stringify(response));
        }
        else {
            logoutUser();
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser,
        updateToken: updateToken,
    }

    return (
        <UserContext.Provider value={contextData} >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);