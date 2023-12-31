import InfoItemText from "../../components/InfoItemText"
import CourseItem from "./CourseItem"
import EducationItem from "./EducationItem"
import WorkingExperienceItem from "./WorkingExperienceItem"

export default function ProfileInfo() {
    return (
       <div className="m-2 m-lg-5">
            <h2>Jan Nowak</h2>
            <p className="fs-5">Zawodowiec</p>
            <p>Jestem programistą full-stack, programowaniem zajmuję się od x lat…</p>
            <hr/>
            <div className="col-xl-6">
                <InfoItemText title="Data urodzenia: " text="12.01.2000"/>
                <InfoItemText title="Adres: " text="ul. Długa 12 02-969 Warszawa"/>
                <InfoItemText title="Telefon: " text="123 123 123"/>
                <InfoItemText title="Email: " text="example@gmail.com"/>
            </div>
            <hr/>
            <div>
                <h4>Aktualne stanowisko</h4>
                <p>Maecenas aliquam, est eget consectetur vehicula, nulla nulla lobortis mauris, et porttitor mi neque sed justo. Morbi tincidunt ullamcorper efficitur. Vivamus mollis blandit diam vel tempor. Nullam et ullamcorper orci. Cras vel dolor elementum, luctus arcu quis, blandit nibh. Mauris in dolor magna. Sed aliquam nisl justo, in cursus nibh euismod vitae.</p>
            </div>
            <hr/>
            <div>
                <h4>Doświadczenie zawdowe</h4>
                <WorkingExperienceItem start="12.12.1231" end="31.12.2314" position="Elektryk" company="Elektro-Tech" location="Warszawa" responsibilities={["fasdasdasda", "dasfafasdfa", "fasafdsfdasfsda"]}/>
                <WorkingExperienceItem start="12.12.1231" end="31.12.2314" position="Elektryk" company="Elektro-Tech" location="Warszawa" responsibilities={["fasdasdasda", "dasfafasdfa", "fasafdsfdasfsda"]}/>
            </div>
            <hr/>
            <div>
                <h4>Wykształcenie</h4>
                <EducationItem start="12.12.1231" end="31.12.2314" location="Warszawa" institution="Politechnika Warszawska" fieldOfStudy="Technika wysokich napięć" educationLevel="Wyższe"/>
                <EducationItem start="12.12.1231" end="31.12.2314" location="Warszawa" institution="Politechnika Warszawska" fieldOfStudy="Technika wysokich napięć" educationLevel="Wyższe"/>
            </div>
            <hr/>
            <div>
                <h4>Znajomość języków</h4>
                <ul>
                    <li>Angielski C2</li>
                    <li>Niemiecki B2</li>
                    <li>Francuski A2</li>
                </ul>
            </div>
            <hr/>
            <div>
                <h4>Umiejętności</h4>
                <ul>
                    <li>Prawo jazdy kat. B</li>
                    <li>Obsługa pakietu Office</li>
                </ul>
            </div>
            <hr/>
            <div>
                <h4>Kursy i szkolenia</h4>
                <CourseItem start="12.12.1231" end="31.12.2314" name="Kurs pierwszej pomocy" organizer="Same Kursy"/>
            </div>
            <hr/>
            <div>
                <h4>Linki</h4>
                <ul>
                    <li>https://github.com/Bart1251</li>
                </ul>
            </div>
       </div> 
    )
}