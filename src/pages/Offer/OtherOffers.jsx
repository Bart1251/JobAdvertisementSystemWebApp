import OfferTileSmall from "./OfferTileSmall"

export default function OtherOffers() {
    return (
        <div className="bg-light-subtle shadow rounded">
            <h3 className="p-3 fs-4">Sprawdź podobne oferty</h3>
            <OfferTileSmall title="Przedstawiciel handlowy" company="VERKATTO sp. z o.o." location="Warszawa"/>
            <OfferTileSmall title="Przedstawiciel handlowy" company="VERKATTO sp. z o.o." location="Warszawa"/>
            <OfferTileSmall title="Przedstawiciel handlowy" company="VERKATTO sp. z o.o." location="Warszawa"/>
            <OfferTileSmall title="Przedstawiciel handlowy" company="VERKATTO sp. z o.o." location="Warszawa"/>
            <OfferTileSmall title="Przedstawiciel handlowy" company="VERKATTO sp. z o.o." location="Warszawa"/>
        </div>
    )
}