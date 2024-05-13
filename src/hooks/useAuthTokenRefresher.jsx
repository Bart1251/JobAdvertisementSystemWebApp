import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { jwtDecode } from 'jwt-decode'

export default function useAuthTokenRefresher() {
    let { updateToken, authTokens } = useUser();
    const location = useLocation();

    useEffect(() => {
        console.log("sprawdzanie")
        if (authTokens) {
            console.log("sprawdzanie2")
            const decodedToken = jwtDecode(authTokens.accessToken);
            const currentTime = Date.now() / 1000;

            // Sprawdź, czy token wygasa w ciągu najbliższych 5 minut
            if (decodedToken.exp < currentTime + 300) {
                console.log("sprawdzanie3")
                updateToken();
            }
        }
    }, [location]); // Efekt wywoływany przy zmianie trasy
}