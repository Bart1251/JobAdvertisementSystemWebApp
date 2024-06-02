import { useEffect, useState } from "react"
import { useApi } from "../../contexts/ApiContext";
import ProfileInfo from "../Profile/ProfileInfo";

export default function OfferApplicants({ offerId }) {
    const { apiRequest } = useApi();
    const [applicants, setApplicants] = useState([]);
    const [applicantsJobExperiences, setApplicantsJobExperiences] = useState([]);
    const [applicantsEducations, setApplicantsEducations] = useState([]);
    const [applicantsLanguages, setApplicantsLanguages] = useState([]);
    const [applicantsSkills, setApplicantsSkills] = useState([]);
    const [applicantsCourses, setApplicantsCourses] = useState([]);
    const [applicantsProfiles, setApplicantsProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchApplicants() {
            const applicantsData = await apiRequest(`http://127.0.0.1/appliedOffers/company/${offerId}`, "GET");
            
            if(applicantsData) {
                setApplicants(applicantsData);
                setLoading(false);
                
                for(const applicant of applicantsData) {
                    const jobExperiencesData = await apiRequest(`http://127.0.0.1/jobExperience/${applicant.user_id}`, "GET");
                    const educationsData = await apiRequest(`http://127.0.0.1/education/${applicant.user_id}`, "GET");
                    const languagesData = await apiRequest(`http://127.0.0.1/userLanguage/${applicant.user_id}`, "GET");
                    const skillsData = await apiRequest(`http://127.0.0.1/skill/${applicant.user_id}`, "GET");
                    const coursesData = await apiRequest(`http://127.0.0.1/course/${applicant.user_id}`, "GET");
                    const profilesData = await apiRequest(`http://127.0.0.1/profile/${applicant.user_id}`, "GET");
                    setApplicantsJobExperiences(prevState => [...prevState, {user_id: applicant.user_id, data: jobExperiencesData}]);
                    setApplicantsEducations(prevState => [...prevState, {user_id: applicant.user_id, data: educationsData}]);
                    setApplicantsLanguages(prevState => [...prevState, {user_id: applicant.user_id, data: languagesData}]);
                    setApplicantsSkills(prevState => [...prevState, {user_id: applicant.user_id, data: skillsData}]);
                    setApplicantsCourses(prevState => [...prevState, {user_id: applicant.user_id, data: coursesData}]);
                    setApplicantsProfiles(prevState => [...prevState, {user_id: applicant.user_id, data: profilesData}]);
                }
            }
            setLoading(false);
        }

        fetchApplicants();
    }, [offerId]);

    async function ChangeStatus(id, status) {
        setApplicants(prevState => { 
            const updatedState = [...prevState]; 
            const prevStatus = updatedState.find(e => e.applied_offer_id == id).status;
             if(status == prevStatus) {
                updatedState.find(e => e.applied_offer_id == id).status = 1;
                apiRequest(`http://127.0.0.1/appliedOffers/status/${id}/${1}`, "PUT");
            } else {
                updatedState.find(e => e.applied_offer_id == id).status = status;
                apiRequest(`http://127.0.0.1/appliedOffers/status/${id}/${status}`, "PUT");
            }
            return updatedState;
        });
    } 
    
    if (loading) return <p>ładowanie</p>;

    return (
        <div>
            {applicants.length == 0 && <p className="m-2">Jeszcze nikt nie aplikował na to stanowisko</p>}
            <div className="accordion" id="accordionApplicant">
            {applicants.map(e => { return (
                <div key={e.user_id} className="accordion-item">
                    <h2 className="accordion-header">
                        <button onClick={async () => { await apiRequest(`http://127.0.0.1/appliedOffers/seen/${e.applied_offer_id}`, "PUT"); }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseApplicant" + e.user_id} aria-expanded="false" aria-controls={"collapseApplicant" + e.user_id}>
                            <h3 className="fs-5 m-0">{`${e.first_name} ${e.last_name}`}</h3>
                        </button>
                    </h2>
                    <div id={"collapseApplicant" + e.user_id} className="accordion-collapse collapse" data-bs-parent="#accordionApplicant">
                        <div className="accordion-body p-0" style={{maxHeight: "80vh", overflowY: "auto"}}>
                            <div className="position-relative">
                                <button type="button" onClick={async () => await ChangeStatus(e.applied_offer_id, 2)} className={`position-absolute top-0 end-0 m-2 m-lg-5 btn p-0 px-1 ${e.status != 2 ? "btn-outline-success" : "btn-success"}`} style={{transform: "translateX(-50px)"}}><i className={`bi bi-check-circle fs-3`}></i></button>
                                <button type="button" onClick={async () => await ChangeStatus(e.applied_offer_id, 3)} className={`position-absolute top-0 end-0 m-2 m-lg-5 btn p-0 px-1 ${e.status != 3 ? "btn-outline-danger" : "btn-danger"}`}><i className={`bi bi-x-circle fs-3`}></i></button>
                            </div>
                            <ProfileInfo userInfo={e} 
                                jobExperiences={applicantsJobExperiences.length > 0 ? applicantsJobExperiences.find(se => se.user_id == e.user_id).data : []} 
                                educations={applicantsEducations.length > 0 ? applicantsEducations.find(se => se.user_id == e.user_id).data: []} 
                                languages={applicantsLanguages.length > 0 ? applicantsLanguages.find(se => se.user_id == e.user_id).data : []} 
                                skills={applicantsSkills.length > 0 ? applicantsSkills.find(se => se.user_id == e.user_id).data : []} 
                                courses={applicantsCourses.length > 0 ? applicantsCourses.find(se => se.user_id == e.user_id).data : []} 
                                profiles={applicantsProfiles.length > 0 ? applicantsProfiles.find(se => se.user_id == e.user_id).data : []}/>
                        </div>
                    </div>
                </div>
            )})}
            </div>
        </div>
    )
}