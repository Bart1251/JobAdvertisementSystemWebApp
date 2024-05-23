import { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import OfferTile from "../../components/OfferTile";

export default function SavedOffers() {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const [savedOffers, setSavedOffers] = useState([]);

    useEffect(() => {
        async function fetchOffers() {
            const savedOffersData = await apiRequest(`http://127.0.0.1/savedOffers/${user}`, "GET");

            if(savedOffersData)
                setSavedOffers(savedOffersData);
        }

        fetchOffers();
    }, [user]);

    return (
       <div className="m-2 m-lg-5 d-flex flex-wrap">
            {savedOffers.map(e => { return <OfferTile key={e.offer_id} offer={e}/> })}
       </div> 
    )
}