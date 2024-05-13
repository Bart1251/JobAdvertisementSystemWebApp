import { createContext, useContext } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

    async function apiRequest(url, method, body = null, headers = {}, isFile = false, files = [], issus = false) {
        const defaultHeaders = isFile ? {} : { 'Content-Type': 'application/json' };
        headers = { ...defaultHeaders, ...headers };
    
        const config = {
            method: method,
            headers: headers
        };

        if(files.length > 0) {
            const formData = new FormData();
            for(let i = 0; i < files.length; i++) {
                formData.append('files[]', files[i]);
            }
            config.body = formData;
        } else if(body) {
            config.body = JSON.stringify(body);
        }
    
        try {
            const response = await fetch(url, config);
            if (response.ok) {
                if (isFile && method == "GET") {
                    return URL.createObjectURL(await response.blob());
                } else {
                    if(issus)
                        console.log(await response.text());
                    return await response.json();
                }
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    let contextData = {
        apiRequest: apiRequest,
    }

    return (
        <ApiContext.Provider value={contextData}>
            {children}
        </ApiContext.Provider>
    );
}

export const useApi = () => useContext(ApiContext);