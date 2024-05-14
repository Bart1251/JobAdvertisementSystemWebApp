import { useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import { useValidation } from "../../contexts/ValidationContext";

export default function EducationSettings({ educationsSet, educationsSetter, educationLevels }) {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const { validateArrayFields } = useValidation();
    const [educations, setEducations] = useState(educationsSet ? educationsSet : []);
    const [newEducations, setNewEducations] = useState([]);
    const [educationsToDelete, setEducationsToDelete] = useState([]);
    const [educationsErrors, setEducationsErrors] = useState([[], false]);
    const [newEducationsErrors, setNewEducationsErrors] = useState([[], false]);

    function handleNewEducationChange(e) {
        const { name, value } = e.target;
        const key = findKey(e.target.parentNode);
        setNewEducations(prevState => {
            const updatedState = [...prevState];
            if (name == "period_of_education_start" || name == "period_of_education_end") {
                if (value == "0000-00-00" || value == "") {
                    updatedState[-(key + 1)][name] = null;
                } else {
                    updatedState[-(key + 1)][name] = value;
                }
            } else {
                updatedState[-(key + 1)][name] = value;
            }
            return updatedState;
        });
    }

    function handleEducationChange(e) {
        const { name, value } = e.target;
        const key = findKey(e.target.parentNode);
        setEducations(prevState => {
            const updatedState = [...prevState];
            if (name == "period_of_education_start" || name == "period_of_education_end") {
                if (value == "0000-00-00" || value == "") {
                    updatedState[updatedState.findIndex(se => se.education_id == key)][name] = null;
                } else {
                    updatedState[updatedState.findIndex(se => se.education_id == key)][name] = value;
                }
            } else {
                updatedState[updatedState.findIndex(se => se.education_id == key)][name] = value;
            }
            return updatedState;
        });
    }

    function addEducation(e) {
        setNewEducations(prevState => {
            return [{institution_name: "", field_of_study: "", education_level_id: educationLevels[0].education_level_id, town: "", start: null, end: null}, ...prevState];
        });
    }

    function deleteNewEducations(e) {
        const key = findKey(e.target.parentNode);
        setNewEducations(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(-(key + 1), 1);
            return updatedState;
        });
        setNewEducationsErrors([[], false]);
    }

    function deleteEducation(e) {
        const key = findKey(e.target.parentNode);
        setEducationsToDelete(prevState => { return [...prevState, key]});
        setEducations(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(updatedState.findIndex(se => se.education_id == key), 1);
            return updatedState;
        });
        setEducationsErrors([[], false]);
    }

    function findKey(parent) {
        while(parent && !parent.hasAttribute('data-key')) {
            parent = parent.parentNode;
        }
        return parseInt(parent.getAttribute('data-key'));
    }

    const educationRegexes = {
        institution_name: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/,
        field_of_study: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/,
        town: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s,'-]+$/,
        period_of_education_start: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    }
    const educationMinLenghts = {
        institution_name: 5, field_of_study: 5, town: 5, period_of_education_start: 0,
    }
    const educationMaxLenghts = {
        institution_name: 50, field_of_study: 50, town: 50, period_of_education_start: 50,
    }
    const educationErrorMessages = {
        institution_name: "Błędna nazwa instytucji",
        field_of_study: "Błędny kierunek kształcenia",
        town: "Błędna lokalizacja",
        period_of_education_start: "Błędne rozpoczęcie nauki",
    }

    async function saveEducations(e) {
        e.preventDefault();
        const [errorsTmp1, hasErrors1] = validateArrayFields(educations, educationRegexes, educationMinLenghts, educationMaxLenghts, educationErrorMessages);
        const [errorsTmp2, hasErrors2] = validateArrayFields(newEducations, educationRegexes, educationMinLenghts, educationMaxLenghts, educationErrorMessages);

        if(!hasErrors1 && !hasErrors2) {
            educations.forEach(async se => {
                await apiRequest(`http://127.0.0.1/education/${se.education_id}`, "PUT", {
                    institution_name: se.institution_name,
                    field_of_study: se.field_of_study,
                    town: se.town,
                    education_level_id: se.education_level_id,
                    period_of_education_start: se.period_of_education_start,
                    period_of_education_end: se.period_of_education_end,
                });
            });
            newEducations.forEach(async se => {
                await apiRequest(`http://127.0.0.1/education`, "POST", {
                    user_id: user,
                    institution_name: se.institution_name,
                    field_of_study: se.field_of_study,
                    town: se.town,
                    education_level_id: se.education_level_id,
                    period_of_education_start: se.period_of_education_start,
                    period_of_education_end: se.period_of_education_end,
                });
            });
            educationsToDelete.forEach(async se => {
                await apiRequest(`http://127.0.0.1/education/${se}`, "DELETE");
            });
            const allEducations = await apiRequest(`http://127.0.0.1/education/${user}`, "GET", null, {'Cache-Control': 'no-cache'});
            educationsSetter(allEducations);
            setEducations(allEducations);
            setNewEducations([]);
            setEducationsToDelete([]);
            setEducationsErrors([[], false]);
            setNewEducationsErrors([[], false]);
        }

        setEducationsErrors([errorsTmp1, hasErrors1]);
        setNewEducationsErrors([errorsTmp2, hasErrors2]);
    }

    return (
        <form className="mt-5" onSubmit={saveEducations}>
            <div className="d-flex gap-3">
                <h4>Wykształcenie</h4>
                <input type="button" value="Nowy" className="btn btn-primary" style={{transform: "TranslateY(-7px)"}} onClick={addEducation}/>
            </div>
            {newEducations.map((e, i) => { return (
            <div key={-i - 1} data-key={-i - 1} className={`${i > 0 ? 'my-5' : 'mb-5'}`}>
                {i > 0 && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="institution_name" className="form-label">Instytucja</label>
                        <input type="text" value={e.institution_name} onChange={handleNewEducationChange} name="institution_name" className={`form-control ${newEducationsErrors[1] && newEducationsErrors[0][i].institution_name ? 'is-invalid' : ''}`} id="institution_name"/>
                        {newEducationsErrors[1] && <div className="invalid-feedback">{newEducationsErrors[0][i].institution_name}</div>}

                        <label htmlFor="field_of_study" className="form-label pt-3">Kierunek kształcenia</label>
                        <input type="text" value={e.field_of_study} onChange={handleNewEducationChange} name="field_of_study" className={`form-control ${newEducationsErrors[1] && newEducationsErrors[0][i].field_of_study ? 'is-invalid' : ''}`} id="field_of_study"/>
                        {newEducationsErrors[1] && <div className="invalid-feedback">{newEducationsErrors[0][i].field_of_study}</div>}

                        <label htmlFor="education_level_id" className="form-label pt-3">Poziom kształcenia</label>
                        <select onChange={handleNewEducationChange} defaultValue={e.education_level_id} name="education_level_id" className="form-select" id="education_level_id">
                            {educationLevels.map(se => {return <option key={se.education_level_id} value={se.education_level_id}>{se.level}</option>})}
                        </select>

                        <label htmlFor="town" className="form-label pt-3">Lokalizacja</label>
                        <input type="text" value={e.town} onChange={handleNewEducationChange} name="town" className={`form-control ${newEducationsErrors[1] && newEducationsErrors[0][i].town ? 'is-invalid' : ''}`} id="town"/>
                        {newEducationsErrors[1] && <div className="invalid-feedback">{newEducationsErrors[0][i].town}</div>}

                        <label htmlFor="period_of_education_start" className="form-label pt-3">Ropoczęcie nauki</label>
                        <input type="date" value={e.period_of_education_start} onChange={handleNewEducationChange} name="period_of_education_start" className={`form-control ${newEducationsErrors[1] && newEducationsErrors[0][i].period_of_education_start ? 'is-invalid' : ''}`} id="period_of_education_start"/>
                        {newEducationsErrors[1] && <div className="invalid-feedback">{newEducationsErrors[0][i].period_of_education_start}</div>}

                        <label htmlFor="period_of_education_end" className="form-label pt-3">Zakończenie nauki (zostaw puste jeśli nadal uczęszczasz)</label>
                        <input type="date" value={e.end} onChange={handleNewEducationChange} name="period_of_education_end" className={`form-control ${newEducationsErrors[1] && newEducationsErrors[0][i].period_of_education_end ? 'is-invalid' : ''}`} id="period_of_education_end"/>
                        {newEducationsErrors[1] && <div className="invalid-feedback">{newEducationsErrors[0][i].period_of_education_end}</div>}
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteNewEducations}/>
                </div>
            </div>)})}
            {educations.map((e, i) => { return (
            <div key={e.education_id} data-key={e.education_id} className={`${i > 0 || newEducations.length > 0 ? 'my-5' : 'mb-5'}`}>
                {(i > 0 || newEducations.length > 0) && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="institution_name" className="form-label">Instytucja</label>
                        <input type="text" value={e.institution_name} onChange={handleEducationChange} name="institution_name" className={`form-control ${educationsErrors[1] && educationsErrors[0][i].institution_name ? 'is-invalid' : ''}`} id="institution_name"/>
                        {educationsErrors[1] && <div className="invalid-feedback">{educationsErrors[0][i].institution_name}</div>}

                        <label htmlFor="field_of_study" className="form-label pt-3">Kierunek kształcenia</label>
                        <input type="text" value={e.field_of_study} onChange={handleEducationChange} name="field_of_study" className={`form-control ${educationsErrors[1] && educationsErrors[0][i].field_of_study ? 'is-invalid' : ''}`} id="field_of_study"/>
                        {educationsErrors[1] && <div className="invalid-feedback">{educationsErrors[0][i].field_of_study}</div>}

                        <label htmlFor="education_level_id" className="form-label pt-3">Poziom kształcenia</label>
                        <select onChange={handleEducationChange} defaultValue={e.education_level_id} name="education_level_id" className="form-select" id="education_level_id">
                            {educationLevels.map(se => {return <option key={se.education_level_id} value={se.education_level_id}>{se.level}</option>})}
                        </select>

                        <label htmlFor="town" className="form-label pt-3">Lokalizacja</label>
                        <input type="text" value={e.town} onChange={handleEducationChange} name="town" className={`form-control ${educationsErrors[1] && educationsErrors[0][i].town ? 'is-invalid' : ''}`} id="town"/>
                        {educationsErrors[1] && <div className="invalid-feedback">{educationsErrors[0][i].town}</div>}

                        <label htmlFor="period_of_education_start" className="form-label pt-3">Ropoczęcie nauki</label>
                        <input type="date" value={e.period_of_education_start} onChange={handleEducationChange} name="period_of_education_start" className={`form-control ${educationsErrors[1] && educationsErrors[0][i].period_of_education_start ? 'is-invalid' : ''}`} id="period_of_education_start"/>
                        {educationsErrors[1] && <div className="invalid-feedback">{educationsErrors[0][i].period_of_education_start}</div>}

                        <label htmlFor="period_of_education_end" className="form-label pt-3">Zakończenie nauki (zostaw puste jeśli nadal uczęszczasz)</label>
                        <input type="date" value={e.period_of_education_end} onChange={handleEducationChange} name="period_of_education_end" className={`form-control ${educationsErrors[1] && educationsErrors[0][i].period_of_education_end ? 'is-invalid' : ''}`} id="period_of_education_end"/>
                        {educationsErrors[1] && <div className="invalid-feedback">{educationsErrors[0][i].period_of_education_end}</div>}
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteEducation}/>
                </div>
            </div>)})}
            <div className="d-flex justify-content-end mt-3">
                <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
            </div>
        </form>
    );
}