import { React, useState } from 'react'
import { useUser } from '../../contexts/UserContext'
import { useValidation } from '../../contexts/ValidationContext';

export default function Register() {
    const { registerUser } = useUser();
    const { validateFields } = useValidation();
    const [data, setData] = useState({first_name: "", last_name: "", phone_number: "", email: "", password: "", password_repeat: ""});
    const [errors, setErrors] = useState({});

    const regexes = {
        first_name: /^[A-Za-z]+$/,
        last_name: /^[A-Za-z]+(?:[-' ][A-Za-z]+)*$/,
        phone_number: /^\+?(\d{1,3})[-. ]?(\d{1,3})[-. ]?(\d{1,4})[-. ]?(\d{1,4})$/,
        email: /^[\w\.-]+@[\w\.-]+\.\w{2,}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        password_repeat: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    };
    const minLenghts = {
        first_name: 2, last_name: 2, phone_number: 9, email: 5, password: 5, password_repeat: 5,
    };
    const maxLenghts = {
        first_name: 50, last_name: 50, phone_number: 20, email: 50, password: 50, password_repeat: 50,
    }
    const errorMessages = {
        first_name: "Błędne imię",
        last_name: "Błędne nazwisko",
        phone_number: "Błędny numer telefonu",
        email: "Błędny email",
        password: "Błędne hasło",
        password_repeat: "Błędne hasło",
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
        if(data.password != data.password_repeat)
            errorsTmp["form_password"] = "Hasła się różnią";
        if(!hasErrors)
            if(!(await registerUser(data)))
                errorsTmp["form_email"] = "Konto z podanym adresem email już istnieje";
        setErrors(errorsTmp);
    }

    return (
        <div className="min-vh-100 d-flex flex-row justify-content-center align-items-center">
            <form onSubmit={submit} className='bg-body-secondary col-xl-4 col-md-6 col-sm-8 col-10 px-4 py-5 rounded-3 shadow'>
                <h1 className='fs-2 fw-normal text-center mb-5'>Job Navigator</h1>
                <h2 className='fs-4 my-3'>Zarejestruj się</h2>

                <label htmlFor="first_name" className="form-label">Imię</label>
                <input type="text" value={data.first_name} onChange={handleChange} name="first_name" className={`form-control ${errors.first_name ? 'is-invalid' : ''}`} id="first_name"/>
                {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                
                <label htmlFor="last_name" className="form-label mt-3">Nazwisko</label>
                <input type="text" value={data.last_name} onChange={handleChange} name="last_name" className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} id="last_name"/>
                {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}

                <label htmlFor="phone_number" className="form-label mt-3">Numer telefonu</label>
                <input type="text" value={data.phone_number} onChange={handleChange} name="phone_number" className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`} id="phone_number"/>
                {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}

                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" value={data.email} onChange={handleChange} name="email" className={`form-control ${errors.email || errors.form_email ? 'is-invalid' : ''}`} id="email"/>
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                
                <label htmlFor="password" className="form-label mt-3">Hasło</label>
                <input type="password" value={data.password} onChange={handleChange} name="password" className={`form-control ${errors.password || errors.form_password ? 'is-invalid' : ''}`} id="password"/>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                <label htmlFor="password_repeat" className="form-label mt-3">Powtórz hasło</label>
                <input type="password" value={data.password_repeat} onChange={handleChange} name="password_repeat" className={`form-control ${errors.password_repeat || errors.form_password ? 'is-invalid' : ''}`} id="password_repeat"/>
                {errors.password_repeat && <div className="invalid-feedback">{errors.password_repeat}</div>}
                
                {errors.form_email && <div className="invalid-feedback">{errors.form_email}</div>}
                {errors.form_password && <div className="invalid-feedback">{errors.form_password}</div>}
                <button type="submit" className="btn btn-primary mt-3">Zarejestruj się</button>
            </form>
        </div>
    )
}