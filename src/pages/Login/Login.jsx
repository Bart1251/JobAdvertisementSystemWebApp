import { React, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { useValidation } from '../../contexts/ValidationContext';

export default function Login() {
    const { loginUser } = useUser();
    const { validateFields } = useValidation();
    const [data, setData] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({});

    const regexes = {
        email: /^[\w\.-]+@[\w\.-]+\.\w{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    };
    const minLenghts = {
        email: 5, password: 5,
    };
    const maxLenghts = {
        email: 50, password: 50,
    }
    const errorMessages = {
        email: "Błędny email",
        password: "Błędne hasło",
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function submit(e) {
        e.preventDefault();
        const [errorsTmp, hasErrors] = validateFields(data, regexes, minLenghts, maxLenghts, errorMessages);
        if(!hasErrors)
            if(!(await loginUser(data)))
                errorsTmp["form"] = "Błędny email lub hasło";
        setErrors(errorsTmp);
    }

    return (
        <div className="min-vh-100 d-flex flex-row justify-content-center align-items-center">
            <form onSubmit={submit} className='bg-body-secondary col-xl-4 col-md-6 col-sm-8 col-10 px-4 py-5 rounded-3 shadow'>
                <h1 className='fs-2 fw-normal text-center mb-5'>Job Navigator</h1>
                <h2 className='fs-4 my-3'>Zaloguj się</h2>

                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" value={data.email} onChange={handleChange} name="email" className={`form-control ${errors.email || errors.form ? 'is-invalid' : ''}`} id="email"/>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                
                <label htmlFor="password" className="form-label mt-3">Hasło</label>
                <input type="password" value={data.password} onChange={handleChange} name="password" className={`form-control ${errors.password || errors.form ? 'is-invalid' : ''}`} id="password"/>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                
                {errors.form && <div className="invalid-feedback">{errors.form}</div>}
                <button type="submit" className="btn btn-primary mt-3">Zaloguj się</button>
            </form>
        </div>
    );
}