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

        if (files.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files[]', files[i]);
            }
            config.body = formData;
        } else if (body) {
            config.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, config);
            if (response.ok) {
                if (isFile) {
                    return URL.createObjectURL(await response.blob());
                } else {
                    if (issus)
                        console.log(await response.text());
                    return await response.json();
                }
            }
            return false;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const buildQueryParams = (params) => {
        const query = Object.keys(params)
            .map(key => {
                if (Array.isArray(params[key]) && params[key].length > 0) {
                    return params[key].map(val => `${encodeURIComponent(key)}[]=${encodeURIComponent(val)}`).join('&');
                } else if (Array.isArray(params[key])) {
                    return '';
                } else {
                    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
                }
            })
            .filter(Boolean)
            .join('&');
        return query;
    };

    let contextData = {
        apiRequest: apiRequest,
        buildQueryParams: buildQueryParams,
    }

    return (
        <ApiContext.Provider value={contextData}>
            {children}
        </ApiContext.Provider>
    );
}

export const useApi = () => useContext(ApiContext);