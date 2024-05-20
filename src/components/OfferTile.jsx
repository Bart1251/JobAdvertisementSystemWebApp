import { Link } from "react-router-dom"

export default function OfferTile({ offer }) {
    return (
        <div className="col-12 col-lg-6 col-xxl-4">
            <Link className="d-flex bg-light-subtle shadow rounded p-3 my-2 m-sm-2" to={`/Offer/${1}`}>
                
            </Link>
        </div>
    )
}