import { createContext, useContext } from "react";

const ValidationContext = createContext();

export const ValidationProvider = ({ children }) => {

    function validateArrayFields(fields, regexes, minLenghts, maxLenghts, messages) {
        let hasErrors = false;
        const errors = fields.map(e => {
            let [innerErrors, hasInnerErrors] = validateFields(e, regexes, minLenghts, maxLenghts, messages)
            hasErrors = (hasInnerErrors == true ? hasInnerErrors : hasErrors);
            return innerErrors;
        });
        return [errors, hasErrors];
    }

    function validateFields(fields, regexes, minLenghts, maxLenghts, messages) {
        const errors = {};
        let hasErrors = false;
        for (const field in regexes) {
            if(typeof fields[field] == "object" && fields[field] != null && !Array.isArray(fields[field])) {
                let [newErrors, newHasErrors] = validateFields(fields[field], regexes[field], minLenghts[field], maxLenghts[field], messages[field]);
                errors[field] = newErrors;
                hasErrors = (newHasErrors == true ? newHasErrors : hasErrors);
            } else if(Array.isArray(fields[field])) {
                errors[field] = [];
                fields[field].forEach((e, i) => {
                    if(typeof fields[field][i] == "object" && fields[field][i] != null && !Array.isArray(fields[field][i])) {
                        let [newErrors, newHasErrors] = validateFields(fields[field][i], regexes[field], minLenghts[field], maxLenghts[field], messages[field]);
                        errors[field][i] = newErrors;
                        hasErrors = (newHasErrors == true ? newHasErrors : hasErrors);
                    } else {
                        if (!regexes[field].test(fields[field][i]) || fields[field][i].toString().length < minLenghts[field] || fields[field][i].toString().length > maxLenghts[field]) {
                            errors[field][i] = messages[field];
                            hasErrors = true;
                        }
                        else
                            errors[field] = "";
                    }
                });
            } else {
                if (!regexes[field].test(fields[field]) || fields[field].toString().length < minLenghts[field] || fields[field].toString().length > maxLenghts[field]) {
                    errors[field] = messages[field];
                    hasErrors = true;
                }
                else
                    errors[field] = "";
            } 
        }
        return [errors, hasErrors];
    }

    let contextData = {
        validateFields: validateFields,
        validateArrayFields: validateArrayFields,
    }

    return (
        <ValidationContext.Provider value={contextData}>
            {children}
        </ValidationContext.Provider>
    );
}

export const useValidation = () => useContext(ValidationContext);