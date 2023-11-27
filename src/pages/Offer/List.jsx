import InfoItemIcon from "./InfoItemIcon";


export default function List(props) {
    return (
        <div className="bg-light-subtle p-3 rounded-3 w-100 shadow">
            <h3>{props.title}</h3>
            <div className="d-flex flex-column gap-2">
                {props.items.map(e => { return <InfoItemIcon text={e} icon="check-circle"/> })}
            </div>
        </div>
    )
}