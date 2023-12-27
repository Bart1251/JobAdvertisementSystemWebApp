

export default function OfferTileSmall(props) {
    return (
        <div className="border-top p-3 d-flex flex-row justify-content-between">
            <div>
                <h3 className="fs-5">{props.title}</h3>
                <p className="m-1">{props.company}</p>
                <p className="m-1 text-secondary"><i className="bi bi-geo-alt-fill text-secondary me-2"></i>{props.location}</p>
            </div>
            <i className="bi bi-star fs-3"></i>
        </div>
    )
}