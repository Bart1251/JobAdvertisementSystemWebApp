

export default function TimelineIndicator(props) {
    return (
        <>
            <p className="bg-primary align-self-start p-1 text-white text-center" style={{minWidth: 100}}>{props.end && (<>{props.end}<br/>↑<br/></>)}{props.start}</p>
            <div className="position-relative d-flex flex-column align-items-center" style={{minWidth: 20}}>
                <div className="position-absolute bg-primary h-100" style={{minWidth: 2}}></div>
                <div className="position-absolute bg-primary rounded-circle" style={{minWidth: 15, height: 15, marginTop: 8}}></div>
            </div>
        </>
    )
}