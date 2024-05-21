import { Link } from "react-router-dom"

export default function OfferTile({ offer }) {
    return (
        <div className="col-12 col-lg-6 col-xxl-4">
            <Link className="d-flex bg-light-subtle shadow rounded text-decoration-none text-black p-3 my-2 m-sm-2" to={`/Offer/${1}`}>
                <div className="d-flex flex-column gap-1 flex-grow-1">
                    <h4 className="fs-5">{offer.position}</h4>
                </div>
                <div className="d-flex align-items-start">
                    <button type="button" className="bg-light-subtle border-0 p-0 mb-auto"><i class="bi bi-star fs-3"></i></button>
                </div>
            </Link>
        </div>
    )
}