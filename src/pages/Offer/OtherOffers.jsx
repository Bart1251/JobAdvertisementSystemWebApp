import OfferTileSmall from "./OfferTileSmall"
import { useState, useEffect } from "react";
import { useApi } from "../../contexts/ApiContext";

export default function OtherOffers({ id }) {
    const { apiRequest } = useApi();
    const [similarOffers, setSimilarOffers] = useState([]);

    useEffect(() => {
        async function fetchOffers() {
            const offersData = await apiRequest(`http://127.0.0.1/similarOffers/${id}`, "GET");
            
            if (offersData)
                setSimilarOffers(offersData);
        }

        if (id) {
            fetchOffers();
        }
    }, [id]);

    return (
        <div className="bg-light-subtle shadow rounded">
            { similarOffers.length > 0 && <>
            <h3 className="p-3 fs-4">Sprawdź podobne oferty</h3>
            {similarOffers.map(e => { return <OfferTileSmall key={e.offer_id} id={e.offer_id} title={e.position} company={e.name} location={e.address}/> })}</>}
        </div>
    )
}