import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/react.svg";
import { useApi } from "../contexts/ApiContext";
import { useUser } from "../contexts/UserContext";

export default function OfferTile({ offer }) {
    const navigateTo = useNavigate();
    const { apiRequest } = useApi();
    const { user } = useUser();
    const [logo, setLogo] = useState(img);
    const [isSaved, setIsSaved] = useState(false);

    async function saveOffer(e) {
        e.preventDefault();
        e.stopPropagation();
        if(user) {
            const isSavedData = await apiRequest(`http://127.0.0.1/savedOffers/save/${user}/${offer.offer_id}`, "POST");
            
            if(isSavedData)
                setIsSaved(isSavedData.is_offer_saved);
        } else {
            navigateTo("/Login");
        }
    }

    useEffect(() => {
        async function fetchLogo() {
            const logoData = await apiRequest(`http://127.0.0.1/companyLogo/${offer.company_id}`, "GET", null, {}, true);
            const isSavedData = await apiRequest(`http://127.0.0.1/savedOffers/isSaved/${user}/${offer.offer_id}`, "GET");

            if(logoData)
                setLogo(logoData);
            if(isSavedData)
                setIsSaved(isSavedData.is_offer_saved);
        }

        fetchLogo();
    }, [offer])

    return (
        <div className="col-12 col-lg-6 col-xxl-4">
            <Link className="d-flex bg-light-subtle shadow rounded text-decoration-none text-black p-3 my-2 m-sm-2" to={`/Offer/${offer.offer_id}`}>
                <div className="d-flex flex-column gap-1 flex-grow-1">
                    <h4 className="fs-5">{offer.position}</h4>
                    <h6 className="text-secondary">{offer.min_wage} - {offer.max_wage} zł</h6>
                    <div className="d-flex flex-row my-1">
                        <img src={logo} alt={"Logo " + offer.name} style={{width: 80, height: 80}}/>
                        <div className="d-flex flex-column mx-3">
                            <h4 className="fs-4">{offer.name}</h4>
                            <p>{offer.address}</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-start">
                    <button type="button" onClick={saveOffer} className="bg-light-subtle border-0 p-0 mb-auto">
                        <i className={`bi bi-star${isSaved ? "-fill" : ""} fs-3 ${isSaved ? "text-warning" : ""}`}></i>
                    </button>
                </div>
            </Link>
        </div>
    )
}