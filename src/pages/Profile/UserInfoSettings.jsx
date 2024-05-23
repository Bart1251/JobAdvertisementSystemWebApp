import { useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import { useValidation } from "../../contexts/ValidationContext";

export default function UserInfoSettings({ userInfoSet, userInfoSetter }) {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const { validateFields } = useValidation();
    const [userInfo, setUserInfo] = useState(userInfoSet);
    const [userInfoErrors, setUserInfoErrors] = useState({});

    function handleUserInfoChange(e) {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const userInfoRegexes = {
        first_name: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/,
        last_name: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/,
        occupation: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/,
        date_of_birth: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        address: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s,'-]+$/,
        phone_number: /^\+?(\d{1,3})[-. ]?(\d{1,3})[-. ]?(\d{1,4})[-. ]?(\d{1,4})$/,
        email: /^[\w\.-]+@[\w\.-]+\.\w{2,}$/,
        description: /^[\w\s.,!?;:'"-]{1,500}$/,
        current_job_description: /^[\w\s.,!?;:'"-]{1,500}$/,
    };
    const userInfoMinLenghts = {
        first_name: 2, last_name: 2, occupation: 5, date_of_birth: 0, address: 5, phone_number: 9, email: 5, description: 1, current_job_description: 1,
    };
    const userInfoMaxLenghts = {
        first_name: 50, last_name: 50, occupation: 50, date_of_birth: 50, address: 50, phone_number: 20, email: 50, description: 500, current_job_description: 500,
    }
    const userInfoErrorMessages = {
        first_name: "Błędne imię",
        last_name: "Błędne nazwisko",
        occupation: "Błędny zawód/wykształcenie",
        date_of_birth: "Błędna data urodzenia",
        address: "Błędny adres",
        phone_number: "Błędny numer telefonu",
        email: "Błędny E-mail",
        description: "Błędny opis",
        current_job_description: "Błędny opis",
    };

    async function saveUserInfo(e) {
        e.preventDefault();
        const [userInfoErrorsTmp, hasErrors] = validateFields(userInfo, userInfoRegexes, userInfoMinLenghts, userInfoMaxLenghts, userInfoErrorMessages);
        if (new Date().toISOString().split("T")[0] <= userInfo.date_of_birth)
            userInfoErrorsTmp["date_of_birth"] = "Błęda data urodzenia";
        if(!hasErrors) {
            if(!(await apiRequest(`http://127.0.0.1/user/${user}`, "PUT", userInfo))) {
                userInfoErrorsTmp["email"] = "Konto z podanym adresem email już istnieje";
            } else {
                userInfoSetter(userInfo);
            }
        }
        setUserInfoErrors(userInfoErrorsTmp);
    }

    return (
        <form className="row" onSubmit={saveUserInfo}>
            <h3>Dane osobowe</h3>
            <div className="col-md-6 col-12">
                <label htmlFor="first_name" className="form-label">Imię</label>
                <input type="text" value={userInfo.first_name} onChange={handleUserInfoChange} name="first_name" className={`form-control ${userInfoErrors.first_name ? 'is-invalid' : ''}`} id="first_name"/>
                {userInfoErrors.first_name && <div className="invalid-feedback">{userInfoErrors.first_name}</div>}

                <label htmlFor="last_name" className="form-label pt-3">Nazwisko</label>
                <input type="text" value={userInfo.last_name} onChange={handleUserInfoChange} name="last_name" className={`form-control ${userInfoErrors.last_name ? 'is-invalid' : ''}`} id="last_name"/>
                {userInfoErrors.last_name && <div className="invalid-feedback">{userInfoErrors.last_name}</div>}

                <label htmlFor="occupation" className="form-label pt-3">Zawód/Wykształcenie</label>
                <input type="text" value={userInfo.occupation} onChange={handleUserInfoChange} name="occupation" className={`form-control ${userInfoErrors.occupation ? 'is-invalid' : ''}`} id="occupation"/>
                {userInfoErrors.occupation && <div className="invalid-feedback">{userInfoErrors.occupation}</div>}

                <label htmlFor="date_of_birth" className="form-label pt-3">Data urodzenia</label>
                <input type="date" value={userInfo.date_of_birth} onChange={handleUserInfoChange} name="date_of_birth" className={`form-control ${userInfoErrors.date_of_birth ? 'is-invalid' : ''}`} id="date_of_birth"/>
                {userInfoErrors.date_of_birth && <div className="invalid-feedback">{userInfoErrors.date_of_birth}</div>}

                <label htmlFor="address" className="form-label pt-3">Adres zamieszkania</label>
                <input type="text" value={userInfo.address} onChange={handleUserInfoChange} name="address" className={`form-control ${userInfoErrors.address ? 'is-invalid' : ''}`} id="address"/>
                {userInfoErrors.address && <div className="invalid-feedback">{userInfoErrors.address}</div>}

                <label htmlFor="phone_number" className="form-label pt-3">Numer telefonu</label>
                <input type="text" value={userInfo.phone_number} onChange={handleUserInfoChange} name="phone_number" className={`form-control ${userInfoErrors.phone_number ? 'is-invalid' : ''}`} id="phone_number"/>
                {userInfoErrors.phone_number && <div className="invalid-feedback">{userInfoErrors.phone_number}</div>}

                <label htmlFor="email" className="form-label pt-3">Adres E-mail</label>
                <input type="text" value={userInfo.email} onChange={handleUserInfoChange} name="email" className={`form-control ${userInfoErrors.email ? 'is-invalid' : ''}`} id="email"/>
                {userInfoErrors.email && <div className="invalid-feedback">{userInfoErrors.email}</div>}
            </div>
            <div className="col-md-6 col-12">
                <label htmlFor="description" className="form-label">Napisz coś o sobie</label>
                <textarea value={userInfo.description} onChange={handleUserInfoChange} name="description" style={{minHeight: 220}} className={`form-control ${userInfoErrors.description ? 'is-invalid' : ''}`} id="description"/>
                {userInfoErrors.description && <div className="invalid-feedback">{userInfoErrors.description}</div>}

                <label htmlFor="current_job_description" className="form-label pt-3">Napisz coś o swoim aktualnym stanowisku</label>
                <textarea value={userInfo.current_job_description} onChange={handleUserInfoChange} name="current_job_description" style={{minHeight: 220}} className={`form-control ${userInfoErrors.current_job_description ? 'is-invalid' : ''}`} id="current_job_description"/>
                {userInfoErrors.current_job_description && <div className="invalid-feedback">{userInfoErrors.current_job_description}</div>}
            </div>
            <div className="d-flex justify-content-end mt-3">
                <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
            </div>
        </form>
    )
}