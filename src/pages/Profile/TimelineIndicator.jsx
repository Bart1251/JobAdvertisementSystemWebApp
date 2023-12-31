

export default function TimelineIndicator(props) {
    return (
        <>
            <p className="bg-primary align-self-start p-1 text-white">{props.start} - {props.end}</p>
            <div className="position-relative d-flex flex-column align-items-center" style={{width: 20}}>
                <div className="position-absolute bg-primary h-100" style={{width: 2}}></div>
                <div className="position-absolute bg-primary rounded-circle" style={{width: 15, height: 15, marginTop: 8}}></div>
            </div>
        </>
    )
}