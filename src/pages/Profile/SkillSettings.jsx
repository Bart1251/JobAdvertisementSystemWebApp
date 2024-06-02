import { useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import { useValidation } from "../../contexts/ValidationContext";

export default function SkillSettings({ skillsSet, skillsSetter }) {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const { validateArrayFields } = useValidation();
    const [skills, setSkills] = useState(skillsSet ? skillsSet : []);
    const [newSkills, setNewSkills] = useState([]);
    const [skillsToDelete, setSkillsToDelete] = useState([]);
    const [skillsErrors, setSkillsErrors] = useState([[], false]);
    const [newSkillsErrors, setNewSkillsErrors] = useState([[], false]);

    function handleNewSkillChange(e) {
        const { name, value } = e.target;
        setNewSkills(prevState => {
            const updatedState = [...prevState];
            updatedState[-(parseInt(e.target.getAttribute('data-key')) + 1)][name] = value;
            return updatedState;
        });
    }

    function handleSkillChange(e) {
        const { name, value } = e.target;
        setSkills(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.skill_id == parseInt(e.target.getAttribute('data-key')))][name] = value;
            return updatedState;
        });
    }

    function addSkill(e) {
        setNewSkills(prevState => {
            return [{skill: ""}, ...prevState];
        });
    }

    function deleteNewSkills(e) {
        setNewSkills(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(-(parseInt(e.target.previousSibling.getAttribute('data-key')) + 1), 1);
            return updatedState;
        });
        setNewSkillsErrors([[], false]);
    }

    function deleteSkill(e) {
        setSkillsToDelete(prevState => { return [...prevState, parseInt(e.target.previousSibling.getAttribute('data-key'))]});
        setSkills(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(updatedState.findIndex(se => se.skill_id == parseInt(e.target.previousSibling.getAttribute('data-key'))), 1);
            return updatedState;
        });
        setSkillsErrors([[], false]);
    }

    const skillsRegexes = {
        skill: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/,
    }
    const skillsMinLengths = {
        skill: 2,
    }
    const skillsMaxLengths = {
        skill: 100,
    }
    const skillsErrorMessages = {
        skill: "Błędna umiejętność",
    }

    async function saveSkills(e) {
        e.preventDefault();
        const [errorsTmp1, hasErrors1] = validateArrayFields(skills, skillsRegexes, skillsMinLengths, skillsMaxLengths, skillsErrorMessages);
        const [errorsTmp2, hasErrors2] = validateArrayFields(newSkills, skillsRegexes, skillsMinLengths, skillsMaxLengths, skillsErrorMessages);
        
        if(!hasErrors1 && !hasErrors2) {
            await Promise.all([
                skills.forEach(async se => {
                    await apiRequest(`http://127.0.0.1/skill/${se.skill_id}`, "PUT", {
                        skill: se.skill,
                    });
                }),
                newSkills.forEach(async se => {
                    await apiRequest(`http://127.0.0.1/skill`, "POST", {
                        user_id: user,
                        skill: se.skill,
                    });
                }),
                skillsToDelete.forEach(async se => {
                    await apiRequest(`http://127.0.0.1/skill/${se}`, "DELETE");
                })
            ]);
            const allSkills = await apiRequest(`http://127.0.0.1/skill/${user}`, "GET");
            skillsSetter(allSkills);
            setNewSkills([]);
            setSkillsToDelete([]);
            setSkillsErrors([[], false]);
            setNewSkillsErrors([[], false]);
        }
        
        setSkillsErrors([errorsTmp1, hasErrors1]);
        setNewSkillsErrors([errorsTmp2, hasErrors2]);
    }

    return (
        <form className="mt-5" onSubmit={saveSkills}>
            <div className="d-flex gap-3">
                <h4>Umiejętności</h4>
                <input type="button" value="Nowy" className="btn btn-primary" style={{transform: "TranslateY(-7px)"}} onClick={addSkill}/>
            </div>
            <div className="row">
                <div className="col-md-6 col-12">
                    <ul style={{maxHeight: 335, overflowY: "auto"}}>
                        {newSkills.map((se, i) => { return (
                            <li key={-i - 1} className="position-relative">
                                <input data-key={-i - 1} type="text" value={se.skill} name="skill" onChange={handleNewSkillChange} className={`my-3 pe-5 form-control ${newSkillsErrors[1] && newSkillsErrors[0][i].skill ? 'is-invalid' : ''}`}/>
                                <input type="button" onClick={deleteNewSkills} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                {newSkillsErrors[1] && <div className="invalid-feedback">{newSkillsErrors[0][i].skill}</div>}
                            </li>
                        )})}
                        {skills.map((se, i) => { return (
                            <li key={se.skill_id} className="position-relative">
                                <input data-key={se.skill_id} type="text" value={se.skill} name="skill" onChange={handleSkillChange} className={`my-3 pe-5 form-control ${skillsErrors[1] && skillsErrors[0][i].skill ? 'is-invalid' : ''}`}/>
                                <input type="button" onClick={deleteSkill} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                {skillsErrors[1] && <div className="invalid-feedback">{skillsErrors[0][i].skill}</div>}
                            </li>
                        )})}
                    </ul>
                </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
                <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
            </div>
        </form>
    );
}