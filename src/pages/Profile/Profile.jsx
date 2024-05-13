import { React, useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import img from "../../assets/react.svg";
import ProfileInfo from "./ProfileInfo";
import SavedOffers from "./SavedOffers";
import MyApplications from "./MyApplications";
import Documents from "./Documents";
import Settings from "./Settings";
import { useApi } from '../../contexts/ApiContext';
import { useUser } from '../../contexts/UserContext';

export default function Profile() {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const [userInfo, setUserInfo] = useState(null);
    const [jobExperiences, setJobExperiences] = useState(null);
    const [educations, setEcucations] = useState(null);
    const [languages, setLanguages] = useState(null);
    const [skills, setSkills] = useState(null);
    const [courses, setCourses] = useState(null);
    const [profiles, setProfiles] = useState(null);
    const [profilePicture, setProfilePicture] = useState(img);
    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserInfo() {
            const userInfoData = await apiRequest(`http://127.0.0.1/user/${user}`, "GET");
            const jobExperiencesData = await apiRequest(`http://127.0.0.1/jobExperience/${user}`, "GET");
            const educationsData = await apiRequest(`http://127.0.0.1/education/${user}`, "GET");
            const languagesData = await apiRequest(`http://127.0.0.1/language/${user}`, "GET");
            const skillsData = await apiRequest(`http://127.0.0.1/skill/${user}`, "GET");
            const coursesData = await apiRequest(`http://127.0.0.1/course/${user}`, "GET");
            const profilesData = await apiRequest(`http://127.0.0.1/profile/${user}`, "GET");
            const profilePictureData = await apiRequest(`http://127.0.0.1/profilePicture/${user}`, "GET", null, {}, true);
            const filesData = await apiRequest(`http://127.0.0.1/file/${user}`, "GET");
            
            if (userInfoData) {
                setUserInfo(userInfoData);
                setJobExperiences(jobExperiencesData);
                setEcucations(educationsData);
                setLanguages(languagesData);
                setSkills(skillsData);
                setCourses(coursesData);
                setProfiles(profilesData);
                if(profilePictureData)
                    setProfilePicture(profilePictureData);
                setFiles(filesData);
                setLoading(false);
            } else {
                setError("Nie udało się wczytać zawartości strony");
                setLoading(false);
            }
        }

        if (user) {
            fetchUserInfo();
        }
    }, [user]);

    if (loading) return <p>ładowanie</p>;
    if (error) return <p>Wystąpił problem: {error}</p>;

    return (
        <div className="bg-body-secondary min-vh-100 d-flex flex-column">
            <Navbar />
            <div className="d-flex flex-grow-1">
                <div className="col-lg-3 col-2 bg-light d-flex flex-column align-items-center position-fixed sidebar p-2">
                    <div className="rounded-circle ratio ratio-1x1 overflow-hidden my-2" style={{ maxWidth: 200 }}>
                        <img src={profilePicture} />
                    </div>
                    <h3 className="fs-4 d-lg-block d-none">Mój profil</h3>
                    <hr className="col-11" />
                    <ul className="nav nav-pills flex-column col-lg-12 col-auto p-3 pt-0">
                        <li><Link to={`/Profile`} className="nav-link link-dark"><i className="bi bi-person-circle me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Profil zawodowy</span></Link></li>
                        <li><Link to={`/Profile/saved`} className="nav-link link-dark"><i className="bi bi-star-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Zapisane</span></Link></li>
                        <li><Link to={`/Profile/applications`} className="nav-link link-dark"><i className="bi bi-send-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Moje aplikacje</span></Link></li>
                        <li><Link to={`/Profile/documents`} className="nav-link link-dark"><i className="bi bi-file-earmark-text-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Dokumenty</span></Link></li>
                        <li><Link to={`/Profile/settings`} className="nav-link link-dark"><i className="bi bi-gear-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Ustawienia</span></Link></li>
                        <li><Link to="/Logout" className="nav-link link-dark"><i className="bi bi-box-arrow-left me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Wyloguj się</span></Link></li>
                    </ul>
                </div>
                <div className="offset-lg-3 col-lg-9 offset-2 col-10">
                    <Routes>
                        <Route index element={<ProfileInfo userInfo={userInfo} jobExperiences={jobExperiences} educations={educations} languages={languages} skills={skills} courses={courses} profiles={profiles}/>} />
                        <Route path="saved" element={<SavedOffers />} />
                        <Route path="applications" element={<MyApplications />} />
                        <Route path="documents" element={<Documents files={files} setFiles={setFiles}/>} />
                        <Route path="settings" element={<Settings userInfoSet={userInfo} jobExperiencesSet={jobExperiences} educationsSet={educations} languagesSet={languages} skillsSet={skills} coursesSet={courses} profilesSet={profiles} stateSetters={{userInfo: setUserInfo, jobExperiences: setJobExperiences}}/>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}