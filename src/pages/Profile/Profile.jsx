import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar"
import img from "../../assets/react.svg"
import ProfileInfo from "./ProfileInfo"
import SavedOffers from "./SavedOffers"
import MyApplications from "./MyApplications"
import Documents from "./Documents"
import Settings from "./Settings"

export default function Profile() {
    const [displayedSection, setDisplayedSection] = useState(0);

    return (
        <div className="bg-body-secondary min-vh-100 d-flex flex-column">
            <Navbar/>
            <div className="d-flex flex-grow-1">
                <div className="d-flex flex-column p-3 bg-light col-3 flex-grow-1">
                    <h3 className="d-flex flex-column align-items-center ms-3 m-1 text-decoration-none link-dark fs-4">
                        <div className="rounded-circle ratio ratio-1x1" style={{maxWidth: 200}}>
                            <img src={img}/>
                        </div>
                        <span>Mój profil</span>
                    </h3>
                    <hr/>
                    <ul className="nav nav-pills flex-column">
                        <li>
                            <button onClick={() => setDisplayedSection(0)} className="nav-link link-dark"><i className="bi bi-person-circle me-2"></i>Profil zawodowy</button>
                        </li>
                        <li>
                            <button onClick={() => setDisplayedSection(1)} className="nav-link link-dark"><i className="bi bi-star-fill me-2"></i>Zapisane</button>
                        </li>
                        <li>
                            <button onClick={() => setDisplayedSection(2)} className="nav-link link-dark"><i className="bi bi-send-fill me-2"></i>Moje aplikacje</button>
                        </li>
                        <li>
                            <button onClick={() => setDisplayedSection(3)} className="nav-link link-dark"><i className="bi bi-file-earmark-text-fill me-2"></i>Dokumenty</button>
                        </li>
                        <li>
                            <button onClick={() => setDisplayedSection(4)} className="nav-link link-dark"><i className="bi bi-gear-fill me-2"></i>Ustawienia</button>
                        </li>
                        <li>
                            <Link to="/Logout" className="nav-link link-dark"><i className="bi bi-box-arrow-left me-2"></i>Wyloguj się</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-9">
                    {displayedSection == 0 && <ProfileInfo/>}
                    {displayedSection == 1 && <SavedOffers/>}
                    {displayedSection == 2 && <MyApplications/>}
                    {displayedSection == 3 && <Documents/>}
                    {displayedSection == 4 && <Settings/>}
                </div>
            </div>
        </div>
    )
}