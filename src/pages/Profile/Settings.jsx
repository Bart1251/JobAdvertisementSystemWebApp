import { useState } from "react"
import UserInfoSettings from "./UserInfoSettings";
import JobExperienceSettings from "./JobExperienceSettings";

export default function Settings({ userInfoSet, jobExperiencesSet, educationsSet, languagesSet, skillsSet, coursesSet, profilesSet, stateSetters }) {
    const [educations, setEcucations] = useState(educationsSet);
    const [languages, setLanguages] = useState(languagesSet);
    const [skills, setSkills] = useState(skillsSet);
    const [courses, setCourses] = useState(coursesSet);
    const [profiles, setProfiles] = useState(profilesSet);

    return (
       <div className="m-2 m-lg-5">
            <UserInfoSettings userInfoSet={userInfoSet} userInfoSetter={stateSetters.userInfo}/>
            <hr/>
            <h3>Informacje dla pracodawców</h3>
            <JobExperienceSettings jobExperiencesSet={jobExperiencesSet} jobExperiencesSetter={stateSetters.jobExperiences}/>
            <hr/>
       </div> 
    )
}