import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/react.svg";
import { useApi } from "../contexts/ApiContext";

export default function OfferTile({ offer }) {
    const { apiRequest } = useApi();
    const [logo, setLogo] = useState(img);

    useEffect(() => {
        async function fetchLogo() {
            const logoData = await apiRequest(`http://127.0.0.1/companyLogo/${offer.company_id}`, "GET", null, {}, true);

            if(logoData) {
                setLogo(logoData);
            }
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
                    <button type="button" className="bg-light-subtle border-0 p-0 mb-auto"><i class="bi bi-star fs-3"></i></button>
                </div>
            </Link>
        </div>
    )
}