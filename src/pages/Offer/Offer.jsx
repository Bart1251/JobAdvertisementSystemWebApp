import Navbar from "../../components/Navbar";
import Actions from "./Actions";
import Info from "./Info";
import List from "./List";
import Map from "./Map";
import OtherOffers from "./OtherOffers";

export default function Offer() {
    return (
        <div className="bg-body-secondary min-vh-100">
            <Navbar/>
            <div>
                <div className="container-md p-md-3 p-0 p-xl-5 d-flex flex-column flex-lg-row justify-content-center gap-4">
                    <div className="col-lg-7 col-12 d-flex flex-column gap-3">
                        <Info/>
                        <Map/>
                        <List title="Twój zakres obowiązków" items={["Układanie towaru na półkach, w lodówkach i ladach chłodniczych", "Zmiana ekspozycji produktów", "Prace pomocnicze na hali sprzedażowej i magazynie"]}/>
                        <List title="Nasze wymagania" items={["Doskonała organizacja pracy własnej", "Umiejętność budowania długofalowych relacji z klientem", "Wysoki poziom kultury osobistej"]}/>
                        <List title="To oferujemy" items={["Zatrudnienie w oparciu o umowę o pracę w firmie o ugruntowanej pozycji na rynku", "Szkolenia", "Spotkania integracyjne"]}/>
                    </div>
                    <div className="col-lg-4 col-12 d-flex flex-column gap-3">
                        <Actions/>
                        <OtherOffers/>
                    </div>
                </div>
            </div>
        </div>
    )
}