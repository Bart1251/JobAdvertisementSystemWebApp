import { useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import { useValidation } from "../../contexts/ValidationContext";

export default function EducationSettings({ educationsSet, educationsSetter }) {
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
            updatedState[-(key + 1)][name] = value;
            return updatedState;
        });
    }

    function addEducation(e) {
        setNewEducations(prevState => {
            return [{institution: "", fieldOfStudy: "", educationLevel: "", location: "", start: null, end: null}, ...prevState];
        });
    }

    async function saveEducations(e) {
        e.preventDefault();
    }

    function deleteNewEducations(e) {
        const key = findKey(e.target.parentNode);
        setNewEducations(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(-(key + 1), 1);
            return updatedState;
        });
    }

    function deleteEducation(e) {
        const key = findKey(e.target.parentNode);
        setEducationsToDelete(prevState => { return [...prevState, key]});
        setEducations(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(updatedState.findIndex(se => se.education_id == key), 1);
            return updatedState;
        });
    }

    return (
        <form className="mt-5" onSubmit={saveEducations}>
            <div className="d-flex gap-3">
                <h4>Wykształcenie</h4>
                <input type="button" value="Nowe" className="btn btn-primary" style={{transform: "TranslateY(-7px)"}} onClick={addEducation}/>
            </div>
            {newEducations.map((e, i) => { return (
            <div key={-i - 1} data-key={-i - 1} className={`${i > 0 ? 'my-5' : 'mb-5'}`}>
                {i > 0 && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="institution" className="form-label">Instytucja</label>
                        <input type="text" value={e.institution} onChange={handleNewEducationChange} name="institution" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].institution ? 'is-invalid' : ''}`} id="institution"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].institution}</div>}

                        <label htmlFor="fieldOfStudy" className="form-label pt-3">Kierunek studiów</label>
                        <input type="text" value={e.fieldOfStudy} onChange={handleNewEducationChange} name="fieldOfStudy" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].fieldOfStudy ? 'is-invalid' : ''}`} id="fieldOfStudy"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].fieldOfStudy}</div>}

                        <label htmlFor="educationLevel" className="form-label pt-3">Poziom kształcenia</label>
                        <input type="text" value={e.educationLevel} onChange={handleNewEducationChange} name="educationLevel" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].educationLevel ? 'is-invalid' : ''}`} id="educationLevel"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].educationLevel}</div>}

                        <label htmlFor="location" className="form-label pt-3">Lokalizacja</label>
                        <input type="text" value={e.location} onChange={handleNewEducationChange} name="location" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].location ? 'is-invalid' : ''}`} id="location"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].location}</div>}

                        <label htmlFor="start" className="form-label pt-3">Ropoczęcie nauki</label>
                        <input type="date" value={e.start} onChange={handleNewEducationChange} name="start" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].start ? 'is-invalid' : ''}`} id="start"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].start}</div>}

                        <label htmlFor="end" className="form-label pt-3">Zakończenie nauki (zostaw puste jeśli nadal uczęszczasz)</label>
                        <input type="date" value={e.end} onChange={handleNewEducationChange} name="end" className={`form-control ${newJobExperienceErrors[1] && newJobExperienceErrors[0][i].end ? 'is-invalid' : ''}`} id="end"/>
                        {newJobExperienceErrors[1] && <div className="invalid-feedback">{newJobExperienceErrors[0][i].end}</div>}
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteNewEducations}/>
                </div>
            </div>)})}
            {educations.map((e, i) => { return (
            <div key={e.education_id} data-key={e.education_id} className={`${i > 0 || newEducations.length > 0 ? 'my-5' : 'mb-5'}`}>
                {i > 0 && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="position" className="form-label">Instytucja</label>
                        <input type="text" value={e.position} onChange={handleJobExperienceChange} name="position" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].position ? 'is-invalid' : ''}`} id="position"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].position}</div>}

                        <label htmlFor="company" className="form-label pt-3">Kierunek studiów</label>
                        <input type="text" value={e.company} onChange={handleJobExperienceChange} name="company" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].company ? 'is-invalid' : ''}`} id="company"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].company}</div>}

                        <label htmlFor="location" className="form-label pt-3">Poziom kształcenia</label>
                        <input type="text" value={e.location} onChange={handleJobExperienceChange} name="location" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].location ? 'is-invalid' : ''}`} id="location"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].location}</div>}

                        <label htmlFor="location" className="form-label pt-3">Lokalizacja</label>
                        <input type="text" value={e.location} onChange={handleJobExperienceChange} name="location" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].location ? 'is-invalid' : ''}`} id="location"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].location}</div>}

                        <label htmlFor="period_of_employment_start" className="form-label pt-3">Ropoczęcie nauki</label>
                        <input type="date" value={e.period_of_employment_start} onChange={handleJobExperienceChange} name="period_of_employment_start" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].period_of_employment_start ? 'is-invalid' : ''}`} id="period_of_employment_start"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].period_of_employment_start}</div>}

                        <label htmlFor="period_of_employment_end" className="form-label pt-3">Zakończenie nauki (zostaw puste jeśli nadal uczęszczasz)</label>
                        <input type="date" value={e.period_of_employment_end} onChange={handleJobExperienceChange} name="period_of_employment_end" className={`form-control ${jobExperienceErrors[1] && jobExperienceErrors[0][i].period_of_employment_end ? 'is-invalid' : ''}`} id="period_of_employment_end"/>
                        {jobExperienceErrors[1] && <div className="invalid-feedback">{jobExperienceErrors[0][i].period_of_employment_end}</div>}
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