import { useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import { useValidation } from "../../contexts/ValidationContext";

export default function ProfileSettings({ profilesSet, profilesSetter }) {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const { validateArrayFields } = useValidation();
    const [profiles, setProfiles] = useState(profilesSet ? profilesSet : []);
    const [newProfiles, setNewProfiles] = useState([]);
    const [profilesToDelete, setProfilesToDelete] = useState([]);
    const [profilesErrors, setProfilesErrors] = useState([[], false]);
    const [newProfilesErrors, setNewProfilesErrors] = useState([[], false]);

    function handleNewProfileChange(e) {
        const { name, value } = e.target;
        setNewProfiles(prevState => {
            const updatedState = [...prevState];
            updatedState[-(parseInt(e.target.getAttribute('data-key')) + 1)][name] = value;
            return updatedState;
        });
    }

    function handleProfileChange(e) {
        const { name, value } = e.target;
        setProfiles(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.profile_id == parseInt(e.target.getAttribute('data-key')))][name] = value;
            return updatedState;
        });
    }

    function addProfile(e) {
        setNewProfiles(prevState => {
            return [{link: ""}, ...prevState];
        });
    }

    function deleteNewProfiles(e) {
        setNewProfiles(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(-(parseInt(e.target.previousSibling.getAttribute('data-key')) + 1), 1);
            return updatedState;
        });
        setProfilesErrors([[], false]);
        setNewProfilesErrors([[], false]);
    }

    function deleteProfile(e) {
        setProfilesToDelete(prevState => { return [...prevState, parseInt(e.target.previousSibling.getAttribute('data-key'))]});
        setProfiles(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(updatedState.findIndex(se => se.profile_id == parseInt(e.target.previousSibling.getAttribute('data-key'))), 1);
            return updatedState;
        });
        setProfilesErrors([[], false]);
        setNewProfilesErrors([[], false]);
    }

    const profilesRegexes = {
        link: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    }
    const profilesMinLengths = {
        link: 2,
    }
    const profilesMaxLengths = {
        link: 100,
    }
    const profilesErrorMessages = {
        link: "Błędny odnośnik",
    }

    async function saveProfiles(e) {
        e.preventDefault();
        const [errorsTmp1, hasErrors1] = validateArrayFields(profiles, profilesRegexes, profilesMinLengths, profilesMaxLengths, profilesErrorMessages);
        const [errorsTmp2, hasErrors2] = validateArrayFields(newProfiles, profilesRegexes, profilesMinLengths, profilesMaxLengths, profilesErrorMessages);
        
        if(!hasErrors1 && !hasErrors2) {
            profiles.forEach(async se => {
                await apiRequest(`http://127.0.0.1/profile/${se.profile_id}`, "PUT", {
                    link: se.link,
                });
            }),
            newProfiles.forEach(async se => {
                await apiRequest(`http://127.0.0.1/profile`, "POST", {
                    user_id: user,
                    link: se.link,
                });
            }),
            profilesToDelete.forEach(async se => {
                await apiRequest(`http://127.0.0.1/profile/${se}`, "DELETE");
            })
            const allProfiles = await apiRequest(`http://127.0.0.1/profile/${user}`, "GET");
            profilesSetter(allProfiles);
            setNewProfiles([]);
            setProfilesToDelete([]);
            setProfilesErrors([[], false]);
            setNewProfilesErrors([[], false]);
        }
        
        setProfilesErrors([errorsTmp1, hasErrors1]);
        setNewProfilesErrors([errorsTmp2, hasErrors2]);
    }

    return (
        <form className="mt-5" onSubmit={saveProfiles}>
            <div className="d-flex gap-3">
                <h4>Odnośniki to profili społecznościowych</h4>
                <input type="button" value="Nowy" className="btn btn-primary" style={{transform: "TranslateY(-7px)"}} onClick={addProfile}/>
            </div>
            <div className="row">
                <div className="col-md-6 col-12">
                    <ul style={{maxHeight: 335, overflowY: "auto"}}>
                        {newProfiles.map((se, i) => { return (
                            <li key={-i - 1} className="position-relative">
                                <input data-key={-i - 1} type="text" value={se.link} name="link" onChange={handleNewProfileChange} className={`my-3 pe-5 form-control ${newProfilesErrors[1] && newProfilesErrors[0][i].link ? 'is-invalid' : ''}`}/>
                                <input type="button" onClick={deleteNewProfiles} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                {newProfilesErrors[1] && <div className="invalid-feedback">{newProfilesErrors[0][i].link}</div>}
                            </li>
                        )})}
                        {profiles.map((se, i) => { return (
                            <li key={se.profile_id} className="position-relative">
                                <input data-key={se.profile_id} type="text" value={se.link} name="link" onChange={handleProfileChange} className={`my-3 pe-5 form-control ${profilesErrors[1] && profilesErrors[0][i].link ? 'is-invalid' : ''}`}/>
                                <input type="button" onClick={deleteProfile} className="btn-close position-absolute top-0 end-0 mt-2 me-2"/>
                                {profilesErrors[1] && <div className="invalid-feedback">{profilesErrors[0][i].link}</div>}
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