import OfferApplicants from "./OfferApplicants";


export default function Applications({ offersSet }) {

    return (
        <div className="m-2 m-lg-4">
            <h3 className="ms-2">Aplikacje na poszczególne oferty</h3>
            <div className="accordion" id="accordionOffer">
                {offersSet.map(e => { return (
                    <div key={e.offer_id} className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOffer" + e.offer_id} aria-expanded="false" aria-controls={"collapseOffer" + e.offer_id}><h3 className="fs-4 m-0">{e.position}</h3></button>
                        </h2>
                        <div id={"collapseOffer" + e.offer_id} className="accordion-collapse collapse" data-bs-parent="#accordionOffer">
                            <div className="accordion-body px-0">
                                <OfferApplicants offerId={e.offer_id}/>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
}