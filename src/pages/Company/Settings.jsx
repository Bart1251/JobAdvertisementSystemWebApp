import { useRef, useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useValidation } from "../../contexts/ValidationContext";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Settings({ companySet, companyLogoSetter, companySetter }) {
    const { user } = useUser();
    const navigateTo = useNavigate();
    const { apiRequest } = useApi();
    const { validateFields } = useValidation();
    const fileInputRef = useRef();
    const [company, setCompany] = useState(companySet);
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

    async function saveCompany(e) {
        e.preventDefault();
        const [companyErrorsTmp, hasErrors] = validateFields(company, companyRegexes, companyMinLengths, companyMaxLengths, companyErrorMessages);
        
        if(!hasErrors) {
            if(!(await apiRequest(`http://127.0.0.1/company/${company.company_id}`, "PUT", company))) {
                companyErrorsTmp["name"] = "Konto z podaną nazwą już istnieje";
            } else {
                companySetter(company);
            }
        }
        setCompanyErrors(companyErrorsTmp);
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

        const updatedPicture = await apiRequest(`http://127.0.0.1/companyLogo/${company.company_id}`, "POST", null, {}, true, [files[0]]);
    
        if(updatedPicture) {
            companyLogoSetter(updatedPicture);
        } else {
            console.log("Error");
        }
        e.target.value = '';
    }

    async function deleteCompany(e) {
        e.preventDefault();
        await apiRequest(`http://127.0.0.1/company/${company.company_id}`, "DELETE");
        navigateTo("/Profile");
    }

    return (
        <div className="m-2 m-lg-5">
            <form className="row" onSubmit={saveCompany}>
                <h3>Informacje o firmie</h3>
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
                    <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
                </div>
            </form>
            <hr/>
            <div className="row">
                <form className="col-md-6 col-12">
                    <h3>Zmiana zdjęcia profilowego</h3>
                    <label htmlFor="files" className="form-label mt-3">Zaktualizuj zdjęcie profilowe</label>
                    <div onClick={openFileDialog} className="form-control d-flex justify-content-center align-items-center" style={{height: 210}}>
                        <input type="file" ref={fileInputRef} onChange={uploadFile} name="files" className="d-none"/>
                        <i className="bi bi-plus" style={{fontSize: 150}}/>
                    </div>
                </form>
                <form className="col-md-6 col-12" onSubmit={deleteCompany}>
                    <h3>Usunięcie firmy</h3>
                    <button type="submit" className="btn btn-danger mt-3" id="delete">Usuń fimę</button>
                </form>
            </div>
        </div>
    )
}