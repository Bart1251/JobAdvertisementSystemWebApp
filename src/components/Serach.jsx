import { useState, useEffect } from "react";
import Dropdown from "./Dropdown"
import { useApi } from "../contexts/ApiContext";

export default function Search() {
    const { apiRequest } = useApi();
    const [categories, setCategories] = useState([]);
    const [jobLevels, setJobLevels] = useState([]);
    const [jobTypes, setJobTypes] = useState([]);
    const [typesOfContract, setTypesOfContract] = useState([]);
    const [workShifts, setWorkShifts] = useState([]);
    const [searchSettings, setSearchSettings] = useState({ position: "", category: "0", location: "", distance: "30", job_level: [], job_type: [], type_of_contract: [], work_shift: [] });

    useEffect(() => {
        async function fetchGeneralData() {
            const categoriesData = await apiRequest(`http://127.0.0.1/category`, "GET");
            const jobLevelsData = await apiRequest(`http://127.0.0.1/jobLevel`, "GET");
            const jobtypesData = await apiRequest(`http://127.0.0.1/jobType`, "GET");
            const typesOfContractData = await apiRequest(`http://127.0.0.1/typeOfContract`, "GET");
            const workShiftsData = await apiRequest(`http://127.0.0.1/workShift`, "GET");

            setCategories(categoriesData);
            setJobLevels(jobLevelsData);
            setJobTypes(jobtypesData);
            setTypesOfContract(typesOfContractData);
            setWorkShifts(workShiftsData);
        }

        fetchGeneralData();
    }, []);

    function searchFormChange(e) {
        const { name } = e.target;
        setSearchSettings(prevState => {
            const updatedState = {...prevState};
            if(name == "job_level" || name == "type_of_contract" || name == "job_type" || name == "work_shift") {
                if(e.target.checked) {
                    updatedState[name].push(e.target.getAttribute("data-key"));
                } else {
                    updatedState[name] = updatedState[name].filter(se => se != e.target.getAttribute("data-key"));
                }
                console.log(e.target.checked)
            } else {
                updatedState[name] = e.target.value;
            }
            console.log(updatedState);
            return updatedState;
        });
    }

    return (
        <form className="bg-light-subtle shadow rounded m-sm-5 p-4">
            <div className="row mb-4 d-xl-flex d-none">
                <div className=" col-4 p-0">
                    <div className="form-floating">
                        <input type="text" onChange={searchFormChange} value={searchSettings.position} name="position" className="form-control rounded-end-0" placeholder=""/>
                        <label htmlFor="floatingInput">Stanowisko, firma, słowo kluczowe</label>
                    </div>
                </div>
                <div className=" col-3 p-0">
                    <div className="form-floating">
                        <select onChange={searchFormChange} className="form-select h-100 p-3 rounded-0" defaultValue="0" name="category">
                            <option key={0} value={0}>Kategoria</option>
                            {categories.map(e => { return <option key={e.category_id} value={e.category_id}>{e.category}</option>})}
                        </select>
                    </div>
                </div>
                <div className="col-3 p-0">
                    <div className="form-floating">
                        <input type="text" onChange={searchFormChange} value={searchSettings.location} name="location" className="form-control rounded-0" placeholder=""/>
                        <label htmlFor="floatingInput">Lokalizacja</label>
                    </div>
                </div>
                <div className="col-2 p-0">
                    <div className="input-group h-100">
                        <div className="form-floating">
                            <input type="text" onChange={searchFormChange} value={searchSettings.distance} name="distance" className="form-control rounded-0" disabled={searchSettings.location.length == 0 ? true : false} defaultValue="30" placeholder=""/>
                            <label htmlFor="floatingInput">Odległość</label>
                        </div>
                        <button className="btn btn-outline-secondary border-secondary-subtle disabled">KM</button>
                    </div>
                </div>
            </div>
            <div className="row mb-4 d-xl-none">
                <div className="col-12 p-1">
                    <div className="form-floating">
                        <input type="text" onChange={searchFormChange} value={searchSettings.position} name="position" className="form-control rounded-end-0" placeholder=""/>
                        <label htmlFor="floatingInput">Stanowisko, firma, słowo kluczowe</label>
                    </div>
                </div>
                <div className="col-12 p-1">
                    <div className="form-floating">
                        <select onChange={searchFormChange} className="form-select h-100 p-3 rounded-0" defaultValue="0" name="category">
                            <option key={0} value={0}>Kategoria</option>
                            {categories.map(e => { return <option key={e.category_id} value={e.category_id}>{e.category}</option>})}
                        </select>
                    </div>
                </div>
                <div className="col-12 p-1">
                    <div className="form-floating">
                        <input type="text" onChange={searchFormChange} value={searchSettings.location} name="location" className="form-control rounded-0" placeholder=""/>
                        <label htmlFor="floatingInput">Lokalizacja</label>
                    </div>
                </div>
                <div className="col-12 p-1">
                    <div className="input-group h-100">
                        <div className="form-floating">
                            <input type="text" onChange={searchFormChange} value={searchSettings.distance} name="distance" className="form-control rounded-0" disabled={searchSettings.location.length == 0 ? true : false} defaultValue="30" placeholder=""/>
                            <label htmlFor="floatingInput">Odległość</label>
                        </div>
                        <button className="btn btn-outline-secondary border-secondary-subtle disabled">KM</button>
                    </div>
                </div>
            </div>
            
            <div className="row w-100">
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Poziom stanowiska" btnClassName="btn-outline-secondary w-100">
                        {jobLevels.map(e => { return (
                            <li key={e.job_level_id} className="dropdown-item d-flex gap-2">
                                <input type="checkbox" onChange={searchFormChange} name="job_level" checked={searchSettings.job_level.find(se => se == e.job_level_id)} data-key={e.job_level_id} id={"jobLevel" + e.job_level_id}/>
                                <label htmlFor={"jobLevel" + e.job_level_id}>{e.job_level}</label>
                            </li>
                        )})}
                    </Dropdown>
                </div>
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Rodzaj umowy" btnClassName="btn-outline-secondary w-100">
                        {typesOfContract.map(e => { return (
                            <li key={e.type_of_contract_id} className="dropdown-item d-flex gap-2">
                                <input type="checkbox" onChange={searchFormChange} name="type_of_contract" checked={searchSettings.type_of_contract.find(se => se == e.type_of_contract_id)} data-key={e.type_of_contract_id} id={"typeOfContract" + e.type_of_contract_id}/>
                                <label htmlFor={"typeOfContract" + e.type_of_contract_id}>{e.type_of_contract}</label>
                            </li>
                        )})}
                    </Dropdown>
                </div>
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Wymiar pracy" btnClassName="btn-outline-secondary w-100">
                        {workShifts.map(e => { return (
                            <li key={e.work_shift_id} className="dropdown-item d-flex gap-2">
                                <input type="checkbox" onChange={searchFormChange} name="work_shift" checked={searchSettings.work_shift.find(se => se == e.work_shift_id)} data-key={e.work_shift_id} id={"workShift" + e.work_shift_id}/>
                                <label htmlFor={"workShift" + e.work_shift_id}>{e.work_shift}</label>
                            </li>
                        )})}
                    </Dropdown>
                </div>
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Tryb pracy" btnClassName="btn-outline-secondary w-100">
                        {jobTypes.map(e => { return (
                            <li key={e.job_type_id} className="dropdown-item d-flex gap-2">
                                <input type="checkbox" onChange={searchFormChange} name="job_type" checked={searchSettings.job_type.find(se => se == e.job_type_id)} data-key={e.job_type_id} id={"jobType" + e.job_type_id}/>
                                <label htmlFor={"jobType" + e.job_type_id}>{e.job_type}</label>
                            </li>
                        )})}
                    </Dropdown>
                </div>
                <div className="col-auto ms-auto">
                    <button type="submit" className="btn btn-primary rounded-pill p-3 fs-5 ps-4 pe-4">Szukaj<i className="bi bi-search ps-1"></i></button>
                </div>
            </div>
        </form>
    )
}