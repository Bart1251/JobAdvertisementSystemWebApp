import { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import { useUser } from "../../contexts/UserContext";

export default function Actions({ id }) {
    const { apiRequest } = useApi();
    const { user } = useUser();
    const [isSaved, setIsSaved] = useState(false);
    const [isApplied, setIsApplied] = useState(false);

    async function saveOffer(e) {
        const isSavedData = await apiRequest(`http://127.0.0.1/savedOffers/save/${user}/${id}`, "POST");

        if(isSavedData)
            setIsSaved(isSavedData.is_offer_saved);
    }

    async function applyForOffer(e) {
        const isAppliedData = await apiRequest(`http://127.0.0.1/appliedOffers/save/${user}/${id}`, "POST");

        if(isAppliedData)
            setIsApplied(isAppliedData.is_offer_applied_for);
    }

    useEffect(() => {
        async function checkIsSavedAndApplied() {
            const isSavedData = await apiRequest(`http://127.0.0.1/savedOffers/isSaved/${user}/${id}`, "GET");
            const isAppliedData = await apiRequest(`http://127.0.0.1/appliedOffers/isApplied/${user}/${id}`, "GET");

            if(isSavedData)
                setIsSaved(isSavedData.is_offer_saved);
            if(isAppliedData)
                setIsApplied(isAppliedData.is_offer_applied_for);
        }

        checkIsSavedAndApplied();
    }, [id])

    return (
        <div className="bg-light-subtle shadow rounded d-flex flex-column pt-3 pb-3">
            <button onClick={applyForOffer} disabled={isApplied ? true : false} className="btn btn-primary p-2 m-2 ms-xl-4 me-xl-4 ms-xxl-5 me-xxl-5 rounded-5 fs-5 fw-medium"><i className="bi bi-file-text-fill"></i>{isApplied ? "Aplikowano" : "Aplikuj"}</button>
            <button onClick={saveOffer} className="btn btn-primary p-2 m-2 ms-xl-4 me-xl-4 ms-xxl-5 me-xxl-5 rounded-5 fs-5 fw-medium"><i className="bi bi-star"></i>{isSaved ? " Usuń z zapisanych" : " Zapisz"}</button>
        </div>
    )
}