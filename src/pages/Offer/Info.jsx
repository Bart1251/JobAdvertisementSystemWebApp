import InfoItemIcon from "./InfoItemIcon";
import InfoItemText from "./InfoItemText";


export default function Info() {
    return (
        <div className="bg-light-subtle shadow rounded">
            <div className="row p-3 m-0 border-bottom">
                <div className="col-xl-8 col-12 p-2 d-flex flex-row gap-3">
                    <img width={80} height={80} src="https://logos.gpcdn.pl/loga-firm/1074108974/ee4d0000-5df0-0015-a6a1-08db58493e34_280x280.jpg?width=80&height=80"/>
                    <div className="d-flex flex-column">
                        <h3 className="fs-5">Pracownik hali w markecie spożywczym</h3>
                        <p>BeFlexi Sp. z o.o.</p>
                    </div>
                </div>
                <div className="col rounded-3 d-flex flex-row gap-3 bg-warning-subtle text-warning p-2 pb-3 pt-3 mt-auto mb-auto">
                    <i className="bi bi-coin fs-2 mt-auto mb-auto"></i>
                    <div className="d-flex flex-column justify-content-center">
                        <h4 className="fs-5">27,00 - 28,00 zł</h4>
                        <p className="m-0">brutto / godz.</p>
                    </div>
                </div>
            </div>
            <div className="row m-0 p-3 border-bottom">
                <InfoItemIcon text="umowa zlecenie" icon="file-text-fill" className="col-xl-6 col-12"/>
                <InfoItemIcon text="pracownik fizyczny" icon="bar-chart" className="col-xl-6 col-12"/>
                <InfoItemIcon text="praca od zaraz" icon="fire" className="col-xl-6 col-12"/>
                <InfoItemIcon text="praca stacjonarna" icon="building" className="col-xl-6 col-12"/>
            </div>
            <div className="row m-0 p-3">
                <InfoItemText title="Praca zmianowa:" text="tak" className="col-xl-6 col-12"/>
                <InfoItemText title="Godziny pracy:" text="6:00-14:00, 14:00-22:00" className="col-xl-6 col-12"/>
                <InfoItemText title="Tryb wypłaty:" text="dzienna" className="col-xl-6 col-12"/>
                <InfoItemText title="Możliwa praca w godzinach nocnych:" text="nie" className="col-xl-6 col-12"/>
            </div>
        </div>
    )
}