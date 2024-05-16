import { React, useState, useRef } from 'react'
import { useUser } from '../../contexts/UserContext'
import { useValidation } from '../../contexts/ValidationContext';


export default function OtherSettings({  }) {
    const { user } = useUser();
    const { validateFields } = useValidation();
    const inputRef = useRef();
    const [password, setPassword] = useState({password: "", password_repeat: ""});
    const [passwordErrors, setPasswordErrors] = useState({});

    return (
        <div className="row">
            <form className="col-md-6 col-12" onSubmit={updatePassword}>
                <h3>Zmiana hasła</h3>
                <label htmlFor="password" className="form-label mt-3">Hasło</label>
                <input type="password" value={data.password} onChange={handleChange} name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password"/>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                <label htmlFor="password_repeat" className="form-label mt-3">Powtórz hasło</label>
                <input type="password" value={data.password_repeat} onChange={handleChange} name="password_repeat" className={`form-control ${errors.password_repeat ? 'is-invalid' : ''}`} id="password_repeat"/>
                {errors.password_repeat && <div className="invalid-feedback">{errors.password_repeat}</div>}
            
                <div className="d-flex justify-content-end mt-3">
                    <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
                </div>
            </form>
            
            <form className="col-md-6 col-12">
                <h3>Zmiana zdjęcia profilowego</h3>
                <div onClick={openFileDialog} className="form-control">
                    <input type="file" ref={inputRef} onChange={uploadFile} className="d-none"/>
                    <p className="text-center">Zaktualizuj zdjęcie profilowe</p>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
                </div>
            </form>
        </div>
    );
}