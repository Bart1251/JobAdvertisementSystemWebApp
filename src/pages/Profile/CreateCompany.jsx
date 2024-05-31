import { useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useValidation } from "../../contexts/ValidationContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function CreateCompany() {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const navigateTo = useNavigate();
    const { validateFields } = useValidation();
    const [company, setCompany] = useState({name: "", address: "", description: ""});
    const [companyErrors, setCompanyErrors] = useState({});

    function handleCompanyChange(e) {
        const { name, value } = e.target;
        setCompany(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const companyRegexes = {
        name: /^[\w\s.,!?;:'"-]+$/,
        address: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s,'-]+$/,
        description: /^[\w\s.,!?;:'"-]{1,500}$/,
    };
    const companyMinLengths = {
        name: 2, address: 5, description: 1,
    };
    const companyMaxLengths = {
        name: 50, address: 50, description: 500,
    }
    const companyErrorMessages = {
        name: "Błędna nazwa firmy",
        address: "Błędny adres",
        description: "Błędny opis",
    };

    async function createCompany(e) {
        e.preventDefault();
        const [companyErrorsTmp, hasErrors] = validateFields(company, companyRegexes, companyMinLengths, companyMaxLengths, companyErrorMessages);
        
        if(!hasErrors) {
            if(!(await apiRequest(`http://127.0.0.1/company/${user}`, "POST", company))) {
                companyErrorsTmp["name"] = "Konto z podaną nazwą już istnieje";
            } else {
                navigateTo("/Company");
            }
        }
        setCompanyErrors(companyErrorsTmp);
    }

    return (
        <div className="m-2 m-lg-5">
            <form className="row" onSubmit={createCompany}>
                <h3>Tworzenie firmy</h3>
                <div className="col-md-6 col-12">
                    <label htmlFor="name" className="form-label">Nazwa firmy</label>
                    <input type="text" value={company.name} onChange={handleCompanyChange} name="name" className={`form-control ${companyErrors.name ? 'is-invalid' : ''}`} id="name"/>
                    {companyErrors.name && <div className="invalid-feedback">{companyErrors.name}</div>}

                    <label htmlFor="address" className="form-label">Adres</label>
                    <input type="text" value={company.address} onChange={handleCompanyChange} name="address" className={`form-control ${companyErrors.address ? 'is-invalid' : ''}`} id="address"/>
                    {companyErrors.address && <div className="invalid-feedback">{companyErrors.address}</div>}
                </div>
                <div className="col-md-6 col-12">
                    <label htmlFor="description" className="form-label">Napisz coś o swojej firmie</label>
                    <textarea value={company.description} onChange={handleCompanyChange} name="description" style={{minHeight: 106}} className={`form-control ${companyErrors.description ? 'is-invalid' : ''}`} id="description"/>
                    {companyErrors.description && <div className="invalid-feedback">{companyErrors.description}</div>}
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="submit" value="Utwórz firmę" className="btn btn-primary ms-auto"/>
                </div>
            </form>
        </div>
    )
}