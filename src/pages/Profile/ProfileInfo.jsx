import InfoItemText from "../../components/InfoItemText"
import CourseItem from "./CourseItem"
import EducationItem from "./EducationItem"
import WorkingExperienceItem from "./WorkingExperienceItem"

export default function ProfileInfo({ userInfo, jobExperiences, educations, languages, skills, courses, profiles }) {
    return (
       <div className="m-2 m-lg-5">
            <h2>{`${userInfo.first_name} ${userInfo.last_name}`}</h2>
            <p className="fs-5">{userInfo.occupation}</p>
            <p>{userInfo.description}</p>
            <hr/>
            <div className="col-xl-6">
                <InfoItemText title="Data urodzenia: " text={userInfo.date_of_birth}/>
                <InfoItemText title="Adres: " text={userInfo.address}/>
                <InfoItemText title="Telefon: " text={userInfo.phone_number}/>
                <InfoItemText title="Email: " text={userInfo.email}/>
            </div>
            <hr/>
            {userInfo.current_job_description && <>
                <div>
                    <h4>Aktualne stanowisko</h4>
                    <p>{userInfo.current_job_description}</p>
                </div>
                <hr/>
            </>}
            {jobExperiences && <>
                <div>
                    <h4>Doświadczenie zawdowe</h4>
                    {jobExperiences.map(e => <WorkingExperienceItem key={e.job_experience_id} start={e.period_of_employment_start} end={e.period_of_employment_end} position={e.position} company={e.company} location={e.location} responsibilities={e.responsibilities}/>)}
                </div>
                <hr/>
            </>}
            {educations && <>
                <div>
                    <h4>Wykształcenie</h4>
                    {educations.map(e => <EducationItem key={e.education_id} start={e.period_of_education_start} end={e.period_of_education_end} location={e.town} institution={e.institution_name} fieldOfStudy={e.field_of_study} educationLevel={e.level}/>)}
                </div>
                <hr/>
            </>}
            {languages && <>
                <div>
                    <h4>Znajomość języków</h4>
                    <ul>{languages.map(e => <li key={e.user_language_id}>{e.language + " " + e.level}</li>)}</ul>
                </div>
                <hr/>
            </>}
            {skills && <>
                <div>
                    <h4>Umiejętności</h4>
                    <ul>{skills.map(e => <li key={e.skill_id}>{e.skill}</li>)}</ul>
                </div>
                <hr/>
            </>}
            {courses && <>
                <div>
                    <h4>Kursy i szkolenia</h4>
                    {courses.map(e => <CourseItem key={e.course_id} start={e.course_start} end={e.course_end} name={e.course} organizer={e.organizer}/>)}
                </div>
                <hr/>
            </>}
            {profiles && <>
                <div>
                    <h4>Linki</h4>
                    <ul>{profiles.map(e => <li key={e.profile_id}>{e.link}</li>)}</ul>
                </div>
            </>}
       </div> 
    )
}