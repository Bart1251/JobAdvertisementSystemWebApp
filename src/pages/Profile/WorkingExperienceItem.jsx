import TimelineIndicator from "./TimelineIndicator";


export default function TimelineItem(props) {
    return (
        <div className="d-flex flex-row gap-2">
            <TimelineIndicator start={props.start} end={props.end}/>
            <div>
                <h4 className="m-0">{props.position}</h4>
                <p className="fs-4 m-0">{props.company}</p>
                <p className="m-0 text-secondary"><i className="bi bi-geo-alt-fill text-secondary me-2"></i>{props.location}</p>
                <p className="m-0">Obowiązki:</p>
                <ul>{props.responsibilities.map(e => <li>{e}</li> )}</ul>
            </div>
        </div>
    )
}