import TimelineIndicator from "./TimelineIndicator"

export default function CourseItem(props) {
    return (
        <div className="d-flex flex-row gap-2">
            <TimelineIndicator start={props.start} end={props.end}/>
            <div>
                <h4 className="m-0">{props.name}</h4>
                <p className="fs-4 m-0">{props.organizer}</p>
            </div>
        </div>
    )
}