

export default function InfoItemText(props) {
    return (
        <div className={"d-flex flex-row gap-3 p-2 " + props.className}>
            <p className="col-6 mt-auto mb-auto text-secondary">{props.title}</p>
            <p className="col-6 mt-auto mb-auto">{props.text}</p>
        </div>
    )
}