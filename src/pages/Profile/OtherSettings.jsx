import { React, useState, useRef } from 'react'
import { useUser } from '../../contexts/UserContext'
import { useValidation } from '../../contexts/ValidationContext';
import { useApi } from '../../contexts/ApiContext';



export default function OtherSettings({ profilePictureSetter }) {
    const { user } = useUser();
    const { validateFields } = useValidation();
    const { apiRequest } = useApi();
    const fileInputRef = useRef();
    const [password, setPassword] = useState({current_password: "", password: "", password_repeat: ""});
    const [passwordErrors, setPasswordErrors] = useState({});

    function handlePasswordChange(e) {
        const { name, value } = e.target;
        setPassword(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const passwordRegexes = {
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        password_repeat: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    };
    const passwordMinLenghts = {
        password: 5, password_repeat: 5,
    };
    const passwordMaxLenghts = {
        password: 50, password_repeat: 50,
    }
    const passwordErrorMessages = {
        password: "Błędne hasło",
        password_repeat: "Błędne hasło",
    };

    async function updatePassword(e) {
        e.preventDefault();
        let [errorsTmp, hasErrors] = validateFields(password, passwordRegexes, passwordMinLenghts, passwordMaxLenghts, passwordErrorMessages);
        if(password.password != password.password_repeat) {
            errorsTmp["password_repeat"] = "Hasła się różnią";
            errorsTmp["password"] = "Hasła się różnią";
            hasErrors = true;
        }
        if(!hasErrors) {
            if(!(await apiRequest(`http://127.0.0.1/updatePassword/${user}`, "PUT", password))) {
                errorsTmp["current_password"] = "Błędne aktualne hasło";
            } else {
                setPassword({current_password: "", password: "", password_repeat: ""});
            }
        }
        setPasswordErrors(errorsTmp);
    }

    function openFileDialog() {
        fileInputRef.current.click();
    }

    async function uploadFile(e) {
        const files = e.target.files;
        if (files.length == 0)
            return;

        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

        if (!allowedExtensions.exec(files[0].name)) {
            console.log('Invalid file type');
            e.target.value = '';
            return;
        }

        const updatedPicture = await apiRequest(`http://127.0.0.1/profilePicture/${user}`, "POST", null, {}, true, [files[0]]);
    
        if(updatedPicture) {
            profilePictureSetter(updatedPicture);
        } else {
            console.log("Error");
        }
        e.target.value = '';
    }

    return (
        <div className="row">
            <form className="col-md-6 col-12" onSubmit={updatePassword}>
                <h3>Zmiana hasła</h3>
                <label htmlFor="password" className="form-label mt-3">Aktualne hasło</label>
                <input type="password" value={password.current_password} onChange={handlePasswordChange} name="current_password" className={`form-control ${passwordErrors.current_password ? 'is-invalid' : ''}`} id="current_password"/>
                {passwordErrors.current_password && <div className="invalid-feedback">{passwordErrors.current_password}</div>}

                <label htmlFor="password" className="form-label mt-3">Nowe hasło</label>
                <input type="password" value={password.password} onChange={handlePasswordChange} name="password" className={`form-control ${passwordErrors.password ? 'is-invalid' : ''}`} id="password"/>
                {passwordErrors.password && <div className="invalid-feedback">{passwordErrors.password}</div>}

                <label htmlFor="password_repeat" className="form-label mt-3">Powtórz hasło</label>
                <input type="password" value={password.password_repeat} onChange={handlePasswordChange} name="password_repeat" className={`form-control ${passwordErrors.password_repeat ? 'is-invalid' : ''}`} id="password_repeat"/>
                {passwordErrors.password_repeat && <div className="invalid-feedback">{passwordErrors.password_repeat}</div>}
            
                <div className="d-flex justify-content-end mt-3">
                    <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
                </div>
            </form>
            
            <form className="col-md-6 col-12">
                <h3>Zmiana zdjęcia profilowego</h3>
                <label htmlFor="files" className="form-label mt-3">Zaktualizuj zdjęcie profilowe</label>
                <div onClick={openFileDialog} className="form-control d-flex justify-content-center align-items-center" style={{height: 210}}>
                    <input type="file" ref={fileInputRef} onChange={uploadFile} name="files" className="d-none"/>
                    <i className="bi bi-plus" style={{fontSize: 150}}/>
                </div>
            </form>
        </div>
    );
}