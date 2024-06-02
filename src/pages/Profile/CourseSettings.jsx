import { useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import { useValidation } from "../../contexts/ValidationContext";

export default function CourseSettings({ coursesSet, coursesSetter }) {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const { validateArrayFields } = useValidation();
    const [courses, setCourses] = useState(coursesSet ? coursesSet : []);
    const [newCourses, setNewCourses] = useState([]);
    const [coursesToDelete, setCoursesToDelete] = useState([]);
    const [coursesErrors, setCoursesErrors] = useState([[], false]);
    const [newCoursesErrors, setNewCoursesErrors] = useState([[], false]);

    function handleNewCourseChange(e) {
        const { name, value } = e.target;
        const key = findKey(e.target.parentNode);
        setNewCourses(prevState => {
            const updatedState = [...prevState];
            if (name == "course_start" || name == "course_end") {
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

    function handleCourseChange(e) {
        const { name, value } = e.target;
        const key = findKey(e.target.parentNode);
        setCourses(prevState => {
            const updatedState = [...prevState];
            if (name == "course_start" || name == "course_end") {
                if (value == "0000-00-00" || value == "") {
                    updatedState[updatedState.findIndex(se => se.course_id == key)][name] = null;
                } else {
                    updatedState[updatedState.findIndex(se => se.course_id == key)][name] = value;
                }
            } else {
                updatedState[updatedState.findIndex(se => se.course_id == key)][name] = value;
            }
            return updatedState;
        });
    }

    function addCourse(e) {
        setNewCourses(prevState => {
            return [{course: "", organizer: "", course_start: null, course_end: null}, ...prevState];
        });
    }

    function deleteNewCourse(e) {
        const key = findKey(e.target.parentNode);
        setNewCourses(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(-(key + 1), 1);
            return updatedState;
        });
        setNewCoursesErrors([[], false]);
        setCoursesErrors([[], false])
    }

    function deleteCourse(e) {
        const key = findKey(e.target.parentNode);
        setCoursesToDelete(prevState => { return [...prevState, key]});
        setCourses(prevState => {
            const updatedState = [...prevState];
            updatedState.splice(updatedState.findIndex(se => se.course_id == key), 1);
            return updatedState;
        });
        setCoursesErrors([[], false]);
        setNewCoursesErrors([[], false]);
    }

    function findKey(parent) {
        while(parent && !parent.hasAttribute('data-key')) {
            parent = parent.parentNode;
        }
        return parseInt(parent.getAttribute('data-key'));
    }

    const coursesRegexes = {
        course: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/,
        organizer: /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+(?:[-' ][A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]+)*$/,
        course_start: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    }
    const coursesMinLenghts = {
        course: 5, organizer: 5, course_start: 0,
    }
    const coursesMaxLenghts = {
        course: 50, organizer: 50, course_start: 50,
    }
    const coursesErrorMessages = {
        course: "Błędna nazwa kursu",
        organizer: "Błędny organizator",
        course_start: "Błędne rozpoczęcie kursu",
    }

    async function saveCourses(e) {
        e.preventDefault();
        const [errorsTmp1, hasErrors1] = validateArrayFields(courses, coursesRegexes, coursesMinLenghts, coursesMaxLenghts, coursesErrorMessages);
        const [errorsTmp2, hasErrors2] = validateArrayFields(newCourses, coursesRegexes, coursesMinLenghts, coursesMaxLenghts, coursesErrorMessages);

        if(!hasErrors1 && !hasErrors2) {
            courses.forEach(async se => {
                await apiRequest(`http://127.0.0.1/course/${se.course_id}`, "PUT", {
                    course: se.course,
                    organizer: se.organizer,
                    course_start: se.course_start,
                    course_end: se.course_end,
                });
            });
            newCourses.forEach(async se => {
                await apiRequest(`http://127.0.0.1/course`, "POST", {
                    user_id: user,
                    course: se.course,
                    organizer: se.organizer,
                    course_start: se.course_start,
                    course_end: se.course_end,
                });
            });
            coursesToDelete.forEach(async se => {
                await apiRequest(`http://127.0.0.1/course/${se}`, "DELETE");
            });
            const allcourses = await apiRequest(`http://127.0.0.1/course/${user}`, "GET");
            coursesSetter(allcourses);
            setNewCourses([]);
            setCoursesToDelete([]);
            setCoursesErrors([[], false]);
            setNewCoursesErrors([[], false]);
        }

        setCoursesErrors([errorsTmp1, hasErrors1]);
        setNewCoursesErrors([errorsTmp2, hasErrors2]);
    }

    return (
        <form className="mt-5" onSubmit={saveCourses}>
            <div className="d-flex gap-3">
                <h4>Kursy i szkolenia</h4>
                <input type="button" value="Nowy" className="btn btn-primary" style={{transform: "TranslateY(-7px)"}} onClick={addCourse}/>
            </div>
            {newCourses.map((e, i) => { return (
            <div key={-i - 1} data-key={-i - 1} className={`${i > 0 ? 'my-5' : 'mb-5'}`}>
                {i > 0 && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="course" className="form-label">Nazwa kursu</label>
                        <input type="text" value={e.course} onChange={handleNewCourseChange} name="course" className={`form-control ${newCoursesErrors[1] && newCoursesErrors[0][i].course ? 'is-invalid' : ''}`} id="course"/>
                        {newCoursesErrors[1] && <div className="invalid-feedback">{newCoursesErrors[0][i].course}</div>}

                        <label htmlFor="organizer" className="form-label pt-3">Organizator</label>
                        <input type="text" value={e.organizer} onChange={handleNewCourseChange} name="organizer" className={`form-control ${newCoursesErrors[1] && newCoursesErrors[0][i].organizer ? 'is-invalid' : ''}`} id="organizer"/>
                        {newCoursesErrors[1] && <div className="invalid-feedback">{newCoursesErrors[0][i].organizer}</div>}
                    </div>
                    <div className="col-md-6 col-12">
                        <label htmlFor="course_start" className="form-label">Ropoczęcie kursu</label>
                        <input type="date" value={e.course_start} onChange={handleNewCourseChange} name="course_start" className={`form-control ${newCoursesErrors[1] && newCoursesErrors[0][i].course_start ? 'is-invalid' : ''}`} id="course_start"/>
                        {newCoursesErrors[1] && <div className="invalid-feedback">{newCoursesErrors[0][i].course_start}</div>}

                        <label htmlFor="course_end" className="form-label pt-3">Zakończenie kursu (zostaw puste jeśli kurs był jednodniowy)</label>
                        <input type="date" value={e.course_end} onChange={handleNewCourseChange} name="course_end" className={`form-control ${newCoursesErrors[1] && newCoursesErrors[0][i].course_end ? 'is-invalid' : ''}`} id="course_end"/>
                        {newCoursesErrors[1] && <div className="invalid-feedback">{newCoursesErrors[0][i].course_end}</div>}
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteNewCourse}/>
                </div>
            </div>)})}
            {courses.map((e, i) => { return (
            <div key={e.course_id} data-key={e.course_id} className={`${i > 0 || newCourses.length > 0 ? 'my-5' : 'mb-5'}`}>
                {(i > 0 || newCourses.length > 0) && <hr/>}
                <div className="row">
                    <div className="col-md-6 col-12">
                        <label htmlFor="course" className="form-label">Nazwa kursu</label>
                        <input type="text" value={e.course} onChange={handleCourseChange} name="course" className={`form-control ${coursesErrors[1] && coursesErrors[0][i].course ? 'is-invalid' : ''}`} id="course"/>
                        {coursesErrors[1] && <div className="invalid-feedback">{coursesErrors[0][i].course}</div>}

                        <label htmlFor="organizer" className="form-label pt-3">Organizator</label>
                        <input type="text" value={e.organizer} onChange={handleCourseChange} name="organizer" className={`form-control ${coursesErrors[1] && coursesErrors[0][i].organizer ? 'is-invalid' : ''}`} id="organizer"/>
                        {coursesErrors[1] && <div className="invalid-feedback">{coursesErrors[0][i].organizer}</div>}
                    </div>
                    <div className="col-md-6 col-12">
                        <label htmlFor="course_start" className="form-label">Ropoczęcie kursu</label>
                        <input type="date" value={e.course_start} onChange={handleCourseChange} name="course_start" className={`form-control ${coursesErrors[1] && coursesErrors[0][i].course_start ? 'is-invalid' : ''}`} id="course_start"/>
                        {coursesErrors[1] && <div className="invalid-feedback">{coursesErrors[0][i].course_start}</div>}

                        <label htmlFor="course_end" className="form-label pt-3">Zakończenie kursu (zostaw puste jeśli kurs był jednodniowy)</label>
                        <input type="date" value={e.course_end} onChange={handleCourseChange} name="course_end" className={`form-control ${coursesErrors[1] && coursesErrors[0][i].course_end ? 'is-invalid' : ''}`} id="course_end"/>
                        {coursesErrors[1] && <div className="invalid-feedback">{coursesErrors[0][i].course_end}</div>}
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <input type="button" className="btn btn-danger ms-auto" value="Usuń" onClick={deleteCourse}/>
                </div>
            </div>)})}
            <div className="d-flex justify-content-end mt-3">
                <input type="submit" value="Zapisz" className="btn btn-primary ms-auto"/>
            </div>
        </form>
    );
}