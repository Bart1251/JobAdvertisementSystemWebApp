import UserInfoSettings from "./UserInfoSettings";
import JobExperienceSettings from "./JobExperienceSettings";
import EducationSettings from "./EducationSettings";
import LanguageSettings from "./LanguageSettings";
import SkillSettings from "./SkillSettings";
import CourseSettings from "./CourseSettings";
import ProfileSettings from "./ProfileSettings";
import OtherSettings from "./OtherSettings";

export default function Settings({ userInfoSet, jobExperiencesSet, educationsSet, languagesSet, skillsSet, coursesSet, profilesSet, stateSetters, educationLevels, languages, languageLevels }) {
    return (
       <div className="m-2 m-lg-5">
            <UserInfoSettings userInfoSet={userInfoSet} userInfoSetter={stateSetters.userInfo}/>
            <hr/>
            <h3>Informacje dla pracodawców</h3>
            <JobExperienceSettings jobExperiencesSet={jobExperiencesSet} jobExperiencesSetter={stateSetters.jobExperiences}/>
            <hr/>
            <EducationSettings educationsSet={educationsSet} educationsSetter={stateSetters.educations} educationLevels={educationLevels}/>
            <hr/>
            <LanguageSettings languagesSet={languagesSet} languagesSetter={stateSetters.languages} languages={languages} languageLevels={languageLevels}/>
            <hr/>
            <SkillSettings skillsSet={skillsSet} skillsSetter={stateSetters.skills}/>
            <hr/>
            <CourseSettings coursesSet={coursesSet} coursesSetter={stateSetters.courses}/>
            <hr/>
            <ProfileSettings profilesSet={profilesSet} profilesSetter={stateSetters.profiles}/>
            <hr/>
            <OtherSettings profilePictureSetter={stateSetters.profilePicture}/>
            <hr/>
       </div> 
    )
}