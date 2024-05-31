

export default function CompanyInfo({ info }) {
    return (
        <div className="m-2 m-lg-5">
            <h2>{info.name}</h2>
            <p className="fs-5">{info.address}</p>
            <p>{info.description}</p>
            <hr/>
        </div>
    )
}