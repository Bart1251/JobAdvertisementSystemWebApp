import InfoItemIcon from "../../components/InfoItemIcon";
import InfoItemText from "../../components/InfoItemText";


export default function Info({ offer, companyLogo }) {
    return (
        <div className="bg-light-subtle shadow rounded">
            <div className="row p-3 m-0 border-bottom">
                <div className="col-xl-8 col-12 p-2 d-flex flex-row gap-3">
                    <img width={80} height={80} src={companyLogo}/>
                    <div className="d-flex flex-column">
                        <h3 className="fs-5">{offer.position}</h3>
                        <p>{offer.name}</p>
                    </div>
                </div>
                <div className="col rounded-3 d-flex flex-row gap-3 bg-warning-subtle text-warning p-2 pb-3 pt-3 mt-auto mb-auto">
                    <i className="bi bi-coin fs-2 mt-auto mb-auto"></i>
                    <div className="d-flex flex-column justify-content-center">
                        <h4 className="fs-5">{offer.min_wage} - {offer.max_wage} zł</h4>
                        <p className="m-0">brutto / godz.</p>
                    </div>
                </div>
            </div>
            <div className="row m-0 p-3 border-bottom">
                <InfoItemIcon text={offer.type_of_contract} icon="file-text-fill" className="col-xl-6 col-12"/>
                <InfoItemIcon text={offer.job_level} icon="bar-chart" className="col-xl-6 col-12"/>
                <InfoItemIcon text={offer.work_shift} icon="clock-fill" className="col-xl-6 col-12"/>
                <InfoItemIcon text={offer.job_type} icon="building" className="col-xl-6 col-12"/>
            </div>
            <div className="row m-0 p-3">
                <InfoItemText title="Ilość dostępnych stanowisk:" text={offer.available_posts} className="col-xl-6 col-12"/>
                <InfoItemText title="Dni pracy:" text={offer.work_days} className="col-xl-6 col-12"/>
                <InfoItemText title="Oferta wygasa:" text={offer.expires} className="col-xl-6 col-12"/>
                <InfoItemText title="Godziny pracy:" text={offer.work_hours} className="col-xl-6 col-12"/>
            </div>
        </div>
    )
}