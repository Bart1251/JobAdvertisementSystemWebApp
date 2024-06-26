import InfoItemIcon from "../../components/InfoItemIcon";


export default function List(props) {
    return (
        <div className="bg-light-subtle p-3 rounded-3 w-100 shadow">
            <h3 className="ms-3 fs-4">{props.title}</h3>
            <div className="d-flex flex-column">
                {props.items.map((e, i) => { return <InfoItemIcon key={i} text={e} icon="check-circle"/> })}
            </div>
        </div>
    )
}