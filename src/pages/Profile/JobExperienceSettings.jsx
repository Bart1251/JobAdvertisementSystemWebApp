import { useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import { useValidation } from "../../contexts/ValidationContext";

export default function JobExperienceSettings({ jobExperiencesSet, jobExperiencesSetter }) {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const { validateArrayFields } = useValidation();
    const [jobExperiences, setJobExperiences] = useState(jobExperiencesSet ? jobExperiencesSet : []);
    const [jobExperienceNewResponsibilities, setJobExperienceNewResponsibilities] = useState(jobExperiencesSet.map(e => {return {id: e.job_experience_id, responsibilities: []}}));
    const [newJobExperiences, setNewJobExperiences] = useState([]);
    const [jobExperiencesToDelete, setJobExperiencesToDelete] = useState([]);
    const [jobExperiencesResponsibilitiesToDelete, setJobExperiencesResponsibilitiesToDelete] = useState(jobExperiencesSet.map(e => {return {id: e.job_experience_id, responsibilities: []}}));
    const [jobExperienceErrors, setJobExperienceErrors] = useState([[], false]);
    const [newJobExperienceErrors, setNewJobExperienceErrors] = useState([[], false]);
    const [jobExperienceNewResponsibilitiesErrors, setJobExperienceNewResponsibilitiesErrors] = useState([[], false]);

    function handleJobExperienceChange(e) {
        const { name, value } = e.target;
        const key = findKey(e.target.parentNode);
        setJobExperiences(prevState => {
            const updatedState = [...prevState];
            if (name == "responsibilities") {
                updatedState[updatedState.findIndex(se => se.job_experience_id == key)][name][updatedState[key][name].findIndex(se => se.job_experience_responsibility_id == parseInt(e.target.getAttribute('data-key')))].responsibility = value;
                return updatedState;
            } else if (name == "period_of_employment_start" || name == "period_of_employment_end") {
                console.log(value);
                if (value == "0000-00-00" || value == "") {
                    updatedState[updatedState.findIndex(se => se.job_experience_id == key)][name] = null;
                } else {
                    updatedState[updatedState.findIndex(se => se.job_experience_id == key)][name] = value;
                }
                return updatedState;
            } else {
                updatedState[updatedState.findIndex(se => se.job_experience_id == key)][name] = value;
                return updatedState;
            }
        });
    }

    function handleJobExperienceNewResponsibilitiesChange(e) {
        const key = findKey(e.target.parentNode);
        setJobExperienceNewResponsibilities(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].responsibilities[-(parseInt(e.target.getAttribute('data-key')) + 1)] = e.target.value;
            return updatedState;
        });
    }

    function handleNewJobExperienceChange(e) {
        const { name, value } = e.target;
        const key = findKey(e.target.parentNode);
        setNewJobExperiences(prevState => {
            const updatedState = [...prevState];
            if (name == "responsibilities") {
                updatedState[-(key + 1)][name][parseInt(e.target.getAttribute('data-key'))] = value;
                return updatedState;
            } else if (name == "period_of_employment_start" || name == "period_of_employment_end") {
                if (value == "0000-00-00" || value == "") {
                    updatedState[-(key + 1)][name] = null;
                } else {
                    updatedState[-(key + 1)][name] = value;
                }
                return updatedState;
            } else {
                updatedState[-(key + 1)][name] = value;
                return updatedState;
            }
        });
    }

    function addNewResponsibility(e) {
        const key = findKey(e.target.parentNode);
        setJobExperienceNewResponsibilities(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].responsibilities.push("");
            return updatedState;
        });
    }

    function addJobExperience(e) {
        setNewJobExperiences(prevState => {
            return [{position: "", company: "", location: "", period_of_employment_start: null, period_of_employment_end: null, responsibilities: []}, ...prevState]
        });
    }

    function addNewJobExperienceResponsibility(e) {
        const key = findKey(e.target.parentNode);
        setNewJobExperiences(prevState => {
            const updatedState = [...prevState];
            updatedState[-(key + 1)].responsibilities.push("");
            return updatedState;
        });
    }

    function deleteNewResponsibility(e) {
        const key = findKey(e.target.parentNode);
        setJobExperienceNewResponsibilities(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.id == key)].responsibilities.splice(-(parseInt(e.target.previousElementSibling.getAttribute('data-key')) + 1), 1);
            return updatedState;
        });
        setJobExperienceErrors([[], false]);
    }

    function deleteResponsibility(e) {
        const key = findKey(e.target.parentNode);
        setJobExperiences(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.job_experience_id == key)].responsibilities.splice(updatedState[updatedState.findIndex(se => se.job_experience_id == key)].responsibilities.findIndex(se => se.job_experience_responsibility_id == parseInt(e.target.previousElementSibling.getAttribute('data-key'))), 1);
            setJobExperiencesResponsibilitiesToDelete(prevState => { return [...prevState, parseInt(e.target.previousElementSibling.getAttribute('data-key'))]});
            return updatedState;
        });
        setJobExperienceErrors([[], false]);
    }

    function deleteJobExperience(e) {
        const key = findKey(e.target.parentNode);
        setJobExperiencesToDelete(prevState => { return [...prevState, key]});
        setJobExperiences(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(updatedState.findIndex(se => se.job_experience_id == key), 1);
            return updatedState;
        });
        setJobExperienceErrors([[], false]);
    }

    function deleteNewJobExperienceResponsibility(e) {
        const key = findKey(e.target.parentNode);
        setNewJobExperiences(prevState => {
            const updatedState = [...prevState];
            updatedState[-(key + 1)].responsibilities.splice(parseInt(e.target.previousElementSibling.getAttribute('data-key')), 1);
            return updatedState;
        });
        setNewJobExperienceErrors([[], false]);
    }

    function deleteNewJobExperience(e) {
        const key = findKey(e.target.parentNode);
        setNewJobExperiences(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(-(key + 1), 1);
            return updatedState;
        });
        setNewJobExperienceErrors([[], false]);
    }

    function findKey(parent) {
        while(parent && !parent.hasAttribute('data-key')) {
            parent = parent.parentNode;
        }
        return parseInt(parent.getAttribute('data-key'));
    }

    const jobExperienceRegexes = {
        position: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-z]+)*$/,
        company: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-z]+)*$/,
        location: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s,'-]+$/,
        period_of_employment_start: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        responsibilities: { responsibility: /^[\w\s.,!?;:'"-]{1,300}$/ },
    };
    const newJobExperienceRegexes = {
        position: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-z]+)*$/,
        company: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-z]+)*$/,
        location: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s,'-]+$/,
        period_of_employment_start: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        responsibilities: /^[\w\s.,!?;:'"-]{1,300}$/,
    };
    const jobExperienceNewResponsibilitiesRegexes = {
        responsibilities: /^[\w\s.,!?;:'"-]{1,300}$/,
    }
    const jobExperienceMinLenghts = {
        position: 5, company: 5, location: 5, period_of_employment_start: 0, responsibilities: { responsibility: 2 },
    };
    const newJobExperienceMinLenghts = {
        position: 5, company: 5, location: 5, period_of_employment_start: 0, responsibilities: 2 ,
    };
    const jobExperienceNewResponsibilitiesMinLengths = {
        responsibilities: 2,
    }
    const jobExperienceMaxLenghts = {
        position: 50, company: 50, location: 50, period_of_employment_start: 50, responsibilities: { responsibility: 300 },
    }
    const newJobExperienceMaxLenghts = {
        position: 50, company: 50, location: 50, period_of_employment_start: 50, responsibilities: 300,
    }
    const jobExperienceNewResponsibilitiesMaxLengths = {
        responsibilities: 300,
    }
    const jobExperienceErrorMessages = {
        position: "Błędne stanowisko",
        company: "Błędna firma",
        location: "Błędna lokalizacja",
        period_of_employment_start: "Błędne rozpoczęcie pracy",
        responsibilities: { responsibility: "Błędny obowiązek" },
    };
    const newJobExperienceErrorMessages = {
        position: "Błędne stanowisko",
        company: "Błędna firma",
        location: "Błędna lokalizacja",
        period_of_employment_start: "Błędne rozpoczęcie pracy",
        responsibilities: "Błędny obowiązek",
    };
    const jobExperienceNewResponsibilitiesErrorMessages = {
        responsibilities: "Błędny obowiązek",
    }

    async function saveJobExperiences(e) {
        e.preventDefault();
        const [errorsTmp1, hasErrors1] = validateArrayFields(jobExperiences, jobExperienceRegexes, jobExperienceMinLenghts, jobExperienceMaxLenghts, jobExperienceErrorMessages);
        const [errorsTmp2, hasErrors2] = validateArrayFields(jobExperienceNewResponsibilities, jobExperienceNewResponsibilitiesRegexes, jobExperienceNewResponsibilitiesMinLengths, jobExperienceNewResponsibilitiesMaxLengths, jobExperienceNewResponsibilitiesErrorMessages);
        const [errorsTmp3, hasErrors3] = validateArrayFields(newJobExperiences, newJobExperienceRegexes, newJobExperienceMinLenghts, newJobExperienceMaxLenghts, newJobExperienceErrorMessages);

        if(!hasErrors1 && !hasErrors2 && !hasErrors3) {
            jobExperiences.forEach(async se => {
                await apiRequest(`http://127.0.0.1/jobExperience/${se.job_experience_id}`, "PUT", {
                    position: se.position,
                    company: se.company,
                    location: se.location,
                    period_of_employment_start: se.period_of_employment_start,
                    period_of_employment_end: se.period_of_employment_end,
                    responsibilities: se.responsibilities,
                });
            });
            jobExperienceNewResponsibilities.forEach(async se => {
                se.responsibilities.forEach(async sse => {
                    await apiRequest(`http://127.0.0.1/jobExperienceResponsibility`, "POST", {
                        job_experience_id: se.id,
                        responsibility: sse,
                    });
                });
            });
            newJobExperiences.forEach(async se => {
                await apiRequest(`http://127.0.0.1/jobExperience`, "POST", {
                    user_id: user,
                    position: se.position,
                    company: se.company,
                    location: se.location,
                    period_of_employment_start: se.period_of_employment_start,
                    period_of_employment_end: se.period_of_employment_end,
                    responsibilities: se.responsibilities,
                });
            });
            jobExperiencesToDelete.forEach(async se => {
                await apiRequest(`http://127.0.0.1/jobExperience/${se}`, "DELETE");
            });
            jobExperiencesResponsibilitiesToDelete.forEach(async se => {
                await apiRequest(`http://127.0.0.1/jobExperienceResponsibility/${se}`, "DELETE");
            });
            const allJobExperiences = await apiRequest(`http://127.0.0.1/jobExperience/${user}`, "GET");
            jobExperiencesSetter(allJobExperiences);
            setJobExperiences(allJobExperiences);
            setJobExperienceNewResponsibilities(allJobExperiences.map(e => {return {id: e.job_experience_id, responsibilities: []}}))
            setNewJobExperiences([]);
            setJobExperiencesToDelete([]);
            setJobExperiencesResponsibilitiesToDelete([]);
            setJobExperienceErrors([[], false]);
            setNewJobExperienceErrors([[], false]);
            setJobExperienceNewResponsibilitiesErrors([[], false]);
        }

        setJobExperienceErrors([errorsTmp1, hasErrors1]);
        setJobExperienceNewResponsibilitiesErrors([errorsTmp2, hasErrors2]);
        setNewJobExperienceErrors([errorsTmp3, hasErrors3]);
    }

    return (
        <form className="mt-5" onSubmit={saveJobExperiences}>
            <div className="d-flex gap-3">
                <h4>Doświadczenie zawodowe</h4>
                <input type="button" value="Nowy" className="btn btn-primary" style={{transform: "TranslateY(-7px)"}} onClick={addJobExperience}/>
            </div>
            {newJobExperiences.map((e, i) => { return (
            <div key={-i - 1} data-key={-i - 1} className={`${i > 0 ? 'my-5' : 'mb-5'}`}>
                {i > 0 && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="position" className="form-label">Stanowisko</label>
                        <input type="text" value={e.position} onChange={handleNewJobExperienceChange} name="position" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].position ? 'is-invalid' : ''}`} id="position"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].position}</div>}

                        <label htmlFor="company" className="form-label pt-3">Firma</label>
                        <input type="text" value={e.company} onChange={handleNewJobExperienceChange} name="company" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].company ? 'is-invalid' : ''}`} id="company"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].company}</div>}

                        <label htmlFor="location" className="form-label pt-3">Lokalizacja</label>
                        <input type="text" value={e.location} onChange={handleNewJobExperienceChange} name="location" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].location ? 'is-invalid' : ''}`} id="location"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].location}</div>}

                        <label htmlFor="period_of_employment_start" className="form-label pt-3">Ropoczęcie pracy</label>
                        <input type="date" value={e.period_of_employment_start} onChange={handleNewJobExperienceChange} name="period_of_employment_start" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].period_of_employment_start ? 'is-invalid' : ''}`} id="period_of_employment_start"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].period_of_employment_start}</div>}

                        <label htmlFor="period_of_employment_end" className="form-label pt-3">Zakończenie pracy (zostaw puste jeśli nadal pracujesz)</label>
                        <input type="date" value={e.period_of_employment_end} onChange={handleNewJobExperienceChange} name="period_of_employment_end" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].period_of_employment_end ? 'is-invalid' : ''}`} id="period_of_employment_end"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].period_of_employment_end}</div>}
                    </div>
                    <div className="col-md-6 col-12">
                        <label>Obowiązki</label>
                        <ul style={{maxHeight: 335, overflowY: "auto"}}>
                            {e.responsibilities.map((se, j) => { return (
                                <li key={j} className="position-relative">
                                    <input data-key={j} type="text" value={se} onChange={handleNewJobExperienceChange} name="responsibilities" className={`my-3 pe-5 form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].responsibilities[j] ? 'is-invalid' : ''}`}/>
                                    {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].responsibilities[j]}</div>}
                                    <input type="button" onClick={deleteNewJobExperienceResponsibility} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                        </ul>
                        <div className="d-flex justify-content-end">
                            <input type="button" className="btn btn-primary" onClick={addNewJobExperienceResponsibility} value="Nowy"/>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteNewJobExperience}/>
                </div>
            </div>)})}
            {jobExperiences.map((e, i) => { return (
            <div key={e.job_experience_id} data-key={e.job_experience_id} className={`${i > 0 || newJobExperiences.length > 0 ? 'my-5' : 'mb-5'}`}>
                {(i > 0 || newJobExperiences.length > 0) && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="position" className="form-label">Stanowisko</label>
                        <input type="text" value={e.position} onChange={handleJobExperienceChange} name="position" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].position ? 'is-invalid' : ''}`} id="position"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].position}</div>}

                        <label htmlFor="company" className="form-label pt-3">Firma</label>
                        <input type="text" value={e.company} onChange={handleJobExperienceChange} name="company" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].company ? 'is-invalid' : ''}`} id="company"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].company}</div>}

                        <label htmlFor="location" className="form-label pt-3">Lokalizacja</label>
                        <input type="text" value={e.location} onChange={handleJobExperienceChange} name="location" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].location ? 'is-invalid' : ''}`} id="location"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].location}</div>}

                        <label htmlFor="period_of_employment_start" className="form-label pt-3">Ropoczęcie pracy</label>
                        <input type="date" value={e.period_of_employment_start} onChange={handleJobExperienceChange} name="period_of_employment_start" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].period_of_employment_start ? 'is-invalid' : ''}`} id="period_of_employment_start"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].period_of_employment_start}</div>}

                        <label htmlFor="period_of_employment_end" className="form-label pt-3">Zakończenie pracy (zostaw puste jeśli nadal pracujesz)</label>
                        <input type="date" value={e.period_of_employment_end} onChange={handleJobExperienceChange} name="period_of_employment_end" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].period_of_employment_end ? 'is-invalid' : ''}`} id="period_of_employment_end"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].period_of_employment_end}</div>}
                    </div>
                    <div className="col-md-6 col-12">
                        <label>Obowiązki</label>
                        <ul style={{maxHeight: 335, overflowY: "auto"}}>
                            {e.responsibilities.map((se, j) => { return (
                                <li key={se.job_experience_responsibility_id} className="position-relative">
                                    <input data-key={se.job_experience_responsibility_id} type="text" value={se.responsibility} onChange={handleJobExperienceChange} name="responsibilities" className={`my-3 pe-5 form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].responsibilities[j].responsibility ? 'is-invalid' : ''}`}/>
                                    {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].responsibilities[j].responsibility}</div>}
                                    <input type="button" onClick={deleteResponsibility} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                            {jobExperienceNewResponsibilities[jobExperienceNewResponsibilities.findIndex(r => r.id == e.job_experience_id)].responsibilities.map((se, i) => { return (
                                <li key={-i - 1} className="position-relative">
                                    <input data-key={-i - 1} type="text" value={se} onChange={handleJobExperienceNewResponsibilitiesChange} name="responsibilities" className={`my-3 pe-5 form-control ${jobExperienceNewResponsibilitiesErrors[1] && jobExperienceNewResponsibilitiesErrors[0][jobExperienceNewResponsibilities.findIndex(r => r.id == e.job_experience_id)].responsibilities[i] ? 'is-invalid' : ''}`}/>
                                    {jobExperienceNewResponsibilitiesErrors[1] && <div className="invalid-feedback">{jobExperienceNewResponsibilitiesErrors[0][jobExperienceNewResponsibilities.findIndex(r => r.id == e.job_experience_id)].responsibilities[i]}</div>}
                                    <input type="button" onClick={deleteNewResponsibility} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                </li>
                            )})}
                        </ul>
                        <div className="d-flex justify-content-end">
                            <input type="button" className="btn btn-primary" onClick={addNewResponsibility} value="Nowy"/>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteJobExperience}/>
                </div>
            </div>)})}
            <div className="d-flex justify-content-end mt-3">
                <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
            </div>
        </form>
    );
}