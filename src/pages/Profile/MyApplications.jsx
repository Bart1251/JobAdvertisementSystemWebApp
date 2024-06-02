import { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";
import OfferTile from "../../components/OfferTile";

export default function MyApplications() {
    const { user } = useUser();
    const { apiRequest } = useApi();
    const [appliedOffers, setAppliedOffers] = useState([]);

    useEffect(() => {
        async function fetchOffers() {
            const appliedOffersData = await apiRequest(`http://127.0.0.1/appliedOffers/user/${user}`, "GET");

            if(appliedOffersData)
                setAppliedOffers(appliedOffersData);
        }

        fetchOffers();
    }, [user]);

    return (
       <div className="m-2 m-lg-5 d-flex flex-wrap">
            {appliedOffers.map(e => { return <OfferTile key={e.offer_id} offer={e} status={e.status}/> })}
       </div> 
    )
}