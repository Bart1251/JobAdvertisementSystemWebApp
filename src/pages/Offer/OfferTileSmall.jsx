import { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";


export default function OfferTileSmall({ id, title, company, location }) {
    const { apiRequest } = useApi();
    const { user } = useUser();
    const [isSaved, setIsSaved] = useState(false);

    async function saveOffer(e) {
        e.preventDefault();
        e.stopPropagation();
        const isSavedData = await apiRequest(`http://127.0.0.1/savedOffers/save/${user}/${id}`, "POST");

        if(isSavedData)
            setIsSaved(isSavedData.is_offer_saved);
    }

    useEffect(() => {
        async function checkIsSaved() {
            const isSavedData = await apiRequest(`http://127.0.0.1/savedOffers/isSaved/${user}/${id}`, "GET");

            if(isSavedData)
                setIsSaved(isSavedData.is_offer_saved);
        }

        checkIsSaved();
    }, [id])


    return (
        <Link className="border-top text-decoration-none text-black p-3 d-flex flex-row justify-content-between" to={`/Offer/${id}`}>
            <div>
                <h3 className="fs-5">{title}</h3>
                <p className="m-1">{company}</p>
                <p className="m-1 text-secondary"><i className="bi bi-geo-alt-fill text-secondary me-2"></i>{location}</p>
            </div>
            <button type="button" onClick={saveOffer} className="bg-light-subtle border-0 p-0 mb-auto">
                <i className={`bi bi-star${isSaved ? "-fill" : ""} fs-3 ${isSaved ? "text-warning" : ""}`}></i>
            </button>
        </Link>
    )
}