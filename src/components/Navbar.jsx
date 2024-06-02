import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useUser } from '../contexts/UserContext'

export default function Navbar() {
    const {user} = useUser();
    return (
        <nav className="navbar navbar-expand-sm bg-white shadow fs-5 z-3 fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Job Navigator</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav w-100 gap-2">
                        <li className="nav-item me-auto ms-1"></li>
                        {user == null && 
                        <Dropdown text="Moje konto" align="dropdown-menu-end" btnClassName="btn-secondary">
                            <li><Link to="/Login" className="btn rounded-pill w-100 btn-secondary">Zaloguj się</Link></li>
                            <p className="mt-2 mb-1">Nie masz jeszcze konta?</p>
                            <li><Link to="/Register" className="btn rounded-pill w-100 btn-secondary">Zarejestruj się</Link></li>
                        </Dropdown>}
                        {user != null &&
                        <Link to="/Profile" className="btn rounded-pill btn-secondary ps-3 pe-3 m-1">Moje konto</Link>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}