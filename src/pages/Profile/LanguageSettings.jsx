import { useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";

export default function LanguageSettings({ languagesSet, languagesSetter, languageLevels, languages }) {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const [userLanguages, setUserLanguages] = useState(languagesSet ? languagesSet : []);
    const [newUserLanguages, setNewUserLanguages] = useState([]);
    const [languagesToDelete, setLanguagesToDelete] = useState([]);

    function handleNewLanguageChange(e) {
        const { name, value } = e.target;
        const key = findKey(e.target.parentNode);
        setNewUserLanguages(prevState => {
            const updatedState = [...prevState];
            updatedState[-(key + 1)][name] = value;
            return updatedState;
        });
    }

    function handleLanguageChange(e) {
        const { name, value } = e.target;
        const key = findKey(e.target.parentNode);
        setUserLanguages(prevState => {
            const updatedState = [...prevState];
            updatedState[updatedState.findIndex(se => se.user_language_id == key)][name] = value;
            return updatedState;
        });
    }

    function addLanguage(e) {
        setNewUserLanguages(prevState => {
            return [{language_id: languages[0].language_id, language_level_id: languageLevels[0].language_level_id}, ...prevState];
        });
    }

    function deleteNewLanguages(e) {
        const key = findKey(e.target.parentNode);
        setNewUserLanguages(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(-(key + 1), 1);
            return updatedState;
        });
    }

    function deleteLanguage(e) {
        const key = findKey(e.target.parentNode);
        setLanguagesToDelete(prevState => { return [...prevState, key]});
        setUserLanguages(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(updatedState.findIndex(se => se.user_language_id == key), 1);
            return updatedState;
        });
    }

    function findKey(parent) {
        while(parent && !parent.hasAttribute('data-key')) {
            parent = parent.parentNode;
        }
        return parseInt(parent.getAttribute('data-key'));
    }

    async function saveLanguages(e) {
        e.preventDefault();

        userLanguages.forEach(async se => {
            await apiRequest(`http://127.0.0.1/userLanguage/${se.user_language_id}`, "PUT", {
                language_id: se.language_id,
                language_level_id: se.language_level_id,
            });
        });
        newUserLanguages.forEach(async se => {
            await apiRequest(`http://127.0.0.1/userLanguage`, "POST", {
                user_id: user,
                language_id: se.language_id,
                language_level_id: se.language_level_id,
            });
        });
        languagesToDelete.forEach(async se => {
            await apiRequest(`http://127.0.0.1/userLanguage/${se}`, "DELETE");
        });
        const allUserLanguages = await apiRequest(`http://127.0.0.1/userLanguage/${user}`, "GET");
        languagesSetter(allUserLanguages);
        setUserLanguages(allUserLanguages);
        setNewUserLanguages([]);
        setLanguagesToDelete([]);
    }

    return (
        <form className="mt-5" onSubmit={saveLanguages}>
            <div className="d-flex gap-3">
                <h4>Znajomość języków</h4>
                <input type="button" value="Nowy" className="btn btn-primary" style={{transform: "TranslateY(-7px)"}} onClick={addLanguage}/>
            </div>
            {newUserLanguages.map((e, i) => { return (
            <div key={-i - 1} data-key={-i - 1} className={`${i > 0 ? 'my-5' : 'mb-5'}`}>
                {i > 0 && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="language_id" className="form-label pt-3">Język</label>
                        <select onChange={handleNewLanguageChange} defaultValue={e.language_id} name="language_id" className="form-select" id="language_id">
                            {languages.map(se => {return <option key={se.language_id} value={se.language_id}>{se.language}</option>})}
                        </select>

                        <label htmlFor="language_level_id" className="form-label pt-3">Poziom</label>
                        <select onChange={handleNewLanguageChange} defaultValue={e.language_level_id} name="language_level_id" className="form-select" id="language_level_id">
                            {languageLevels.map(se => {return <option key={se.language_level_id} value={se.language_level_id}>{se.level}</option>})}
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteNewLanguages}/>
                </div>
            </div>)})}
            {userLanguages.map((e, i) => { return (
            <div key={e.user_language_id} data-key={e.user_language_id} className={`${i > 0 || newUserLanguages.length > 0 ? 'my-5' : 'mb-5'}`}>
                {(i > 0 || newUserLanguages.length > 0) && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="language_id" className="form-label pt-3">Język</label>
                        <select onChange={handleLanguageChange} defaultValue={e.language_id} name="language_id" className="form-select" id="language_id">
                            {languages.map(se => {return <option key={se.language_id} value={se.language_id}>{se.language}</option>})}
                        </select>

                        <label htmlFor="language_level_id" className="form-label pt-3">Poziom</label>
                        <select onChange={handleLanguageChange} defaultValue={e.language_level_id} name="language_level_id" className="form-select" id="language_level_id">
                            {languageLevels.map(se => {return <option key={se.language_level_id} value={se.language_level_id}>{se.level}</option>})}
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteLanguage}/>
                </div>
            </div>)})}
            <div className="d-flex justify-content-end mt-3">
                <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
            </div>
        </form>
    );
}