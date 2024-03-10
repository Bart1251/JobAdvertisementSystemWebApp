import { React, useState } from 'react'
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
                <div className="col-lg-3 col-2 bg-light d-flex flex-column align-items-center position-fixed sidebar p-3">
                    <div className="rounded-circle ratio ratio-1x1" style={{maxWidth: 200}}>
                        <img src={img}/>
                    </div>
                    <h3 className="fs-4 d-lg-block d-none">Mój profil</h3>
                    <hr className="col-11"/>
                    <ul className="nav nav-pills flex-column col-lg-12 col-auto p-3 pt-0">
                        <li>
                            <button onClick={() => setDisplayedSection(0)} className="nav-link link-dark"><i className="bi bi-person-circle me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Profil zawodowy</span></button>
                        </li>
                        <li>
                            <button onClick={() => setDisplayedSection(1)} className="nav-link link-dark"><i className="bi bi-star-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Zapisane</span></button>
                        </li>
                        <li>
                            <button onClick={() => setDisplayedSection(2)} className="nav-link link-dark"><i className="bi bi-send-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Moje aplikacje</span></button>
                        </li>
                        <li>
                            <button onClick={() => setDisplayedSection(3)} className="nav-link link-dark"><i className="bi bi-file-earmark-text-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Dokumenty</span></button>
                        </li>
                        <li>
                            <button onClick={() => setDisplayedSection(4)} className="nav-link link-dark"><i className="bi bi-gear-fill me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Ustawienia</span></button>
                        </li>
                        <li>
                            <Link to="/Logout" className="nav-link link-dark"><i className="bi bi-box-arrow-left me-0 me-lg-2 fs-lg-6 fs-3"></i><span className="d-lg-inline d-none">Wyloguj się</span></Link>
                        </li>
                    </ul>
                </div>
                <div className="offset-lg-3 col-lg-9 offset-2 col-10">
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