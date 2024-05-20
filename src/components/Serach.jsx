import Dropdown from "./Dropdown"

export default function Search({ searchSettings, searchSettingsSetter, searchValues, fetchOffers }) {

    function searchFormChange(e) {
        const { name } = e.target;
        searchSettingsSetter(prevState => {
            const updatedState = {...prevState};
            if(name == "job_level" || name == "type_of_contract" || name == "job_type" || name == "work_shift") {
                if(e.target.checked) {
                    updatedState[name].push(e.target.getAttribute("data-key"));
                } else {
                    updatedState[name] = updatedState[name].filter(se => se != e.target.getAttribute("data-key"));
                }
            } else {
                updatedState[name] = e.target.value;
            }
            return updatedState;
        });
    }

    function checkBoxDoubleClick(e) {
        const { name } = e.target;
        searchSettingsSetter(prevState => {
            const updatedState = {...prevState};
            updatedState[name] = [];
            updatedState[name].push(e.target.getAttribute("data-key"));
            return updatedState;
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        fetchOffers();
    }

    return (
        <form onSubmit={onSubmit} className="bg-light-subtle shadow rounded my-5 m-sm-5 p-4">
            <div className="row mb-4 d-xl-flex d-none">
                <div className=" col-4 p-0">
                    <div className="form-floating">
                        <input type="text" onChange={searchFormChange} value={searchSettings.position} name="position" className="form-control rounded-end-0" placeholder=""/>
                        <label htmlFor="floatingInput">Stanowisko, firma</label>
                    </div>
                </div>
                <div className=" col-3 p-0">
                    <div className="form-floating">
                        <select onChange={searchFormChange} className="form-select h-100 p-3 rounded-0" defaultValue="0" name="category">
                            <option key={0} value={0}>Kategoria</option>
                            {searchValues.categories.map(e => { return <option key={e.category_id} value={e.category_id}>{e.category}</option>})}
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
                            <input type="text" onChange={searchFormChange} value={searchSettings.distance} name="distance" className="form-control rounded-0" disabled={searchSettings.location.length == 0 ? true : false} placeholder=""/>
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
                        <label htmlFor="floatingInput">Stanowisko, firma</label>
                    </div>
                </div>
                <div className="col-12 p-1">
                    <div className="form-floating">
                        <select onChange={searchFormChange} className="form-select h-100 p-3 rounded-0" defaultValue="0" name="category">
                            <option key={0} value={0}>Kategoria</option>
                            {searchValues.categories.map(e => { return <option key={e.category_id} value={e.category_id}>{e.category}</option>})}
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
                            <input type="text" onChange={searchFormChange} value={searchSettings.distance} name="distance" className="form-control rounded-0" disabled={searchSettings.location.length == 0 ? true : false} placeholder=""/>
                            <label htmlFor="floatingInput">Odległość</label>
                        </div>
                        <button className="btn btn-outline-secondary border-secondary-subtle disabled">KM</button>
                    </div>
                </div>
            </div>
            
            <div className="row w-100">
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Poziom stanowiska" btnClassName="btn-outline-secondary w-100">
                        {searchValues.jobLevels.map(e => { return (
                            <li key={e.job_level_id} className="dropdown-item d-flex gap-2">
                                <input type="checkbox" onChange={searchFormChange} onDoubleClick={checkBoxDoubleClick} name="job_level" checked={searchSettings.job_level.find(se => se == e.job_level_id) ? true : false} data-key={e.job_level_id} id={"jobLevel" + e.job_level_id}/>
                                <label htmlFor={"jobLevel" + e.job_level_id}>{e.job_level}</label>
                            </li>
                        )})}
                    </Dropdown>
                </div>
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Rodzaj umowy" btnClassName="btn-outline-secondary w-100">
                        {searchValues.typesOfContract.map(e => { return (
                            <li key={e.type_of_contract_id} className="dropdown-item d-flex gap-2">
                                <input type="checkbox" onChange={searchFormChange} onDoubleClick={checkBoxDoubleClick} name="type_of_contract" checked={searchSettings.type_of_contract.find(se => se == e.type_of_contract_id) ? true : false} data-key={e.type_of_contract_id} id={"typeOfContract" + e.type_of_contract_id}/>
                                <label htmlFor={"typeOfContract" + e.type_of_contract_id}>{e.type_of_contract}</label>
                            </li>
                        )})}
                    </Dropdown>
                </div>
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Wymiar pracy" btnClassName="btn-outline-secondary w-100">
                        {searchValues.workShifts.map(e => { return (
                            <li key={e.work_shift_id} className="dropdown-item d-flex gap-2">
                                <input type="checkbox" onChange={searchFormChange} onDoubleClick={checkBoxDoubleClick} name="work_shift" checked={searchSettings.work_shift.find(se => se == e.work_shift_id) ? true : false} data-key={e.work_shift_id} id={"workShift" + e.work_shift_id}/>
                                <label htmlFor={"workShift" + e.work_shift_id}>{e.work_shift}</label>
                            </li>
                        )})}
                    </Dropdown>
                </div>
                <div className="col-xl-auto col-md-6 p-3">
                    <Dropdown text="Tryb pracy" btnClassName="btn-outline-secondary w-100">
                        {searchValues.jobTypes.map(e => { return (
                            <li key={e.job_type_id} className="dropdown-item d-flex gap-2">
                                <input type="checkbox" onChange={searchFormChange} onDoubleClick={checkBoxDoubleClick} name="job_type" checked={searchSettings.job_type.find(se => se == e.job_type_id) ? true : false} data-key={e.job_type_id} id={"jobType" + e.job_type_id}/>
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