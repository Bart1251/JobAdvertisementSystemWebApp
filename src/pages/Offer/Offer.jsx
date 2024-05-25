import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Actions from "./Actions";
import Info from "./Info";
import List from "./List";
import Map from "./Map";
import OtherOffers from "./OtherOffers";
import { useApi } from "../../contexts/ApiContext";
import { useState, useEffect } from "react";
import img from "../../assets/react.svg";

export default function Offer() {
    const { Id } = useParams();
    const { apiRequest } = useApi();
    const [offer, setOffer] = useState({});
    const [companyLogo, setCompanyLogo] = useState(img);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOfferInfo() {
            const offerData = await apiRequest(`http://127.0.0.1/offerDetail/${Id}`, "GET");
            const companyLogoData = await apiRequest(`http://127.0.0.1/companyLogo/${offerData.company_id}`, "GET", null, {}, true);
            
            if (offerData) {
                setOffer(offerData);
                if(companyLogoData)
                    setCompanyLogo(companyLogoData);
                setLoading(false);
            } else {
                setError("Nie udało się wczytać zawartości strony");
                setLoading(false);
            }
        }

        function addToLastSeen() {
            let lastSeen = JSON.parse(localStorage.getItem("lastSeen")) || [];
            console.log(lastSeen);
            if(lastSeen[0] != Id) {
                lastSeen = lastSeen.filter(e => e != Id);
                lastSeen.unshift(Id);
                if (lastSeen.length > 48) {
                    lastSeen.pop();
                }
                localStorage.setItem("lastSeen", JSON.stringify(lastSeen));
            }
            console.log(lastSeen);
        }

        if (Id) {
            fetchOfferInfo();
            addToLastSeen();
        }
    }, [Id]);

    if (loading) return <p>ładowanie</p>;
    if (error) return <p>Wystąpił problem: {error}</p>;

    return (
        <div className="bg-body-secondary min-vh-100">
            <Navbar/>
            <div>
                <div className="container-md p-md-3 p-0 p-xl-5 d-flex flex-column flex-lg-row justify-content-center gap-4">
                    <div className="col-lg-7 col-12 d-flex flex-column gap-3">
                        <Info offer={offer} companyLogo={companyLogo}/>
                        <List title="Twój zakres obowiązków" items={offer.responsibilities.map(e => e.offer_responsibility)}/>
                        <List title="Nasze wymagania" items={offer.requirements.map(e => e.requirement)}/>
                        <List title="To oferujemy" items={offer.benefits.map(e => e.benefit)}/>
                        <Map location={offer.location.split(";")} company={offer.name} address={offer.address}/>
                    </div>
                    <div className="col-lg-4 col-12 d-flex flex-column gap-3">
                        <Actions id={offer.offer_id}/>
                        <OtherOffers id={offer.offer_id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}