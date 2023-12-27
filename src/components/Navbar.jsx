import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm bg-white shadow fs-5">
            <div className="container">
                <Link className="navbar-brand" to="/">Job Navigator</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav w-100 gap-2">
                        <li className="nav-item me-auto ms-1">
                            <Link to="/oferty" className="nav-link">Oferty pracy</Link>
                        </li>
                        <Dropdown text="Moje konto" align="dropdown-menu-end" btnClassName="btn-secondary">
                            <li><Link to="/Login" className="btn rounded-pill w-100 btn-secondary">Zaloguj się</Link></li>
                            <p className="mt-2 mb-1">Nie masz jeszcze konta?</p>
                            <li><Link to="/Register" className="btn rounded-pill w-100 btn-secondary">Zarejestruj się</Link></li>
                        </Dropdown>
                    </ul>
                </div>
            </div>
        </nav>
    )
}