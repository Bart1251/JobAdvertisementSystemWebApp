import TimelineIndicator from "./TimelineIndicator";


export default function Education(props) {
    return (
        <div className="d-flex flex-row gap-2">
            <TimelineIndicator start={props.start} end={props.end ? props.end : "Nadal"}/>
            <div>
                <h4 className="m-0">{props.institution}</h4>
                <p className="fs-4 m-0">{props.fieldOfStudy}</p>
                <p className="fs-5 m-0">{props.educationLevel}</p>
                <p className="m-0 text-secondary"><i className="bi bi-geo-alt-fill text-secondary me-2"></i>{props.location}</p>
            </div>
        </div>
    )
}