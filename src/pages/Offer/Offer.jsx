import Navbar from "../../components/Navbar";
import Actions from "./Actions";
import Info from "./Info";
import List from "./List";
import Map from "./Map";


export default function Offer() {
    return (
        <div className="bg-body-secondary min-vh-100">
            <Navbar/>
            <div className="container-md p-5 d-flex flex-row justify-content-center gap-4">
                <div className="col-7 d-flex flex-column gap-3">
                    <Info/>
                    <Map/>
                    <List title="Twój zakres obowiązków" items={["Układanie towaru na półkach, w lodówkach i ladach chłodniczych", "Zmiana ekspozycji produktów", "Prace pomocnicze na hali sprzedażowej i magazynie"]}/>
                </div>
                <div className="col-4">
                    <Actions/>
                </div>
            </div>
        </div>
    )
}