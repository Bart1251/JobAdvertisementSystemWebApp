import CompanyInfo from "./CompanyInfo";
import Offers from "./Offers";
import Settings from "./Settings";
import Documents from "../Profile/Documents";
import Applications from "../Company/Applications";
import { useApi } from "../../contexts/ApiContext";
import img from "../../assets/react.svg";
import { useUser } from "../../contexts/UserContext";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Link, Route, Routes } from "react-router-dom";

export default function Company() {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const [companyInfo, setCompanyInfo] = useState({});
    const [companyLogo, setCompanyLogo] = useState(img);
    const [files, setFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [jobLevels, setJobLevels] = useState([]);
    const [jobTypes, setJobTypes] = useState([]);
    const [typesOfContract, setTypesOfContract] = useState([]);
    const [workShifts, setWorkShifts] = useState([]);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const userData = await apiRequest(`http://127.0.0.1/user/${user}`, "GET");
            if(userData && userData.company_id) {
                const companyInfoData = await apiRequest(`http://127.0.0.1/company/${userData.company_id}`, "GET");
                const logoData = await apiRequest(`http://127.0.0.1/companyLogo/${userData.company_id}`, "GET", null, {}, true);
                const filesData = await apiRequest(`http://127.0.0.1/file/${user}`, "GET");
                const categoriesData = await apiRequest(`http://127.0.0.1/category`, "GET");
                const jobLevelsData = await apiRequest(`http://127.0.0.1/jobLevel`, "GET");
                const jobtypesData = await apiRequest(`http://127.0.0.1/jobType`, "GET");
                const typesOfContractData = await apiRequest(`http://127.0.0.1/typeOfContract`, "GET");
                const workShiftsData = await apiRequest(`http://127.0.0.1/workShift`, "GET");
                const offersData = await apiRequest(`http://127.0.0.1/companyOffers/${userData.company_id}`, "GET", null, {}, false, [], false);

                if(companyInfoData) {
                    setCompanyInfo(companyInfoData);
                    if(logoData)
                        setCompanyLogo(logoData);
                    setFiles(filesData);
                    setCategories(categoriesData);
                    setJobLevels(jobLevelsData);
                    setJobTypes(jobtypesData);
                    setTypesOfContract(typesOfContractData);
                    setWorkShifts(workShiftsData);
                    setOffers(offersData);
                    setLoading(false);
                } else {
                    setError("Nie udało się wczytać zawartości strony");
                    setLoading(false);
                }
            } else {
                setError("Nie udało się wczytać zawartości strony");
                setLoading(false);
            }
        }

        fetchData();
    }, [user])

    if (loading) return <p>ładowanie</p>;
    if (error) return <p>Wystąpił problem: {error}</p>;

    return (
        <div className="bg-body-secondary min-vh-100 d-flex flex-column">
            <Navbar />
            <div className="d-flex flex-grow-1">
                <div className="col-lg-3 col-2 bg-light d-flex flex-column align-items-center position-fixed sidebar p-2">
                    <div className="rounded-circle ratio ratio-1x1 overflow-hidden my-2" style={{ maxWidth: 200 }}>
                        <img src={companyLogo} />
                    </div>
                    <h3 className="fs-4 d-lg-block d-none">Moja firma</h3>
                    <hr className="col-11" />
                    <ul className="nav nav-pills flex-column col-lg-12 col-auto p-3 pt-0">
                        <li><Link to={`/Company`} className="nav-link link-dark"><i className="bi bi-building me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">O firmie</span></Link></li>
                        <li><Link to={`/Company/offers`} className="nav-link link-dark"><i className="bi bi-send-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Zarządzanie ofertami</span></Link></li>
                        <li><Link to={`/Company/applications`} className="nav-link link-dark"><i className="bi bi-mailbox-flag me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Zarządzanie aplikacjami</span></Link></li>
                        <li><Link to={`/Company/documents`} className="nav-link link-dark"><i className="bi bi-file-earmark-text-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Dokumenty</span></Link></li>
                        <li><Link to={`/Company/settings`} className="nav-link link-dark"><i className="bi bi-gear-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Ustawienia</span></Link></li>
                        <li><Link to="/Logout" className="nav-link link-dark"><i className="bi bi-box-arrow-left me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Wyloguj się</span></Link></li>
                    </ul>
                </div>
                <div className="offset-lg-3 col-lg-9 offset-2 col-10">
                    <Routes>
                        <Route index element={<CompanyInfo info={companyInfo} />} />
                        <Route path="offers" element={<Offers companyId={companyInfo.company_id} offersSet={offers} offersSetter={setOffers} categories={categories} jobLevels={jobLevels} typesOfContract={typesOfContract} workShifts={workShifts} jobTypes={jobTypes} />} />
                        <Route path="documents" element={<Documents files={files} setFiles={setFiles}/>} />
                        <Route path="settings" element={<Settings companySet={companyInfo} companyLogoSetter={setCompanyLogo} companySetter={setCompanyInfo}/>} />
                        <Route path="applications" element={<Applications offersSet={offers}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}